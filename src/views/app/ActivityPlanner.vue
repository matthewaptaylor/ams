<template>
  <v-container>
    <Breadcrumbs :items="breadcrumbItems" />
    <v-sheet elevation="2" rounded class="pa-4">
      <div
        class="d-flex justify-space-between align-center flex-wrap"
        style="column-gap: 1rem; row-gap: 0.5rem"
      >
        <h1>Activity Planner</h1>
        <ActivityCreate />
      </div>
      <v-list two-line>
        <template v-for="(category, categoryIndex) in activityCategories">
          <v-divider v-if="categoryIndex !== 0" :key="category.categoryIndex" />

          <v-subheader :key="category.header">
            <v-icon left>{{ category.icon }}</v-icon>
            {{ category.header }}
          </v-subheader>

          <template v-for="activity in category.activities">
            <v-list-item
              :to="{ name: 'ActivityOverview', params: { activityId: 1 } }"
              :key="activity.id"
            >
              <v-list-item-content>
                <v-list-item-title v-html="activity.name"></v-list-item-title>
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
    </v-sheet>
  </v-container>
</template>
<style scoped></style>
<script>
import { mdiAccount, mdiAccountSupervisor, mdiEye } from "@mdi/js";
import Breadcrumbs from "../../components/app/Breadcrumbs.vue";
import ActivityCreate from "../../components/app/ActivityCreate.vue";

export default {
  components: {
    Breadcrumbs,
    ActivityCreate,
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: "Activity Planner",
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
          header: "Activities you can ciew",
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
  methods: {
    dateToString(date) {
      return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    },
  },
};
</script>