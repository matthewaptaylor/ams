<template>
  <ChildPage
    :title="name"
    :breadcrumbItems="breadcrumbItems"
    :navItems="navItems"
  >
    <div
      class="d-flex justify-center align-center pa-4 fill-height"
      v-if="loading || error"
    >
      <Alert
        type="error"
        fullWidth
        :message="error"
        :action="{ text: 'Retry', callback: load }"
      />

      <v-progress-circular
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-circular>
    </div>

    <router-view
      :activityName="name"
      :location="location"
      :startDate="startDate"
      :startTime="startTime"
      :endDate="endDate"
      :endTime="endTime"
      @update="update"
      v-else
    ></router-view>
  </ChildPage>
</template>

<script>
import {
  mdiInformation,
  mdiAccountGroup,
  // mdiClipboardList,
  mdiAlert,
  // mdiCreditCard,
  // mdiCart,
  // mdiBagPersonal,
  // mdiFormSelect,
} from "@mdi/js";
import Alert from "../../../components/Alert";
import ChildPage from "../../../components/app/ChildPage.vue";

export default {
  components: {
    Alert,
    ChildPage,
  },

  data() {
    return {
      // Data fetching
      loading: false,
      error: null,

      // Overview
      name: "Activity",
      location: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,

      // User data
      role: null,

      navItems: [
        {
          title: "Overview",
          to: { name: "ActivityOverview" },
          icon: mdiInformation,
        },
        {
          title: "People",
          to: { name: "ActivityPeople" },
          icon: mdiAccountGroup,
        },
        // { title: "Plan", to: { name: "ActivityPlan" }, icon: mdiClipboardList },
        { title: "RAMS", to: { name: "ActivityRAMS" }, icon: mdiAlert },
        // {
        //   title: "Budget",
        //   to: { name: "ActivityBudget" },
        //   icon: mdiCreditCard,
        // },
        // {
        //   title: "Shopping List",
        //   to: { name: "ActivityShoppingList" },
        //   icon: mdiCart,
        // },
        // {
        //   title: "Gear List",
        //   to: { name: "ActivityGearList" },
        //   icon: mdiBagPersonal,
        // },
        // { title: "AIF", to: { name: "ActivityAIF" }, icon: mdiFormSelect },
      ],
    };
  },

  computed: {
    breadcrumbItems() {
      return [
        {
          text: "Activity Planner",
          to: { name: "ActivityPlanner" },
        },
        {
          text: this.name,
          disabled: true,
        },
      ];
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      // Display activities
      this.error = null;
      this.loading = true;

      this.$functions
        .httpsCallable("activityOverviewGet")({
          id: this.$route.params.activityId,
        })
        .then((data) => {
          // Success
          this.loading = false;

          this.name = data.data.name;
          this.location = data.data.location;
          this.startDate = data.data.startDate;
          this.startTime = data.data.startTime;
          this.endDate = data.data.endDate;
          this.endTime = data.data.endTime;
          this.role = data.data.role;
        })
        .catch((error) => {
          // Error
          this.loading = false;

          this.error =
            error.message === "internal"
              ? "An error occurred when connecting to the server."
              : error.message;
        });
    },

    // Overview value has been updated
    update(fieldName, v) {
      this[fieldName] = v;
    },
  },
};
</script>
