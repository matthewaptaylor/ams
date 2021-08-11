import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import SignInRoot from "../views/SignInRoot.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import AppRoot from "../views/AppRoot.vue";
import Activities from "../views/Activities.vue";
import ActivityCreate from "../views/ActivityCreate.vue";
import Activity from "../views/Activity.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AppRoot",
    component: AppRoot,
    meta: {
      requiresAuth: true,
      noAuth: false,
    },
    children: [
      { path: "", redirect: { name: "Activities" } },
      { path: "activities", name: "Activities", component: Activities },
      {
        path: "activities/create",
        name: "ActivityCreate",
        component: ActivityCreate,
      },
      { path: "activities/:activityId", name: "Activity", component: Activity },
    ],
  },
  {
    path: "/",
    name: "SignInRoot",
    component: SignInRoot,
    meta: {
      requiresAuth: false,
      noAuth: true,
    },
    children: [
      { path: "signin", name: "SignIn", component: SignIn },
      { path: "signup", name: "SignUp", component: SignUp },
      {
        path: "forgotpassword",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
    ],
  },
  { path: "*", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Authenticate users
let vueLoaded = false;
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const noAuth = to.matched.some((record) => record.meta.noAuth);
  const signedIn = await getCurrentUser();

  // Remove loader in index.html
  if (!vueLoaded) {
    // This is the first navigation of the page
    document.querySelector("#loader").remove();
    vueLoaded = true;
  }

  // Redirect to correct path
  if (requiresAuth && !signedIn) {
    // Only signed in users, redirect
    next("/signin");
  } else if (noAuth && signedIn) {
    // Only non signed in users, redirect
    next("/");
  } else {
    // Acceptable
    next();
  }
});

export default router;
