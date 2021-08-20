<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h4">{{ action }}</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <p v-if="this.action === 'Reauthenticate'">
          To continue, we need you need to confirm your identity.
        </p>
      </v-col>
    </v-row>

    <v-row dense v-if="providers.includes('google.com')">
      <v-col cols="12">
        <v-btn
          block
          color="blue"
          dark
          class="mt-4"
          :loading="googleLoading"
          @click="signInWithGoogle"
        >
          <v-icon left dark>{{ googleIcon }}</v-icon>
          {{ action }} with Google
        </v-btn>

        <v-alert type="error" class="mt-4" v-if="googleError">
          {{ googleError }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row dense v-if="providers.length === 2">
      <v-col cols="12">
        <div
          style="
            position: relative;
            margin-top: 1rem;
            height: 1rem;
            text-align: center;
            font-weight: 500;
          "
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
            <span
              style="
                display: inline-block;
                padding: 0 0.5rem;
                background-color: #ffffff;
              "
            >
              OR
            </span>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-form
          v-model="valid"
          :disabled="loading"
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
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                autocomplete="current-password"
                type="password"
                label="Password"
                :prepend-icon="lockIcon"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
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
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <div
          class="d-flex justify-space-between flex-wrap"
          style="gap: 1rem"
          v-if="this.action === 'Sign In'"
        >
          <v-btn plain to="forgotpassword">Forgot password?</v-btn>

          <v-btn plain to="signup">Or sign up...</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import { mdiGoogle, mdiEmail, mdiLock, mdiLogin } from "@mdi/js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      // Change name of the page based on whether the URL is sign in or reauthenticate
      action: {
        GeneralReauthenticate: "Reauthenticate",
        GeneralSignIn: "Sign In",
      }[this.$route.name],

      googleIcon: mdiGoogle,
      googleLoading: false,
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      loginIcon: mdiLogin,
      loading: false,
      valid: false,
      error: null,
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
      googleError: null,
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
  methods: {
    signInWithGoogle() {
      this.googleLoading = true;

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
            this.googleError = null;

            // Redirect back to the account page
            this.$router.go(-1);
          })
          .catch((error) => {
            this.googleLoading = false;
            this.googleError = error.message;
          });
      }
    },
    signIn() {
      this.loading = true;

      if (this.action === "Sign In") {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // Signed in
            this.loading = false;
            this.error = null;
          })
          .catch((error) => {
            this.loading = false;
            this.error = error.message;
          });
      } else {
        // Reauthenticate the user
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
            this.error = null;

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
