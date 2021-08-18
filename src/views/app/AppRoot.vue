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
            <v-icon>{{ accountIcon }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Kia ora!</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Account' }">
            <v-list-item-icon>
              <v-icon>{{ accountIcon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My account</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signOut">
            <v-list-item-icon>
              <v-icon>{{ logoutIcon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign out</v-list-item-title>
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
  background-image: url("../../assets/images/white-background.svg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>

<script>
import { mdiAccount, mdiLogout } from "@mdi/js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      accountIcon: mdiAccount,
      logoutIcon: mdiLogout,
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
    },
  },
};
</script>
