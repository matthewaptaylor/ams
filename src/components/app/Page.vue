<template>
  <v-container class="pa-2 px-md-4">
    <Breadcrumbs :items="breadcrumbItems" v-if="!$vuetify.breakpoint.mobile" />
    <v-sheet elevation="2" rounded>
      <slot></slot>
    </v-sheet>
  </v-container>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },

  props: {
    breadcrumbItems: Array,
  },
};
</script>
