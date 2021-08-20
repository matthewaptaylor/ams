<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h4">Forgot Password?</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-form v-model="valid" :disabled="loading" @submit.prevent="submit">
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

          <v-alert type="success" v-if="success" class="mt-5">
            Check your inbox for a confirmation email.
          </v-alert>

          <v-alert type="error" v-if="error" class="mt-5">{{ error }}</v-alert>

          <v-row dense>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                type="submit"
                :disabled="!valid || loading"
                :loading="loading"
              >
                <v-icon left dark>{{ emailSendIcon }}</v-icon>
                Send reset email
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-btn plain to="signin">Or sign in...</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiEmail, mdiEmailSend } from "@mdi/js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      emailIcon: mdiEmail,
      emailSendIcon: mdiEmailSend,
      loading: false,
      valid: false,
      error: null,
      success: false,
      email: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    submit() {
      this.loading = true;

      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          // Signed in
          this.loading = false;
          this.error = null;
          this.success = true;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
          this.success = false;
        });
    },
  },
};
</script>
