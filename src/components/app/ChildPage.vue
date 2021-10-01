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
      <Alert
        type="error"
        message="Sorry, to ensure privacy we need to verify your email before you can use AMS."
        class="mt-3 mb-5"
        v-if="!emailVerified"
      />

      <Breadcrumbs
        :items="breadcrumbItems"
        v-if="!$vuetify.breakpoint.mobile && emailVerified"
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
          :style="{
            'min-height': $vuetify.breakpoint.mobile
              ? `calc(100vh - ${72 + (navItems ? 40 : 0)}px)`
              : null,
          }"
        >
          <slot></slot>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiArrowLeft } from "@mdi/js";
import Alert from "../Alert.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import NavMobile from "./NavMobile.vue";
import NavDesktop from "./NavDesktop.vue";

export default {
  data() {
    return {
      // Icons
      arrowLeftIcon: mdiArrowLeft,

      // EMail verified alert
      emailVerified: this.$currentUser.emailVerified,
    };
  },

  components: {
    Alert,
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

  created() {
    // Add event listener for when the global user object changes
    document.addEventListener("currentUserChanged", this.updateVerified);
  },

  beforeDestroy() {
    document.removeEventListener("currentUserChanged", this.updateVerified);
  },

  methods: {
    updateVerified() {
      // Update the user verified variable
      this.emailVerified = this.$currentUser.emailVerified;
    },
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
