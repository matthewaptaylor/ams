<template>
  <PageWithSidebar
    title="My Account"
    :breadcrumbItems="breadcrumbItems"
    :navItems="navItems"
  >
    <router-view></router-view>
  </PageWithSidebar>
</template>
<style scoped></style>
<script>
import { mdiAccount, mdiAccountKey, mdiKey, mdiDelete } from "@mdi/js";
import PageWithSidebar from "../../../components/app/PageWithSidebar.vue";

export default {
  components: {
    PageWithSidebar,
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: "Activity Planner",
          to: { name: "ActivityPlanner" },
        },
        {
          text: "Account",
          disabled: true,
        },
      ],
      navItems: [
        {
          title: "Profile",
          to: { name: "AccountProfile" },
          icon: mdiAccount,
        },
        {
          title: "Sign In Methods",
          to: { name: "AccountSignInMethods" },
          icon: mdiAccountKey,
        },
        {
          title: "Reset Password",
          to: { name: "AccountResetPassword" },
          icon: mdiKey,
        },
        {
          title: "Delete Account",
          to: { name: "AccountDeleteAccount" },
          icon: mdiDelete,
        },
      ],
    };
  },
};
</script>
