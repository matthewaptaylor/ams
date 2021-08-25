<template>
  <div id="app-root" class="d-flex flex-column">
    <!-- Only show AppBar when on desktop, otherwise, will only show in specific components -->
    <AppBar v-if="!$vuetify.breakpoint.mobile" />
    <v-main style="overflow: hidden" class="flex-grow-1">
      <v-container
        v-if="
          !emailVerified &&
          (!$vuetify.breakpoint.mobile || $route.name === 'ActivityPlanner')
        "
        class="px-2 px-md-4 py-0"
      >
        <Alert
          type="error"
          message="Your email address has not been verified."
          :link="{
            text: 'Verify email',
            link: { name: 'AccountSignInMethods' },
          }"
          class="mt-2"
        />
      </v-container>

      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </v-main>
  </div>
</template>

<style scoped>
#app-root {
  min-height: 100%;
  background-image: url("../../assets/images/background.svg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Stack transition */

.stack-enter-active,
.unstack-leave-active {
  position: absolute;
  max-width: 100%;
  width: 100%;
  transition: transform 0.2s, opacity 0.2s;
  z-index: 2;
}
.stack-leave-active,
.unstack-enter-active {
  position: absolute;
  max-width: 100%;
  width: 100%;
  transition: opacity 0.2s;
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
  opacity: 1;
}
.unstack-enter-active {
  opacity: 0;
}

.stack-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.stack-leave-to {
  opacity: 0;
}
.unstack-leave-to {
  transform: translateY(8rem);
  opacity: 0;
}
.unstack-enter-to {
  position: absolute;
  opacity: 1;
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
import AppBar from "../../components/app/AppBar.vue";
import Alert from "../../components/Alert";

export default {
  components: { AppBar, Alert },

  data() {
    return {
      emailVerified: true, // Assume by default the user's email is verified\\

      transitionName: null, // Custom route transitions
    };
  },

  created() {
    // Add event listener for when the global user object changes
    document.addEventListener("currentUserChanged", () => {
      this.updateDetails();
    });
  },

  mounted() {
    this.updateDetails();
  },

  watch: {
    $route(to, from) {
      // Determine if a transition should be slide right or left
      if (this.$vuetify.breakpoint.mobile) {
        // Only show transitions on mobile
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        this.transitionName = toDepth < fromDepth ? "unstack" : "stack";
      } else {
        this.transitionName = "none";
      }
    },
  },

  methods: {
    updateDetails() {
      // Choose personal details to display for user
      if (this.$currentUser) {
        this.emailVerified = this.$currentUser?.emailVerified;
      }
    },
  },
};
</script>
