<template>
  <div>
    <!-- Only show if on mobile, as not shown in the AppRoot component -->
    <AppBar v-if="$vuetify.breakpoint.mobile" />
    <v-container v-if="!emailVerified" class="px-2 px-md-4 py-0">
      <Alert
        type="error"
        message="Your email address has not been verified."
        :link="{
          text: 'Verify email',
          link: { name: 'AccountSignInMethods' },
        }"
        class="mt-2"
      />
    </v-container>
    <Page :breadcrumbItems="breadcrumbItems">
      <v-container class="pa-4">
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center flex-wrap"
            style="column-gap: 1rem; row-gap: 0.5rem"
          >
            <h1 class="text-h4">Activity Planner</h1>

            <v-btn color="primary" @click="$emit('showDialog')">
              <v-icon left dark>{{ plusIcon }}</v-icon>
              Create activity
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-list two-line>
              <template v-for="(category, categoryIndex) in activityCategories">
                <v-divider
                  v-if="categoryIndex !== 0"
                  :key="category.categoryIndex"
                />

                <v-subheader :key="category.header">
                  <v-icon left>{{ category.icon }}</v-icon>
                  {{ category.header }}
                </v-subheader>

                <template v-for="activity in category.activities">
                  <v-list-item
                    :to="{
                      name: 'ActivityOverview',
                      params: { activityId: 1 },
                    }"
                    :key="activity.id"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="activity.name"
                      ></v-list-item-title>

                      <v-list-item-subtitle>
                        <span class="text--primary">
                          {{ dateToString(activity.startDate) }} to
                          {{ dateToString(activity.endDate) }}
                        </span>

                        <template v-if="categoryIndex !== 0">
                          &mdash; Led by {{ activity.activityLeader }}
                        </template>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </Page>
  </div>
</template>
<style scoped></style>
<script>
import { mdiAccount, mdiAccountSupervisor, mdiEye, mdiPlus } from "@mdi/js";
import Alert from "../../components/Alert";
import AppBar from "../../components/app/AppBar.vue";
import Page from "../../components/app/Page.vue";

export default {
  components: {
    AppBar,
    Page,
    Alert,
  },

  data() {
    return {
      // Icons
      plusIcon: mdiPlus,

      emailVerified: true, // Assume by default the user's email is verified

      breadcrumbItems: [
        {
          text: "Activity Planner",
          disabled: true,
        },
      ],
      activityCategories: [
        {
          header: "Activities you're leading",
          icon: mdiAccount,
          activities: [
            {
              id: 0,
              name: "Wellington Trip",
              startDate: new Date(),
              endDate: new Date(),
              activityLeader: "Matthew Taylor",
            },
          ],
        },
        {
          header: "Activities you're assisting",
          icon: mdiAccountSupervisor,
          activities: [
            {
              id: 1,
              name: "Wellington Trip",
              startDate: new Date(),
              endDate: new Date(),
              activityLeader: "Matthew Taylor",
            },
          ],
        },
        {
          header: "Activities you can view",
          icon: mdiEye,
          activities: [
            {
              id: 2,
              name: "Wellington Trip",
              startDate: new Date(),
              endDate: new Date(),
              activityLeader: "Matthew Taylor",
            },
          ],
        },
      ],
    };
  },

  created() {
    // Add event listener for when the global user object changes
    document.addEventListener("currentUserChanged", () => {
      this.updateDetails();
    });
  },

  mounted() {
    this.updateDetails();
  },

  methods: {
    dateToString(date) {
      return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    },

    updateDetails() {
      // Choose personal details to display for user
      if (this.$currentUser) {
        this.emailVerified = this.$currentUser?.emailVerified;
      }
    },
  },
};
</script>
