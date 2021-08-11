<template>
  <v-container>
    <Breadcrumbs :items="breadcrumbItems" />
    <v-sheet elevation="2" rounded class="pa-4">Activity view</v-sheet>
  </v-container>
</template>
<style scoped></style>
<script>
import Breadcrumbs from "../components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: "Activities",
          to: { name: "Activities" },
        },
        {
          text: "Sample activity",
        },
      ],
    };
  },
};
</script>
