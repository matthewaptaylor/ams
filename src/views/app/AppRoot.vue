<template>
  <div id="app-root">
    <v-app-bar color="primary" dark app>
      <img
        alt="Scouts Aotearoa logo"
        src="@/assets/images/toolbar-logo.svg"
        class="d-none d-md-block me-4 py-2"
        style="height: 100%"
      />

      <v-app-bar-title>Activity Management System</v-app-bar-title>

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
          <v-list-item @click="signOut">
            <v-list-item-icon>
              <v-icon>{{ logoutIcon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<style scoped>
#app-root {
  min-height: 100vh;
  background-image: url("../../assets/images/white-background.svg");
  background-size: cover;
  background-position: center;
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