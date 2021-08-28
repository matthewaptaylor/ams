<template>
  <div id="app-root" class="d-flex flex-column">
    <!-- Only show AppBar when on desktop, otherwise, will only show in specific components -->
    <AppBar v-if="!$vuetify.breakpoint.mobile" />

    <v-main style="overflow: hidden" class="flex-grow-1">
      <transition :name="transitionName">
        <router-view class="page-background"></router-view>
      </transition>
    </v-main>

    <v-snackbar
      v-model="showAppPrompt"
      :left="!$vuetify.breakpoint.mobile"
      timeout="-1"
      transition="scroll-y-transition"
    >
      Get the AMS app.

      <template v-slot:action="{ attrs }">
        <div v-bind="attrs">
          <v-btn text @click="$appPrompt.prompt()" class="mr-2">
            Install
          </v-btn>

          <v-btn icon @click="closeAppSnackbar">
            <v-icon>{{ closeIcon }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-snackbar>
  </div>
</template>

<style>
@media only screen and (max-width: 959px) {
  /* Show background on a page-by-page basis on mobile screens */
  .page-background {
    min-height: 100%;
    background-image: url("../../assets/images/background.svg");
    background-color: white;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
}
</style>

<style scoped>
#app-root {
  min-height: 100%;
}
@media only screen and (min-width: 960px) {
  /* Show background globally on large displays */
  #app-root {
    background-image: url("../../assets/images/background.svg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
}

/* Stack transition */
.stack-enter-active,
.unstack-leave-active {
  position: absolute;
  max-width: 100%;
  width: 100%;
  transition: transform 0.3s, opacity 0.3s;
  z-index: 10000;
}
.stack-leave-active,
.unstack-enter-active {
  position: absolute;
  max-width: 100%;
  width: 100%;
  z-index: 1;
}
.stack-enter-active {
  transform: translateY(8rem);
  opacity: 0;
}
.unstack-leave-active {
  transform: translateY(0);
  opacity: 1;
}
.stack-leave-active {
  visibility: visible;
  transition: visibility 0s 0.3s;
}
.unstack-enter-active,
.unstack-enter-to {
  visibility: visible;
}

.stack-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.stack-leave-to {
  visibility: hidden;
}
.unstack-leave-to {
  transform: translateY(8rem);
  opacity: 0;
}

/* None transition */
.none-enter-active,
.none-leave-to {
  display: none;
}
.none-enter-to,
.none-leave-active {
  display: block;
}
</style>

<style>
.v-app-bar--hide > * {
  visibility: hidden;
}
</style>

<script>
import { mdiClose } from "@mdi/js";
import AppBar from "../../components/app/AppBar.vue";

export default {
  components: { AppBar },

  data() {
    return {
      // Icons
      closeIcon: mdiClose,

      transitionName: null, // Custom route transitions

      // App snackbar
      showAppPrompt: false,
    };
  },

  watch: {
    $route(to, from) {
      // Determine if a transition should be slide right or left
      if (this.$vuetify.breakpoint.mobile) {
        // Only show transitions on mobile
        const toDepth = this.toArray(to.path).length;
        const fromDepth = this.toArray(from.path).length;

        this.transitionName = toDepth < fromDepth ? "unstack" : "stack";
      } else {
        this.transitionName = "none";
      }
    },
  },

  created() {
    // Add event listener for when the app prompt state changes
    document.addEventListener("appPromptChanged", this.updateShowAppPrompt);
    this.updateShowAppPrompt();
  },

  methods: {
    async closeAppSnackbar() {
      this.showAppPrompt = false;
    },

    updateShowAppPrompt() {
      // Determine the last time the user was prompted to install the app
      const twoWeeks = 1209600000; // in ms

      if (
        localStorage.getItem("lastInstallPrompt") + twoWeeks <= Date.now() &&
        this.$appPrompt
      ) {
        // It has been at least two weeks since the user was prompted to install, ask again
        this.showAppPrompt = true;

        localStorage.setItem("lastInstallPrompt", Date.now());
      } else {
        this.showAppPrompt = false;
      }
    },

    toArray(x) {
      // Takes a path string and splits it into an array, removing blank items
      return x.split("/").filter((x) => x);
    },
  },
};
</script>
