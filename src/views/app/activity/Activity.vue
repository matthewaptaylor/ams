<template>
  <ChildPage
    :title="name"
    :breadcrumbItems="breadcrumbItems"
    :navItems="navItems"
    :loading="loading"
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
      :requiresAIF="requiresAIF"
      :requiresRAMS="requiresRAMS"
      :category="category"
      :scoutGroup="scoutGroup"
      :scoutZoneRegion="scoutZoneRegion"
      :description="description"
      :location="location"
      :startDate="startDate"
      :startTime="startTime"
      :endDate="endDate"
      :endTime="endTime"
      :numbers="numbers"
      :activityLeader="activityLeader"
      :contact="contact"
      :signatures="signatures"
      :activityLeaderUID="activityLeaderUID"
      :remindEmails="remindEmails"
      :remindTimes="remindTimes"
      :viewer="role === 'Viewer'"
      @update="update"
      v-else
    ></router-view>
  </ChildPage>
</template>

<script>
import {
  mdiInformation,
  mdiAccountGroup,
  mdiClipboardList,
  mdiAlert,
  mdiCreditCard,
  // mdiCart,
  // mdiBagPersonal,
  mdiRoutes,
  mdiFormSelect,
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
      requiresAIF: null,
      requiresRAMS: null,
      category: null,
      scoutGroup: null,
      scoutZoneRegion: null,
      description: null,
      location: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      numbers: {},
      activityLeader: {},
      contact: {},
      signatures: {},
      activityLeaderUID: null,
      remindEmails: [],
      remindTimes: [],

      // User data
      role: null,
    };
  },

  computed: {
    navItems() {
      let items = [
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
        { title: "Plan", to: { name: "ActivityPlan" }, icon: mdiClipboardList },
        {
          title: "Budget",
          to: { name: "ActivityBudget" },
          icon: mdiCreditCard,
        },
      ];

      if (this.requiresAIF) {
        items.push({
          title: "Route",
          to: { name: "ActivityRoute" },
          icon: mdiRoutes,
        });
      }

      if (this.requiresRAMS) {
        items.push({
          title: "RAMS",
          to: { name: "ActivityRAMS" },
          icon: mdiAlert,
        });
      }

      if (this.requiresAIF) {
        items.push({
          title: "Activity Intention",
          to: { name: "ActivityAIF" },
          icon: mdiFormSelect,
        });
      }

      return items;
    },

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
          this.requiresAIF = data.data.requiresAIF;
          this.requiresRAMS = data.data.requiresRAMS;
          this.category = data.data.category;
          this.description = data.data.description;
          this.location = data.data.location;
          this.scoutGroup = data.data.scoutGroup;
          this.scoutZoneRegion = data.data.scoutZoneRegion;
          this.startDate = data.data.startDate;
          this.startTime = data.data.startTime;
          this.endDate = data.data.endDate;
          this.endTime = data.data.endTime;
          this.numbers = data.data.numbers;
          this.activityLeader = data.data.activityLeader;
          this.contact = data.data.contact;
          this.signatures = data.data.signatures;
          this.role = data.data.role;
          this.activityLeaderUID = data.data.activityLeaderUID;
          this.remindEmails = data.data.remindEmails;
          this.remindTimes = data.data.remindTimes;
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
      const fieldPath = fieldName.split("."); // e.g. if fieldName is activityLeader.name, split into ["activityLeader", "name"]

      if (fieldPath.length == 2) {
        this[fieldPath[0]] = { ...this[fieldPath[0]], [fieldPath[1]]: v };
      } else {
        this[fieldName] = v;
      }
    },
  },
};
</script>
