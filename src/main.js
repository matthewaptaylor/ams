import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";
import "./registerServiceWorker";

// Setup firebase authentication
let vueLoaded = false;
firebase.initializeApp(JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG));
firebase.analytics(); // Initialise Google analytics
firebase.auth().onAuthStateChanged((user) => {
  if (vueLoaded) {
    // Triggered by genuine auth state change
    Vue.prototype.$updateUser(); // Set new user status

    // Change the route if the client is at a location they are no longer allowed
    const routeMatched = router.history.current.matched;

    if (user && routeMatched.some((record) => record.meta.noAuth)) {
      router.push("/");
    } else if (routeMatched.some((record) => record.meta.requiresAuth)) {
      router.push("/signin");
    }
  } else {
    // Initialise Vue
    Vue.config.productionTip = false;

    Vue.prototype.$appPrompt = null; // Store the browser install app event
    Vue.prototype.$setAppPrompt = (x) => {
      Vue.prototype.$appPrompt = x;
      document.dispatchEvent(new CustomEvent("appPromptChanged"));
    };

    Vue.prototype.$updateUser = () => {
      // Store user status in global variable
      Vue.prototype.$currentUser = firebase.auth().currentUser;

      // Vue fails to watch the $currentUser variable, so trigger an event when it is changed
      document.dispatchEvent(new CustomEvent("currentUserChanged"));
    };
    Vue.prototype.$updateUser(); // Set new user status

    new Vue({
      router,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");

    vueLoaded = true;
  }
});

// Setup emulators
if (process.env.NODE_ENV === "development") {
  // Automatically switch to a local emulator in development
  firebase.auth().useEmulator("http://localhost:9099");
  firebase.functions().useEmulator("localhost", 5001);
}

// var activityPlannerCreateActivity = firebase
//   .functions()
//   .httpsCallable("activityPlannerCreateActivity");

// activityPlannerCreateActivity({
//   name: "Wellington Trip",
//   startTime: new Date(),
//   endTime: new Date(),
// }).then(() => {
//   // Read result of the Cloud Function.
//   // var sanitizedMessage = result;
//   // console.log(sanitizedMessage);
// });
