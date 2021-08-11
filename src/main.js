import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

const firebaseConfig = {
  apiKey: "AIzaSyCEP-66lWUOILlpK2QWLj196GJWezQPM7E",
  authDomain: "ams-scouts-aotearoa.firebaseapp.com",
  projectId: "ams-scouts-aotearoa",
  storageBucket: "ams-scouts-aotearoa.appspot.com",
  messagingSenderId: "1009744879723",
  appId: "1:1009744879723:web:ffb8b54902f5d3ae54912e",
  measurementId: "G-8K0GRKGLY6",
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
});
