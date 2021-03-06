import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
      themeCache: {
        get: (key) => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
    themes: {
      light: {
        primary: "#5f249f",
        secondary: "#424242",
        accent: "#046a38",
        error: "#d22730",
        info: "#862633",
        success: "#046a38",
        warning: "#f1c400",
        keas: "#e57200",
        cubs: "#f1c400",
        scouts: "#046a38",
        venturers: "#862633",
        rovers: "#d22730",
      },
    },
  },
  icons: {
    iconfont: "mdiSvg",
  },
  breakpoint: {
    mobileBreakpoint: "sm",
  },
});
