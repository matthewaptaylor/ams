<template>
  <v-container class="">
    <v-breadcrumbs :items="breadcrumbItems" class="pt-0 pb-3">
      <template v-slot:divider>
        <v-icon>{{ chevronRightIcon }}</v-icon>
      </template>
    </v-breadcrumbs>
    <v-sheet elevation="2" rounded class="pa-4">Dashboard</v-sheet>
  </v-container>
</template>
<style scoped></style>
<script>
import { mdiChevronRight } from "@mdi/js";

export default {
  data() {
    return {
      chevronRightIcon: mdiChevronRight,
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Link 1",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Link 2",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
    };
  },
};
</script>
