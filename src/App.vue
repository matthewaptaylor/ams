<template>
  <v-app id="app">
    <router-view></router-view>

    <v-snackbar
      v-model="updateExists"
      :left="!$vuetify.breakpoint.mobile"
      timeout="-1"
      transition="scroll-y-transition"
    >
      An update is available.

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="refreshApp"> Update </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style>
html {
  overflow: auto !important;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.can-select {
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -o-user-select: text;
  user-select: text;
}

#app {
  line-height: 1.15;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-application--wrap {
  min-height: 100vh !important;
}

@font-face {
  font-family: "Futura PT";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("./assets/fonts/FuturaPTBook.woff2") format("woff2"),
    url("./assets/fonts/FuturaPTBook.woff") format("woff"),
    url("./assets/fonts/FuturaPTBook.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: italic;
  font-weight: 400;
  font-display: block;
  src: url("./assets/fonts/FuturaPTBookOblique.woff2") format("woff2"),
    url("./assets/fonts/FuturaPTBookOblique.woff") format("woff"),
    url("./assets/fonts/FuturaPTBookOblique.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: normal;
  font-weight: 500;
  font-display: block;
  src: url("./assets/fonts/FuturaPTMedium.woff2") format("woff2"),
    url("./assets/fonts/FuturaPTMedium.woff") format("woff"),
    url("./assets/fonts/FuturaPTMedium.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: italic;
  font-weight: 500;
  font-display: block;
  src: url("./assets/fonts/FuturaPTMediumOblique.woff2") format("woff2"),
    url("./assets/fonts/FuturaPTMediumOblique.woff") format("woff"),
    url("./assets/fonts/FuturaPTMediumOblique.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: normal;
  font-weight: 600;
  font-display: block;
  src: url("./assets/fonts/FuturaPTDemi.woff2") format("woff2"),
    url("./assets/fonts/FuturaPTDemi.woff") format("woff"),
    url("./assets/fonts/FuturaPTDemi.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: italic;
  font-weight: 600;
  font-display: block;
  src: url("./assets/fonts/FuturaPTDemiOblique.woff2") format("woff2"),
    url("./assets/fonts/FuturaPTDemiOblique.woff") format("woff"),
    url("./assets/fonts/FuturaPTDemiOblique.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: normal;
  font-weight: 700;
  font-display: block;
  src: url("./assets/fonts/FuturaPTHeavy.woff2") format("woff2"),
    url("./assets/fonts/FuturaPTHeavy.woff") format("woff"),
    url("./assets/fonts/FuturaPTHeavy.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: italic;
  font-weight: 700;
  font-display: block;
  src: url("./assets/fonts/FuturaPTHeavyOblique.woff2") format("woff2"),
    url("./assets/fonts/FuturaPTHeavyOblique.woff") format("woff"),
    url("./assets/fonts/FuturaPTHeavyOblique.otf") format("opentype");
}

.v-time-picker-title {
  justify-content: center !important;
}
</style>

<script>
export default {
  data() {
    return {
      snackbar: false,

      registration: null,
      updateExists: false,
      refreshing: false,
    };
  },

  created() {
    // Detect when an update is available
    document.addEventListener("swUpdated", this.updateAvailable, {
      once: true,
    });

    // Detect when the servie worker updates
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;

      // Here the actual reload of the page occurs
      window.location.reload();
    });

    // Catch install prompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();

      this.$setAppPrompt(e); // Stash the event so it can be triggered later.
    });

    // Detect when app installed
    window.addEventListener("appinstalled", () => {
      this.$setAppPrompt(null);
    });
  },

  methods: {
    updateAvailable(event) {
      // Called when an app update is detected
      this.registration = event.detail;
      this.updateExists = true;
    },

    refreshApp() {
      this.updateExists = false;

      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return;

      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    },
  },
};
</script>
