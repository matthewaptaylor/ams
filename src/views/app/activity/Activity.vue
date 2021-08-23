<template>
  <PageWithSidebar
    :title="activityName"
    :subtitle="activityDates"
    :breadcrumbItems="breadcrumbItems"
    :navItems="navItems"
  >
    <router-view></router-view>
  </PageWithSidebar>
</template>

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
import PageWithSidebar from "../../../components/app/PageWithSidebar.vue";

export default {
  components: {
    PageWithSidebar,
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
          disabled: true,
        },
      ],
    };
  },
};
</script>
