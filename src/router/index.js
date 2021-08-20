import Vue from "vue";
import VueRouter from "vue-router";
import GeneralRoot from "../views/general/GeneralRoot.vue";
import GeneralSignIn from "../views/general/GeneralSignIn.vue";
import GeneralSignUp from "../views/general/GeneralSignUp.vue";
import GeneralForgotPassword from "../views/general/GeneralForgotPassword.vue";
import GeneralEmailAction from "../views/general/GeneralEmailAction.vue";
import GeneralResetPassword from "../views/general/GeneralResetPassword.vue";
import GeneralRecoverEmail from "../views/general/GeneralRecoverEmail.vue";
import GeneralVerifyEmail from "../views/general/GeneralVerifyEmail.vue";
import GeneralNotFound from "../views/general/GeneralNotFound.vue";
import AppRoot from "../views/app/AppRoot.vue";
import Account from "../views/app/account/Account.vue";
import AccountProfile from "../views/app/account/AccountProfile.vue";
import AccountLoginMethods from "../views/app/account/AccountLoginMethods.vue";
import AccountResetPassword from "../views/app/account/AccountResetPassword.vue";
import AccountDeleteAccount from "../views/app/account/AccountDeleteAccount.vue";
import ActivityPlanner from "../views/app/ActivityPlanner.vue";
import Activity from "../views/app/activity/Activity.vue";
import ActivityOverview from "../views/app/activity/ActivityOverview.vue";
import ActivityPlan from "../views/app/activity/ActivityPlan.vue";
import ActivityRAMS from "../views/app/activity/ActivityRAMS.vue";
import ActivityBudget from "../views/app/activity/ActivityBudget.vue";
import ActivityShoppingList from "../views/app/activity/ActivityShoppingList.vue";
import ActivityGearList from "../views/app/activity/ActivityGearList.vue";
import ActivityAIF from "../views/app/activity/ActivityAIF.vue";

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
      {
        path: "",
        name: "ActivityPlanner",
        component: ActivityPlanner,
      },
      { path: "activity", redirect: { name: "ActivityPlanner" } },
      {
        path: "activity/:activityId",
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
        component: Account,
        children: [
          { path: "", redirect: { name: "AccountProfile" } },
          {
            path: "profile",
            name: "AccountProfile",
            component: AccountProfile,
          },
          {
            path: "loginmethods",
            name: "AccountLoginMethods",
            component: AccountLoginMethods,
          },
          {
            path: "resetpassword",
            name: "AccountResetPassword",
            component: AccountResetPassword,
          },
          {
            path: "delete",
            name: "AccountDeleteAccount",
            component: AccountDeleteAccount,
          },
        ],
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
        path: "reauthenticate",
        name: "GeneralReauthenticate",
        component: GeneralSignIn,
        meta: {
          requiresAuth: true,
          noAuth: false,
        },
      },
      {
        // Redirects email links sent by firebase to the correct route, or keeps on this route if there is an error
        path: "emailaction",
        name: "GeneralEmailAction",
        component: GeneralEmailAction,
        alias: ["resetpassword", "recoveremail", "verifyemail"],
        meta: {
          requiresAuth: false,
          noAuth: false,
        },
        beforeEnter: (to, from, next) => {
          // Get action mode from page URL
          const URLParams = new URL(window.location.href).searchParams;
          const mode = URLParams.get("mode");
          const oobCode = URLParams.get("oobCode");

          // Navigate to the correct view based on the URL mode
          if (oobCode) {
            // Only redirect if the code has been provided

            switch (mode) {
              case "resetPassword":
                next({
                  name: "GeneralResetPassword",
                  params: { oobCode: oobCode },
                });
                break;
              case "recoverEmail":
                next({
                  name: "GeneralRecoverEmail",
                  params: { oobCode: oobCode },
                });
                break;
              case "verifyEmail":
                next({
                  name: "GeneralVerifyEmail",
                  params: { oobCode: oobCode },
                });
                break;
              default:
                next();
            }
          } else {
            // No code has been provided, keep on this route to show error message

            next();
          }
        },
      },
      {
        path: "resetpassword/:oobCode",
        name: "GeneralResetPassword",
        component: GeneralResetPassword,
        meta: {
          requiresAuth: false,
          noAuth: false,
        },
      },
      {
        path: "recoveremail/:oobCode",
        name: "GeneralRecoverEmail",
        component: GeneralRecoverEmail,
        meta: {
          requiresAuth: false,
          noAuth: false,
        },
      },
      {
        path: "verifyemail/:oobCode",
        name: "GeneralVerifyEmail",
        component: GeneralVerifyEmail,
        meta: {
          requiresAuth: false,
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

// Ensure only authenticated users can get into certain pages
let showingLoadingScreen = true;
router.beforeEach(async (to, from, next) => {
  // Remove loading screen in index.html
  if (showingLoadingScreen) {
    // This is the first navigation of the page
    document.querySelector("#loaderOverlay").remove();
    document.documentElement.style.overflow = "";

    showingLoadingScreen = false;
  }

  // Retermine the authentication status of the page and user
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const noAuth = to.matched.some((record) => record.meta.noAuth);
  const signedIn = Vue.prototype.$currentUser;

  // Redirect to correct path signed In
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
