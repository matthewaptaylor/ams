<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Futura PT", Futura, "Trebuchet MS", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: "Futura PT";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("./fonts/FuturaPTBook.woff2") format("woff2"),
    url("./fonts/FuturaPTBook.woff") format("woff"),
    url("./fonts/FuturaPTBook.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: italic;
  font-weight: 400;
  font-display: block;
  src: url("./fonts/FuturaPTBookOblique.woff2") format("woff2"),
    url("./fonts/FuturaPTBookOblique.woff") format("woff"),
    url("./fonts/FuturaPTBookOblique.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: normal;
  font-weight: 500;
  font-display: block;
  src: url("./fonts/FuturaPTMedium.woff2") format("woff2"),
    url("./fonts/FuturaPTMedium.woff") format("woff"),
    url("./fonts/FuturaPTMedium.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: italic;
  font-weight: 500;
  font-display: block;
  src: url("./fonts/FuturaPTMediumOblique.woff2") format("woff2"),
    url("./fonts/FuturaPTMediumOblique.woff") format("woff"),
    url("./fonts/FuturaPTMediumOblique.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: normal;
  font-weight: 600;
  font-display: block;
  src: url("./fonts/FuturaPTDemi.woff2") format("woff2"),
    url("./fonts/FuturaPTDemi.woff") format("woff"),
    url("./fonts/FuturaPTDemi.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: italic;
  font-weight: 600;
  font-display: block;
  src: url("./fonts/FuturaPTDemiOblique.woff2") format("woff2"),
    url("./fonts/FuturaPTDemiOblique.woff") format("woff"),
    url("./fonts/FuturaPTDemiOblique.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: normal;
  font-weight: 700;
  font-display: block;
  src: url("./fonts/FuturaPTHeavy.woff2") format("woff2"),
    url("./fonts/FuturaPTHeavy.woff") format("woff"),
    url("./fonts/FuturaPTHeavy.otf") format("opentype");
}
@font-face {
  font-family: "Futura PT";
  font-style: italic;
  font-weight: 700;
  font-display: block;
  src: url("./fonts/FuturaPTHeavyOblique.woff2") format("woff2"),
    url("./fonts/FuturaPTHeavyOblique.woff") format("woff"),
    url("./fonts/FuturaPTHeavyOblique.otf") format("opentype");
}
</style>
