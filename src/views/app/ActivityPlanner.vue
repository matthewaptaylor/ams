<template>
  <Page :breadcrumbItems="breadcrumbItems">
    <v-container fluid class="pa-4">
      <v-row>
        <v-col
          cols="12"
          class="d-flex justify-space-between align-center flex-wrap"
          style="column-gap: 1rem; row-gap: 0.5rem"
        >
          <h1 class="text-h4">Activity Planner</h1>

          <v-btn
            color="primary"
            @click="$emit('showDialog')"
            v-if="$vuetify.breakpoint.name !== 'xs'"
          >
            <v-icon left dark>{{ plusIcon }}</v-icon>
            Create activity
          </v-btn>

          <v-btn
            color="primary"
            fab
            fixed
            bottom
            right
            v-else
            @click="$emit('showDialog')"
          >
            <v-icon>{{ plusIcon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <Alert
            type="error"
            :message="error"
            :action="{ text: 'Retry', callback: load }"
            class="mb-2"
          />

          <v-text-field
            v-model="search"
            label="Search"
            :append-icon="closeCircleIcon"
            @click:append="search = ''"
            hide-details="auto"
            autofocus
            outlined
            dense
          ></v-text-field>

          <v-list two-line>
            <div
              v-for="(category, categoryIndex) in filteredActivities"
              :key="category.categoryIndex"
            >
              <v-divider v-if="categoryIndex !== 0" />

              <v-subheader>
                <v-icon left>{{ category.icon }}</v-icon>
                {{ category.header }}
              </v-subheader>

              <template v-for="activity in category.activities">
                <v-list-item
                  :to="{
                    name: 'ActivityOverview',
                    params: { activityId: activity.id },
                  }"
                  :key="activity.id"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="activity.name" />
                    <v-list-item-subtitle v-text="activity.role" />
                  </v-list-item-content>

                  <v-list-item-icon class="my-6">
                    <v-icon>
                      {{ chevronRightIcon }}
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </template>

              <v-skeleton-loader
                max-width="300"
                type="list-item-two-line"
                v-if="loading"
              ></v-skeleton-loader>

              <v-list-item v-if="!category.activities.length && !loading">
                <v-list-item-content class="text--secondary text-center">
                  <v-icon>{{ mapSearchIcon }}</v-icon>

                  <v-list-item-title class="text-wrap">
                    We searched all over, but there's nothing here.
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </Page>
</template>
<style scoped></style>
<script>
import {
  mdiCloseCircle,
  mdiChevronRight,
  mdiAccountSupervisor,
  mdiEye,
  mdiPlus,
  mdiMapSearch,
} from "@mdi/js";
import Alert from "../../components/Alert";
import Page from "../../components/app/Page.vue";

export default {
  components: {
    Page,
    Alert,
  },

  data() {
    return {
      // Icons
      closeCircleIcon: mdiCloseCircle,
      plusIcon: mdiPlus,
      chevronRightIcon: mdiChevronRight,
      mapSearchIcon: mdiMapSearch,

      search: null,

      // Nav
      breadcrumbItems: [
        {
          text: "Activity Planner",
          disabled: true,
        },
      ],

      // Activities
      loading: null,
      error: null,

      runningActivities: [],
      otherActivities: [],
    };
  },

  mounted() {
    this.load();
  },

  computed: {
    filteredActivities() {
      return [
        {
          header: "Activities you're running",
          icon: mdiAccountSupervisor,
          activities: this.search
            ? this.runningActivities.filter((activity) =>
                activity.name.toLowerCase().includes(this.search)
              )
            : this.runningActivities,
        },
        {
          header: "Other activities",
          icon: mdiEye,
          activities: this.search
            ? this.otherActivities.filter((activity) =>
                activity.name.toLowerCase().includes(this.search)
              )
            : this.otherActivities,
        },
      ];
    },
  },

  methods: {
    load() {
      // Display activities
      this.error = null;
      this.loading = true;

      var activityPlannerGetActivities = this.$functions.httpsCallable(
        "activityPlannerGetActivities"
      );

      activityPlannerGetActivities()
        .then((data) => {
          // Success
          this.loading = false;

          data.data.forEach((activity) => {
            // Sort each activity the user has access to into categories
            const activityCategory = ["Activity Leader", "Assisting"].includes(
              activity.role
            )
              ? "runningActivities"
              : "otherActivities";

            this[activityCategory].push(activity);
          });
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
  },
};
</script>
