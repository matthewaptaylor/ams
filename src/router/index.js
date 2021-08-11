import Vue from "vue";
import VueRouter from "vue-router";
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
    children: [
      { path: "", name: "Dashboard", component: Dashboard },
      { path: "activity", name: "Activity", component: Activity },
    ],
  },
  {
    path: "/",
    name: "SignInRoot",
    component: SignInRoot,
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

export default router;
