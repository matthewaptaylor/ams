<template>
  <div>
    <AppBar v-if="$vuetify.breakpoint.mobile" />

    <v-container class="pa-2 px-md-4">
      <Breadcrumbs
        :items="breadcrumbItems"
        v-if="!$vuetify.breakpoint.mobile"
      />

      <v-sheet
        elevation="2"
        rounded
        :style="{
          'min-height': $vuetify.breakpoint.mobile
            ? 'calc(100vh - 72px)'
            : null,
        }"
      >
        <slot></slot>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs.vue";
import AppBar from "../../components/app/AppBar.vue";

export default {
  components: {
    AppBar,
    Breadcrumbs,
  },

  props: {
    breadcrumbItems: Array,
  },
};
</script>
