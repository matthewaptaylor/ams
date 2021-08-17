import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import GeneralRoot from "../views/general/GeneralRoot.vue";
import GeneralSignIn from "../views/general/GeneralSignIn.vue";
import GeneralSignUp from "../views/general/GeneralSignUp.vue";
import GeneralForgotPassword from "../views/general/GeneralForgotPassword.vue";
import GeneralNotFound from "../views/general/GeneralNotFound.vue";
import AppRoot from "../views/app/AppRoot.vue";
import ActivityPlanner from "../views/app/ActivityPlanner.vue";
import Activity from "../views/app/Activity.vue";
import ActivityOverview from "../views/app/ActivityOverview.vue";
import ActivityPlan from "../views/app/ActivityPlan.vue";
import ActivityRAMS from "../views/app/ActivityRAMS.vue";
import ActivityBudget from "../views/app/ActivityBudget.vue";
import ActivityShoppingList from "../views/app/ActivityShoppingList.vue";
import ActivityGearList from "../views/app/ActivityGearList.vue";
import ActivityAIF from "../views/app/ActivityAIF.vue";

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
    ],
  },
  {
    path: "/",
    component: GeneralRoot,
    meta: {
      requiresAuth: false,
      noAuth: true,
    },
    children: [
      { path: "signin", name: "SignIn", component: GeneralSignIn },
      { path: "signup", name: "SignUp", component: GeneralSignUp },
      {
        path: "forgotpassword",
        name: "ForgotPassword",
        component: GeneralForgotPassword,
      },
      { path: "*", name: "GeneralNotFound", component: GeneralNotFound },
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
