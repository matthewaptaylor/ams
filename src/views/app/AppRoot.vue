<template>
  <div id="app-root">
    <v-app-bar color="primary" dark app>
      <img
        alt="Scouts Aotearoa logo"
        src="@/assets/images/app-logo.svg"
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
    <v-main class="mx-auto">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<style scoped>
#app-root {
  min-height: 100%;
  background-image: url("../../assets/images/background.svg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>

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

  mounted() {
    this.updateDetails();

    // Add event listener for when the global user object changes
    document
      .querySelector("#app")
      .addEventListener("currentUserChanged", () => {
        this.updateDetails();
      });
  },

  methods: {
    signOut() {
      firebase.auth().signOut();
    },
    updateDetails() {
      // Choose personal details to display for user
      this.displayName =
        this.$currentUser.displayName ?? this.$currentUser.email;
      this.photoURL = this.$currentUser.photoURL ?? false;
    },
  },
};
</script>
