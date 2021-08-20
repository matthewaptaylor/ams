<template>
  <v-container>
    <Breadcrumbs :items="breadcrumbItems" />

    <NavMobile
      title="My Account"
      :items="navItems"
      v-if="$vuetify.breakpoint.mobile"
    />

    <div class="d-flex align-start" style="gap: 1rem">
      <NavDesktop
        title="My Account"
        :items="navItems"
        v-if="!$vuetify.breakpoint.mobile"
      />

      <v-sheet
        elevation="2"
        rounded
        class="flex-grow-1"
        style="max-width: 100%"
      >
        <router-view></router-view>
      </v-sheet>
    </div>
  </v-container>
</template>
<style scoped></style>
<script>
import { mdiAccount, mdiAccountKey, mdiKey, mdiDelete } from "@mdi/js";
import Breadcrumbs from "../../../components/app/Breadcrumbs.vue";
import NavMobile from "../../../components/app/NavMobile.vue";
import NavDesktop from "../../../components/app/NavDesktop.vue";

export default {
  components: {
    Breadcrumbs,
    NavMobile,
    NavDesktop,
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
          title: "Login Methods",
          to: { name: "AccountLoginMethods" },
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
