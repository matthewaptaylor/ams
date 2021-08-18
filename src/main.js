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
let retrievedAuthState = false;
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  if (retrievedAuthState) {
    // Triggered by genuine auth state change
    if (user) {
      router.push("/");
    } else {
      router.push("/signin");
    }
  } else {
    // Auth state change due to page loading
    retrievedAuthState = true;
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

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
