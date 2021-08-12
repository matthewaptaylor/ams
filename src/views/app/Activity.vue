<template>
  <v-container>
    <Breadcrumbs :items="breadcrumbItems" />
    <v-sheet elevation="2" rounded class="d-md-none mb-4 pa-4">
      <h6 class="text-h6" style="line-height: 1.2">{{ activityName }}</h6>
      <v-chip-group mandatory active-class="primary--text">
        <v-chip v-for="item in navItems" :to="item.to" :key="item.title">
          {{ item.title }}
        </v-chip>
      </v-chip-group>
    </v-sheet>
    <div class="d-flex flex-wrap align-start" style="gap: 1rem">
      <v-sheet
        elevation="2"
        rounded
        class="d-none d-md-block"
        style="width: 14rem"
      >
        <v-navigation-drawer floating permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ activityName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ activityDates }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <v-list dense nav>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="item in navItems"
                :to="item.to"
                :key="item.title"
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>
      <router-view></router-view>
    </div>
  </v-container>
</template>
<style scoped></style>
<script>
import Breadcrumbs from "../../components/app/Breadcrumbs.vue";
import {
  mdiInformation,
  mdiClipboardList,
  mdiAlert,
  mdiCreditCard,
  mdiCart,
  mdiBagPersonal,
  mdiFormSelect,
} from "@mdi/js";

export default {
  components: {
    Breadcrumbs,
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
          text: "Activities",
          to: { name: "Activities" },
        },
        {
          text: "Wellington trip",
        },
      ],
    };
  },
};
</script>
