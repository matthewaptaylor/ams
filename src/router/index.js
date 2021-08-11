import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import SignInRoot from "../views/SignInRoot.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import AppRoot from "../views/AppRoot.vue";
import Dashboard from "../views/Dashboard.vue";
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
    },
    children: [
      { path: "", name: "Dashboard", component: Dashboard },
      { path: "activity", name: "Activity", component: Activity },
    ],
  },
  {
    path: "/",
    name: "SignInRoot",
    component: SignInRoot,
    meta: {
      requiresAuth: false,
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
  const signedIn = await getCurrentUser();
  if (requiresAuth && !signedIn) {
    // Only signed in users, redirect
    next("/signin");
  } else if (!requiresAuth && signedIn) {
    // Only non signed in users, redirect
    next("/");
  } else {
    // Acceptable
    next();
  }
});

export default router;
