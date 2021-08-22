<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">{{ action }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" v-if="this.action === 'Reauthenticate'">
        <p>To continue, we need you need to confirm your identity.</p>
      </v-col>

      <v-col cols="12" v-if="providers.includes('google.com')">
        <v-btn
          block
          color="blue"
          class="white--text"
          :loading="googleLoading"
          :disabled="googleLoading"
          @click="signInWithGoogle"
          style="max-width: 100%"
        >
          <v-icon left dark>{{ googleIcon }}</v-icon>
          {{ action }} with Google
        </v-btn>

        <Alert type="error" :message="googleError" class="mt-5" />
      </v-col>

      <v-col cols="12" v-if="providers.length === 2">
        <div
          class="text--secondary text-center"
          style="position: relative; height: 1rem"
        >
          <v-divider
            style="
              position: absolute;
              margin: calc(0.5rem - 1px) 0 0.5rem;
              width: 100%;
            "
          />
          <div
            style="
              position: absolute;
              width: 100%;
              line-height: 1rem;
              text-align: center;
            "
          >
            <span class="d-inline-block px-2 white"> OR </span>
          </div>
        </div>
      </v-col>

      <v-col cols="12">
        <v-form
          v-model="valid"
          @submit.prevent="signIn"
          v-if="providers.includes('password')"
        >
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                autocomplete="username"
                type="email"
                label="Email"
                :prepend-icon="emailIcon"
                required
                ref="emailInput"
              ></v-text-field>

              <v-btn
                text
                color="primary"
                x-small
                style="margin-top: -18px; margin-bottom: -2px; float: right"
                v-if="showEmailLinkButton && action === 'Sign In'"
                :loading="emailLinkLoading"
                :disabled="emailLinkLoading"
                @click="signInWithEmailLink"
              >
                Sign in with email link
              </v-btn>

              <Alert
                type="success"
                :message="emailLinkSuccess"
                class="mt-2 mb-0"
              />

              <Alert type="error" :message="emailLinkError" class="mt-2 mb-0" />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                autocomplete="current-password"
                label="Password"
                :prepend-icon="lockIcon"
                required
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? eyeIcon : eyeOffIcon"
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-btn
                plain
                x-small
                style="margin-top: -18px; margin-bottom: -2px; float: right"
                to="forgotpassword"
              >
                Forgot password?
              </v-btn>
            </v-col>

            <v-col cols="12" class="mt-2">
              <Alert type="error" :message="error" class="mb-2" />

              <v-btn
                block
                color="primary"
                type="submit"
                :disabled="!valid || loading"
                :loading="loading"
              >
                <v-icon left dark>{{ loginIcon }}</v-icon>
                {{ action }}
              </v-btn>
            </v-col>

            <v-col cols="12">
              <v-btn plain block :to="{ name: 'GeneralSignUp' }">Sign up</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import {
  mdiGoogle,
  mdiEmail,
  mdiLock,
  mdiEye,
  mdiEyeOff,
  mdiLogin,
} from "@mdi/js";
import firebase from "firebase/app";
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Change name of the page based on whether the URL is sign in or reauthenticate
      action: {
        GeneralReauthenticate: "Reauthenticate",
        GeneralSignIn: "Sign In",
      }[this.$route.name],

      // Icons
      googleIcon: mdiGoogle,
      googleLoading: false,
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      eyeIcon: mdiEye,
      eyeOffIcon: mdiEyeOff,
      loginIcon: mdiLogin,

      googleError: null,

      // Form control
      loading: false,
      valid: false,
      email: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
      showPassword: false,
      error: null,

      // Email link sign in
      showEmailLinkButton: false,
      emailLinkLoading: false,
      emailLinkError: null,
      emailLinkSuccess: null,
    };
  },

  computed: {
    providers() {
      if (this.action === "Reauthenticate") {
        return firebase
          .auth()
          .currentUser.providerData.map((provider) => provider.providerId);
      } else {
        return ["google.com", "password"];
      }
    },
  },

  watch: {
    email() {
      // Show sign in with email button when the email input is valid

      if (this.$refs.emailInput.validate()) {
        // Show email link option to user

        this.showEmailLinkButton = true;
      } else {
        // Hide email link option from user

        this.showEmailLinkButton = false;
      }
    },
  },

  methods: {
    signInWithGoogle() {
      this.googleLoading = true;
      this.googleError = null;

      if (this.action === "Sign In") {
        firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(() => {
            this.googleLoading = false;
          })
          .catch((error) => {
            this.googleLoading = false;
            this.googleError = error.message;
          });
      } else {
        // Reauthenticate the user
        firebase
          .auth()
          .currentUser.reauthenticateWithPopup(
            new firebase.auth.GoogleAuthProvider()
          )
          .then(() => {
            // Success
            this.googleLoading = false;

            // Redirect back to the account page
            this.$router.go(-1);
          })
          .catch((error) => {
            this.googleLoading = false;
            this.googleError = error.message;
          });
      }
    },

    signInWithEmailLink() {
      // Send an email link to the user to sign in with
      this.emailLinkLoading = true;
      this.emailLinkError = null;
      this.emailLinkSuccess = null;

      const actionCodeSettings = {
        // The settings for the link to send to the user
        url: "http://ams-scouts-aotearoa.web.app/emailaction",
        handleCodeInApp: true,
      };

      firebase
        .auth()
        .sendSignInLinkToEmail(this.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          this.emailLinkLoading = false;
          this.emailLinkSuccess = `A sign in link has been sent to ${this.email}.`;

          window.localStorage.setItem("emailForSignIn", this.email); // Store the email so the user doesn't need to enter it again
        })
        .catch((error) => {
          // An error occurred
          this.emailLinkLoading = false;
          this.emailLinkError = error.message;
        });
    },

    signIn() {
      this.loading = true;
      this.error = null;

      if (this.action === "Sign In") {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // Signed in
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.error = error.message;
          });
      } else {
        // Reauthenticate the user
        this.error = null;

        var credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          this.password
        );

        firebase
          .auth()
          .currentUser.reauthenticateWithCredential(credential)
          .then(() => {
            // Success
            this.loading = false;

            // Redirect back to the account page
            this.$router.go(-1);
          })
          .catch((error) => {
            this.loading = false;
            this.error = error.message;
          });
      }
    },
  },
};
</script>
