<template>
  <v-sheet elevation="2" rounded class="flex-grow-1">
    <v-container fluid class="pa-4">
      <v-row dense>
        <v-col cols="12">
          <h1 class="text-h4">Delete Account</h1>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" sm="6" md="8" lg="6">
          <p>
            If you no longer use AMS, you may delete your account. If you are
            only deleting because you have gotten a new email address, please
            note that you can change your email address in Login Methods.
          </p>
          <v-dialog v-model="dialog" width="25rem">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error" dark v-bind="attrs" v-on="on">
                <v-icon left dark>{{ deleteIcon }}</v-icon>
                Delete account
              </v-btn>
            </template>

            <v-sheet elevation="2" rounded>
              <v-toolbar dark color="error">
                <v-toolbar-title>Delete account</v-toolbar-title>
              </v-toolbar>
              <div class="pa-4">
                <p>
                  This action can't be undone! Are you sure that you want to
                  continue?
                </p>

                <Alert
                  type="error"
                  :message="error"
                  :link="errorLink"
                  class="mt-4"
                />

                <div class="d-flex justify-space-between flex-wrap mt-4">
                  <v-btn plain @click="dialog = false"> Cancel </v-btn>
                  <v-btn
                    color="error"
                    type="submit"
                    :loading="loading"
                    @click="deleteAccount"
                  >
                    <v-icon left dark>{{ deleteIcon }}</v-icon>
                    Delete account
                  </v-btn>
                </div>
              </div>
            </v-sheet>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import firebase from "firebase/app";
import Alert from "../../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      deleteIcon: mdiDelete,

      // Modal settings
      dialog: false,
      loading: false,
      error: null,

      // Firebase user
      user: null,
    };
  },

  mounted() {
    this.user = firebase.auth().currentUser;
  },

  methods: {
    deleteAccount() {
      this.loading = true;

      this.user
        .delete()
        .then(() => {
          // User deleted
          this.loading = false;
        })
        .catch((error) => {
          // An error occurred
          this.loading = false;

          if (error.code === "auth/requires-recent-login") {
            // User needs to reauthenticate

            this.error =
              "We need to confirm your identity before you do this. Please reauthenticate and try again.";
            this.errorLink = {
              text: "Reauthenticate",
              link: { name: "GeneralReauthenticate" },
            };
          } else {
            // Show error message as normal
            this.error = error.message;
          }
        });
    },
  },
};
</script>
