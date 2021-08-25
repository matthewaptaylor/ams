<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Sign In Methods</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" v-if="!this.$currentUser.emailVerified">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Verify Email</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" sm="6" md="8" lg="6">
            <p class="mb-2">Your email address hasn't been verified.</p>

            <v-btn
              color="primary"
              :loading="verifyEmailLoading"
              :disabled="verifyEmailLoading"
              @click="verifyEmail"
            >
              <v-icon left dark>{{ emailSendIcon }}</v-icon>
              Verify email
            </v-btn>

            <Alert type="success" :message="verifyEmailSuccess" class="mt-2" />

            <Alert type="error" :message="verifyEmailError" class="mt-2" />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Email and Password</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" sm="6" md="8" lg="6">
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
            <p class="mb-0">
              You currently can't sign in to this account with a password.

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
      </v-col>

      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Google</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" sm="6" md="8" lg="6">
            <template v-if="!googleProvider">
              <p>You're not linked with a Google account.</p>

              <v-btn
                color="blue"
                :loading="linkGoogleLoading"
                :disabled="linkGoogleLoading"
                @click="linkGoogle"
                class="white--text"
              >
                <v-icon left dark>{{ googleIcon }}</v-icon>
                Link Google account
              </v-btn>
            </template>

            <template v-if="googleProvider">
              <p class="mb-2">
                You're linked with the Google account
                {{ googleProvider.email }}.
              </p>

              <v-btn
                color="error"
                :loading="unlinkGoogleLoading"
                :disabled="unlinkGoogleLoading"
                @click="unlinkGoogle"
              >
                <v-icon left dark>{{ googleIcon }}</v-icon>
                Unlink Google account
              </v-btn>
            </template>

            <Alert type="error" :message="googleError" class="mt-2" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiEmailSend, mdiGoogle, mdiLock } from "@mdi/js";
import firebase from "firebase/app";
import AutosaveText from "../../../components/app/AutosaveText.vue";
import Alert from "../../../components/Alert.vue";

export default {
  components: { AutosaveText, Alert },

  data() {
    return {
      emailSendIcon: mdiEmailSend,
      googleIcon: mdiGoogle,
      lockResetIcon: mdiLock,

      signInMethods: null,

      verifyEmailLoading: false,
      verifyEmailSuccess: null,
      verifyEmailError: null,

      passwordProvider: null,
      email: this.$currentUser.email,
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
  },

  methods: {
    updateUser() {
      // Get all the providers the user is linked with
      this.signInMethods = this.$currentUser?.providerData;

      // Gets the details of the user's google account. Returns undefined if there isn't one linked.
      this.passwordProvider = this.signInMethods?.find(
        (provider) => provider.providerId === "password"
      );

      // Gets the details of the user's Google account. Returns undefined if there isn't one linked.
      this.googleProvider = this.signInMethods?.find(
        (provider) => provider.providerId === "google.com"
      );
    },

    verifyEmail() {
      // Send a verification email
      this.verifyEmailLoading = true;
      this.verifyEmailSuccess = null;
      this.verifyEmailError = null;

      this.$currentUser
        .sendEmailVerification()
        .then(() => {
          // Email verification sent
          this.verifyEmailLoading = false;

          this.verifyEmailSuccess = "A verification email has been sent.";
        })
        .catch((error) => {
          // An error ocurred
          this.verifyEmailLoading = false;

          this.verifyEmailError = error.message;
        });
    },

    saveEmail(newEmail) {
      // Save a new email address to firebase auth
      this.$currentUser
        .updateEmail(newEmail)
        .then(() => {
          this.email = newEmail;
          this.emailError = null;

          this.$updateUser(); // Update the global user object to match
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

      this.$currentUser
        .linkWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          // Accounts successfully linked

          this.linkGoogleLoading = false;

          this.updateUser(); // Update user details
          this.$updateUser(); // Update the global user object to match
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

        this.$currentUser
          .unlink("google.com")
          .then(() => {
            // Accounts successfully unlinked

            this.unlinkGoogleLoading = false;

            this.updateUser(); // Update user details
            this.$updateUser(); // Update the global user object to match
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
