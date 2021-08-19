<template>
  <v-sheet elevation="2" rounded class="flex-grow-1 pa-4">
    <h1 class="text-h4">Login Methods</h1>

    <v-container fluid class="px-0">
      <v-row dense>
        <v-col cols="12">
          <h2 class="text-h5">Email and Password</h2>
        </v-col>

        <v-col cols="12" sm="6" md="8" lg="6" dense>
          <AutosaveText
            label="Email"
            type="email"
            :value="email"
            autocomplete="username"
            :rules="[(v) => !!v || 'Email is required']"
            :required="true"
            :error="emailError"
            @save="saveEmail"
          />
        </v-col>

        <v-col cols="12" dense v-if="!passwordProvider">
          <p>
            You currently can't login to this account with a password.

            <router-link :to="{ name: 'AccountResetPassword' }">
              Reset password </router-link
            >.
          </p>
        </v-col>

        <v-col cols="12" sm="6" md="8" lg="6" dense v-if="passwordProvider">
          <v-text-field
            value="        "
            label="Password"
            type="password"
            hint="You can change this in Reset Password"
            persistent-hint
            disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12">
          <h2 class="text-h5">Google</h2>
        </v-col>

        <v-col cols="12" dense v-if="!googleProvider">
          <p>You're not linked with a Google account.</p>

          <v-btn
            color="blue"
            dark
            :loading="linkGoogleLoading"
            @click="linkGoogle"
          >
            <v-icon left dark>{{ googleIcon }}</v-icon>
            Link Google account
          </v-btn>
        </v-col>

        <v-col cols="12" dense v-if="googleProvider">
          <p>
            You're linked with the account
            {{ googleProvider.email }}.
          </p>

          <v-btn
            color="error"
            dark
            :loading="unlinkGoogleLoading"
            @click="unlinkGoogle"
          >
            <v-icon left dark>{{ googleIcon }}</v-icon>
            Unlink Google account
          </v-btn>
        </v-col>

        <v-col cols="12" sm="6" md="8" lg="6" dense>
          <Error :message="googleError" />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mdiGoogle, mdiLock } from "@mdi/js";
import firebase from "firebase/app";
import AutosaveText from "../../../components/app/AutosaveText.vue";
import Error from "../../../components/app/Error.vue";

export default {
  components: { AutosaveText, Error },

  data() {
    return {
      googleIcon: mdiGoogle,
      lockResetIcon: mdiLock,

      user: null,
      signInMethods: null,

      passwordProvider: null,
      email: null,
      emailError: null,

      googleProvider: null,
      linkGoogleLoading: false,
      unlinkGoogleLoading: false,
      googleError: null,
    };
  },

  mounted() {
    // Get details from firebase
    this.updateUser();
    this.email = this.user.email;
  },

  methods: {
    updateUser() {
      // Update variables based on user when user updates, as computed properties don't seem to work
      this.user = firebase.auth().currentUser;

      // Get all the providers the user is linked with
      this.signInMethods = this.user?.providerData;

      // Gets the details of the user's google account. Returns undefined if there isn't one linked.
      this.passwordProvider = this.signInMethods?.find(
        (provider) => provider.providerId === "password"
      );

      // Gets the details of the user's Google account. Returns undefined if there isn't one linked.
      this.googleProvider = this.signInMethods?.find(
        (provider) => provider.providerId === "google.com"
      );
    },

    saveEmail(newEmail) {
      // Save a new email address to firebase auth
      this.user
        .updateEmail(newEmail)
        .then(() => {
          this.email = newEmail;
          this.emailError = null;
        })
        .catch((error) => {
          if (error.code === "auth/requires-recent-login") {
            this.emailError = {
              message:
                "We need to confirm your identity before you do this. Please reauthenticate and try again.",
              link: { name: "GeneralReauthenticate" },
              linkText: "Reauthenticate",
            };
          } else {
            this.emailError = error;
          }
        });
    },

    linkGoogle() {
      // Link the current user to a Google account

      this.googleError = null;
      this.linkGoogleLoading = true;

      firebase
        .auth()
        .currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          // Accounts successfully linked

          this.linkGoogleLoading = false;

          this.updateUser(); // Update user details
        })
        .catch((error) => {
          // Error in unlinking

          this.googleError = error.message;
          this.linkGoogleLoading = false;
        });
    },

    unlinkGoogle() {
      // Unlink a Google account from the current user

      this.showGoogleError = false;
      this.googleError = null;

      if (this.signInMethods.length <= 1) {
        // There is only one way left for the user to sign in

        this.googleError =
          "You cannot unlink this account because it is the only way you can currently sign in.";
      } else {
        // Allow user to unlink account

        this.unlinkGoogleLoading = true;

        this.user
          .unlink("google.com")
          .then(() => {
            // Accounts successfully unlinked

            this.unlinkGoogleLoading = false;

            this.updateUser(); // Update user details
          })
          .catch((error) => {
            // Error in unlinking

            this.googleError = error.message;
            this.unlinkGoogleLoading = false;
          });
      }
    },
  },
};
</script>
