<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<style>
html {
  overflow: auto !important;
  font-size: 18px !important;
}
#app {
  font-family: "Futura PT", Futura, "Trebuchet MS", Arial, sans-serif;
  line-height: 1.15;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.v-application--wrap {
  min-height: calc(var(--vh, 1vh) * 100) !important;
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
</style>

<script>
export default {
  mounted() {
    this.setVH();
    window.addEventListener("resize", this.setVH);
  },
  methods: {
    setVH() {
      // Sets VH to be equal to the actual inner height of the window
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },

  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.setVH);
  },
};
</script>
