<template>
  <v-app-bar
    color="primary"
    dark
    :class="{
      'v-app-bar--hide':
        $vuetify.breakpoint.mobile && $route.name !== 'ActivityPlanner',
    }"
    :style="{
      maxHeight: $vuetify.breakpoint.mobile ? '56px' : '64px',
    }"
    style="position: sticky; top: 0; z-index: 5"
  >
    <img
      alt="Scouts Aotearoa logo"
      src="@/assets/images/logo.svg"
      class="me-4 py-2"
      style="height: 100%"
      draggable="false"
    />

    <v-app-bar-title>
      {{
        $vuetify.breakpoint.name === "xs" ? "AMS" : "Activity Management System"
      }}
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-menu offset-y bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <img
            :src="photoURL"
            alt="User picture"
            v-if="photoURL"
            style="width: 36px; border-radius: 50%"
          />

          <avatar
            :username="displayName"
            :size="36"
            backgroundColor="var(--v-primary-darken1)"
            color="#ffffff"
            v-if="!photoURL"
          ></avatar>
        </v-btn>
      </template>

      <v-list dense nav style="max-width: 15rem">
        <v-list-item>
          <v-list-item-title class="font-weight-regular text-body-2">
            Kia ora,
            {{ displayName }}!
          </v-list-item-title>
        </v-list-item>

        <v-subheader>Menu</v-subheader>

        <v-list-item :to="{ name: 'About' }">
          <v-list-item-icon>
            <v-icon>{{ informationIcon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="font-weight-regular text-body-2">
            About
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="showInstallItem" @click="$appPrompt.prompt()">
          <v-list-item-icon>
            <v-icon>{{ downloadIcon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="font-weight-regular text-body-2">
            Install App
          </v-list-item-title>
        </v-list-item>

        <v-subheader>Account</v-subheader>

        <v-list-item :to="{ name: 'AccountProfile' }">
          <v-list-item-icon>
            <v-icon>{{ accountIcon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="font-weight-regular text-body-2">
            My Account
          </v-list-item-title>
        </v-list-item>

        <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon>{{ logoutIcon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="font-weight-regular text-body-2">
            Sign Out
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style>
.v-app-bar-title__content {
  width: unset !important;
}
</style>

<script>
import { mdiAccount, mdiInformation, mdiDownload, mdiLogout } from "@mdi/js";
import firebase from "firebase/app";
import Avatar from "vue-avatar";

export default {
  components: { Avatar },

  data() {
    return {
      accountIcon: mdiAccount,
      informationIcon: mdiInformation,
      downloadIcon: mdiDownload,
      logoutIcon: mdiLogout,

      displayName: "",
      photoURL: false,

      showInstallItem: !!this.$appPrompt,
    };
  },

  created() {
    // Add event listener for when the global user object changes
    document.addEventListener("currentUserChanged", this.updateDetails);

    // Add event listener for when the app prompt state changes
    document.addEventListener("appPromptChanged", this.updateInstallItem);
  },

  beforeDestroy() {
    document.removeEventListener("currentUserChanged", this.updateDetails);
    document.removeEventListener("appPromptChanged", this.updateInstallItem);
  },

  mounted() {
    this.updateDetails();
  },

  methods: {
    signOut() {
      firebase.auth().signOut();
    },

    updateDetails() {
      // Choose personal details to display for user
      if (this.$currentUser) {
        this.displayName =
          this.$currentUser.displayName ?? this.$currentUser.email;
        this.photoURL = this.$currentUser.photoURL ?? false;
      }
    },

    updateInstallItem() {
      this.showInstallItem = !!this.$appPrompt;
    },
  },
};
</script>
