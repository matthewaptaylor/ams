import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCEP-66lWUOILlpK2QWLj196GJWezQPM7E",
  authDomain: "ams-scouts-aotearoa.firebaseapp.com",
  projectId: "ams-scouts-aotearoa",
  storageBucket: "ams-scouts-aotearoa.appspot.com",
  messagingSenderId: "1009744879723",
  appId: "1:1009744879723:web:ffb8b54902f5d3ae54912e",
  measurementId: "G-8K0GRKGLY6",
};

// Setup firebase authentication
let vueLoaded = false;
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  if (vueLoaded) {
    // Triggered by genuine auth state change
    Vue.prototype.$updateUser(); // Set new user status

    if (user) {
      router.push("/");
    } else {
      router.push("/signin");
    }
  } else {
    // Initialise Vue
    Vue.config.productionTip = false;
    Vue.prototype.$currentUserChanged = new Event("currentUserChanged");
    Vue.prototype.$updateUser = () => {
      // Store user status in global variable
      Vue.prototype.$currentUser = firebase.auth().currentUser;

      // Vue fails to watch the $currentUser variable, so trigger an event when it is changed
      document
        .querySelector("#app")
        .dispatchEvent(Vue.prototype.$currentUserChanged);
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

// Setup firebase functions
// firebase.functions().useEmulator("localhost", 5001);
// var addMessage = firebase.functions().httpsCallable("addMessage");
// addMessage({ text: "messageText" }).then((result) => {
//   // Read result of the Cloud Function.
//   var sanitizedMessage = result;
//   console.log(sanitizedMessage);
// });
