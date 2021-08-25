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

    <v-app-bar-title v-if="!$vuetify.breakpoint.mobile">
      Activity Management System
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
            backgroundColor="#00000020"
            color="#ffffff"
            v-if="!photoURL"
          ></avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            Kia ora,
            {{ displayName }}!
          </v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ name: 'AccountProfile' }">
          <v-list-item-icon>
            <v-icon>{{ accountIcon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title>My Account</v-list-item-title>
        </v-list-item>

        <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon>{{ logoutIcon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mdiAccount, mdiLogout } from "@mdi/js";
import firebase from "firebase/app";
import Avatar from "vue-avatar";

export default {
  components: { Avatar },

  data() {
    return {
      accountIcon: mdiAccount,
      logoutIcon: mdiLogout,

      displayName: "",
      photoURL: false,
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
  },
};
</script>
