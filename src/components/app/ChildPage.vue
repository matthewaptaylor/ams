<template>
  <div>
    <div
      style="position: sticky; top: 0; z-index: 5"
      v-if="$vuetify.breakpoint.mobile"
    >
      <v-toolbar dense color="primary" dark>
        <v-btn icon @click="goBack" style="width: 40px; height: 40px">
          <v-icon>{{ arrowLeftIcon }}</v-icon>
        </v-btn>

        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>

      <NavMobile :title="title" :items="navItems" v-if="navItems" />
    </div>

    <v-container class="pa-2 px-md-4">
      <Breadcrumbs
        :items="breadcrumbItems"
        v-if="!$vuetify.breakpoint.mobile"
      />

      <div class="d-flex align-start" style="gap: 1rem">
        <NavDesktop
          :title="title"
          :subtitle="subtitle"
          :items="navItems"
          v-if="!$vuetify.breakpoint.mobile && navItems"
        />

        <v-sheet
          elevation="2"
          rounded
          class="flex-grow-1"
          style="max-width: 100%"
        >
          <slot></slot>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiArrowLeft } from "@mdi/js";
import Breadcrumbs from "./Breadcrumbs.vue";
import NavMobile from "./NavMobile.vue";
import NavDesktop from "./NavDesktop.vue";

export default {
  data() {
    return {
      arrowLeftIcon: mdiArrowLeft,
    };
  },

  components: {
    Breadcrumbs,
    NavMobile,
    NavDesktop,
  },

  props: {
    title: String,
    subtitle: String,
    breadcrumbItems: Array,
    navItems: Array,
  },

  methods: {
    goBack() {
      const destination =
        this.breadcrumbItems[this.breadcrumbItems.length - 2].to;

      if (destination.name === this.$previousRoute.name) {
        this.$router.go(-1);
      } else {
        this.$router.replace(destination);
      }
    },
  },
};
</script>
