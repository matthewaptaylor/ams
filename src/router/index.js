import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import GeneralRoot from "../views/general/GeneralRoot.vue";
import GeneralSignIn from "../views/general/GeneralSignIn.vue";
import GeneralSignUp from "../views/general/GeneralSignUp.vue";
import GeneralForgotPassword from "../views/general/GeneralForgotPassword.vue";
import GeneralResetPassword from "../views/general/GeneralResetPassword.vue";
import GeneralNotFound from "../views/general/GeneralNotFound.vue";
import AppRoot from "../views/app/AppRoot.vue";
import Account from "../views/app/account/Account.vue";
import ActivityPlanner from "../views/app/activityplanner/ActivityPlanner.vue";
import Activity from "../views/app/activityplanner/Activity.vue";
import ActivityOverview from "../views/app/activityplanner/ActivityOverview.vue";
import ActivityPlan from "../views/app/activityplanner/ActivityPlan.vue";
import ActivityRAMS from "../views/app/activityplanner/ActivityRAMS.vue";
import ActivityBudget from "../views/app/activityplanner/ActivityBudget.vue";
import ActivityShoppingList from "../views/app/activityplanner/ActivityShoppingList.vue";
import ActivityGearList from "../views/app/activityplanner/ActivityGearList.vue";
import ActivityAIF from "../views/app/activityplanner/ActivityAIF.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: AppRoot,
    meta: {
      requiresAuth: true,
      noAuth: false,
    },
    children: [
      { path: "", redirect: { name: "ActivityPlanner" } },
      {
        path: "activityplanner",
        name: "ActivityPlanner",
        component: ActivityPlanner,
      },
      {
        path: "activityplanner/:activityId",
        component: Activity,
        children: [
          { path: "", redirect: { name: "ActivityOverview" } },
          {
            path: "overview",
            name: "ActivityOverview",
            component: ActivityOverview,
          },
          {
            path: "plan",
            name: "ActivityPlan",
            component: ActivityPlan,
          },
          {
            path: "rams",
            name: "ActivityRAMS",
            component: ActivityRAMS,
          },
          {
            path: "budget",
            name: "ActivityBudget",
            component: ActivityBudget,
          },
          {
            path: "shoppinglist",
            name: "ActivityShoppingList",
            component: ActivityShoppingList,
          },
          {
            path: "gearlist",
            name: "ActivityGearList",
            component: ActivityGearList,
          },
          {
            path: "aif",
            name: "ActivityAIF",
            component: ActivityAIF,
          },
        ],
      },
      {
        path: "account",
        name: "Account",
        component: Account,
      },
    ],
  },
  {
    path: "/",
    component: GeneralRoot,
    children: [
      {
        path: "signin",
        name: "GeneralSignIn",
        component: GeneralSignIn,
        meta: {
          requiresAuth: false,
          noAuth: true,
        },
      },
      {
        path: "signup",
        name: "GeneralSignUp",
        component: GeneralSignUp,
        meta: {
          requiresAuth: false,
          noAuth: true,
        },
      },
      {
        path: "forgotpassword",
        name: "GeneralForgotPassword",
        component: GeneralForgotPassword,
        meta: {
          requiresAuth: false,
          noAuth: true,
        },
      },
      {
        path: "resetpassword",
        name: "GeneralResetPassword",
        component: GeneralResetPassword,
        meta: {
          requiresAuth: false,
          noAuth: false,
        },
      },
      {
        path: "reauthenticate",
        name: "GeneralReauthenticate",
        component: GeneralSignIn,
        meta: {
          requiresAuth: true,
          noAuth: false,
        },
      },
      {
        path: "*",
        name: "GeneralNotFound",
        component: GeneralNotFound,
        meta: {
          requiresAuth: false,
          noAuth: false,
        },
      },
    ],
  },
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
    document.querySelector("#loaderOverlay").remove();
    document.documentElement.style.overflow = "";
    vueLoaded = true;
  }

  console.log(requiresAuth, signedIn);
  // Redirect to correct pathsignedIn
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
