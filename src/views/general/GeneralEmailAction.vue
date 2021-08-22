<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4" v-if="signInMode !== true">Email Action</h1>
        <h1 class="text-h4" v-if="signInMode === true">Sign In With Link</h1>
      </v-col>
    </v-row>

    <v-row v-if="signInMode === true">
      <v-col cols="12">
        <v-form v-model="valid" @submit.prevent="signIn">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                autocomplete="username"
                type="email"
                label="Confirm email"
                :prepend-icon="emailIcon"
                required
                hide-details="auto"
              ></v-text-field>
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
                Sign in
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row v-if="signInMode === false">
      <v-col cols="12">
        <p>
          There was an error with the link you followed to get here. Please make
          sure you copied the whole link.
          <router-link to="/">Go home</router-link>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiEmail, mdiLogin } from "@mdi/js";
import firebase from "firebase/app";
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      emailIcon: mdiEmail,
      loginIcon: mdiLogin,

      // Email link sign in
      signInMode: null,
      email: null,

      // Form control
      loading: false,
      valid: false,
      error: null,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  mounted() {
    // Confirm the link is a sign-in with email link

    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      this.signInMode = true;

      this.email = window.localStorage.getItem("emailForSignIn"); // Get stored email if the link was sent on the same device
    } else {
      // Not a sign in with email link
      this.signInMode = false;
    }
  },

  methods: {
    signIn() {
      // Sign the user in
      this.loading = true;
      this.error = null;

      firebase
        .auth()
        .signInWithEmailLink(this.email, window.location.href)
        .then(() => {
          // Success
          this.loading = false;

          window.localStorage.removeItem("emailForSignIn"); // Clear email from storage.
        })
        .catch((error) => {
          // Error occurred
          this.loading = false;

          this.error = error.message;
        });
    },
  },
};
</script>
