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
          <Alert dismissable type="error" :message="error" class="mb-2" />

          <v-list two-line>
            <div
              v-for="(category, categoryIndex) in activityCategories"
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
      plusIcon: mdiPlus,
      chevronRightIcon: mdiChevronRight,
      mapSearchIcon: mdiMapSearch,

      // Nav
      breadcrumbItems: [
        {
          text: "Activity Planner",
          disabled: true,
        },
      ],

      // Activities
      loading: true,
      error: null,

      activityCategories: [
        {
          header: "Activities you're running",
          icon: mdiAccountSupervisor,
          activities: [],
        },
        {
          header: "Other activities",
          icon: mdiEye,
          activities: [],
        },
      ],
    };
  },

  mounted() {
    // Display activities
    this.error = null;

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
            ? 0
            : 1;

          this.activityCategories[activityCategory].activities.push(activity);
        });
      })
      .catch((error) => {
        // Error
        this.loading = false;

        this.error = error.message;
      });
  },
};
</script>
