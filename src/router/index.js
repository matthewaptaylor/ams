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
import DialogParent from "../components/app/DialogParent.vue";
import About from "../views/app/About.vue";
import Account from "../views/app/account/Account.vue";
import AccountProfile from "../views/app/account/AccountProfile.vue";
import AccountSignInMethods from "../views/app/account/AccountSignInMethods.vue";
import AccountResetPassword from "../views/app/account/AccountResetPassword.vue";
import AccountDeleteAccount from "../views/app/account/AccountDeleteAccount.vue";
import AccountDeleteAccountConfirm from "../views/app/account/AccountDeleteAccountConfirm.vue";
import ActivityPlanner from "../views/app/ActivityPlanner.vue";
import ActivityPlannerCreateActivity from "../views/app/ActivityPlannerCreateActivity.vue";
import Activity from "../views/app/activity/Activity.vue";
import ActivityOverview from "../views/app/activity/ActivityOverview.vue";
import ActivityPeople from "../views/app/activity/ActivityPeople.vue";
import ActivityPlan from "../views/app/activity/ActivityPlan.vue";
import ActivityRAMS from "../views/app/activity/ActivityRAMS.vue";
import ActivityRAMSRisk from "../views/app/activity/ActivityRAMSRisk.vue";
import ActivityBudget from "../views/app/activity/ActivityBudget.vue";
import ActivityShoppingList from "../views/app/activity/ActivityShoppingList.vue";
import ActivityGearList from "../views/app/activity/ActivityGearList.vue";
import ActivityAIF from "../views/app/activity/ActivityAIF.vue";
import ActivityAIFSignature from "../views/app/activity/ActivityAIFSignature.vue";

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
        // Show dialog in Activity Planner as a child route
        path: "",
        name: "ActivityPlanner",
        component: DialogParent,
        alias: "createactivity", // Ensure the dialog path routes back to here
        meta: {
          default: ActivityPlanner,
          dialog: ActivityPlannerCreateActivity,
          dialogPath: "createactivity", // Path that will open the dialog
        },
      },
      {
        path: "about",
        name: "About",
        component: About,
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
            path: "signinmethods",
            name: "AccountSignInMethods",
            component: AccountSignInMethods,
          },
          {
            path: "resetpassword",
            name: "AccountResetPassword",
            component: AccountResetPassword,
          },
          {
            path: "delete",
            name: "AccountDeleteAccount",
            component: DialogParent,
            alias: "delete/confirm", // Ensure the dialog path routes back to here
            meta: {
              default: AccountDeleteAccount,
              dialog: AccountDeleteAccountConfirm,
              dialogPath: "confirm", // Path that will open the dialog
            },
          },
        ],
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
            path: "people",
            name: "ActivityPeople",
            component: ActivityPeople,
          },
          {
            path: "plan",
            name: "ActivityPlan",
            component: ActivityPlan,
          },
          {
            path: "rams/:dialogRoute?", // Ensure the dialog path routes back to here
            name: "ActivityRAMS",
            component: DialogParent,
            meta: {
              default: ActivityRAMS,
              dialog: ActivityRAMSRisk,
            },
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
            path: "aif/:dialogRoute?", // Ensure the dialog path routes back to here
            name: "ActivityAIF",
            component: DialogParent,
            meta: {
              default: ActivityAIF,
              dialog: ActivityAIFSignature,
            },
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

  // Store the previous route as a global variable
  Vue.prototype.$previousRoute = from;

  // Retermine the authentication status of the page and user
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const accountPage = [
    "Account",
    "AccountProfile",
    "AccountSignInMethods",
    "AccountResetPassword",
    "AccountDeleteAccount",
    "AccountDeleteAccountConfirm",
    "About",
  ].includes(to.name);
  const noAuth = to.matched.some((record) => record.meta.noAuth);
  const signedIn = Vue.prototype.$currentUser;

  // Redirect to correct path signed In
  if (requiresAuth && !signedIn) {
    // Only signed in users, redirect
    next("/signin");
  } else if (
    requiresAuth &&
    signedIn &&
    !signedIn.emailVerified &&
    !accountPage
  ) {
    // Email not authenticated, keep on account page
    next({ name: "AccountSignInMethods" });
  } else if (noAuth && signedIn) {
    // Only non signed in users, redirect
    next("/");
  } else {
    // Acceptable
    next();
  }
});

export default router;
