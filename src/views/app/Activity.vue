<template>
  <v-container>
    <Breadcrumbs :items="breadcrumbItems" />
    <NavMobile
      :title="activityName"
      :items="navItems"
      v-if="$vuetify.breakpoint.mobile"
    />
    <div class="d-flex align-start" style="gap: 1rem">
      <NavDesktop
        :title="activityName"
        :subtitle="activityDates"
        :items="navItems"
        v-if="!$vuetify.breakpoint.mobile"
      />
      <router-view></router-view>
    </div>
  </v-container>
</template>
<style scoped></style>
<script>
import {
  mdiInformation,
  mdiClipboardList,
  mdiAlert,
  mdiCreditCard,
  mdiCart,
  mdiBagPersonal,
  mdiFormSelect,
} from "@mdi/js";
import Breadcrumbs from "../../components/app/Breadcrumbs.vue";
import NavMobile from "../../components/app/NavMobile.vue";
import NavDesktop from "../../components/app/NavDesktop.vue";

export default {
  components: {
    Breadcrumbs,
    NavMobile,
    NavDesktop,
  },
  data() {
    return {
      activityName: "Wellington Trip",
      activityDates: "24/06/2021 to 26/04/2021",
      navItems: [
        {
          title: "Overview",
          to: { name: "ActivityOverview" },
          icon: mdiInformation,
        },
        { title: "Plan", to: { name: "ActivityPlan" }, icon: mdiClipboardList },
        { title: "RAMS", to: { name: "ActivityRAMS" }, icon: mdiAlert },
        {
          title: "Budget",
          to: { name: "ActivityBudget" },
          icon: mdiCreditCard,
        },
        {
          title: "Shopping List",
          to: { name: "ActivityShoppingList" },
          icon: mdiCart,
        },
        {
          title: "Gear List",
          to: { name: "ActivityGearList" },
          icon: mdiBagPersonal,
        },
        { title: "AIF", to: { name: "ActivityAIF" }, icon: mdiFormSelect },
      ],
      breadcrumbItems: [
        {
          text: "Activity Planner",
          to: { name: "ActivityPlanner" },
        },
        {
          text: "Wellington trip",
        },
      ],
    };
  },
};
</script>
