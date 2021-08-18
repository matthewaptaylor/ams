<template>
  <div>
    <h1 class="display-1">Forgot Password?</h1>

    <v-form v-model="valid" :disabled="loading" @submit.prevent="submit">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        autocomplete="username"
        type="email"
        label="Email"
        :prepend-icon="emailIcon"
        required
      ></v-text-field>

      <v-alert type="success" class="mt-4" v-if="success">
        Check your inbox for a confirmation email.
      </v-alert>

      <v-alert type="error" class="mt-4" v-if="error">{{ error }}</v-alert>

      <v-btn
        block
        color="primary"
        type="submit"
        class="mt-4"
        :disabled="!valid || loading"
        :loading="loading"
      >
        <v-icon left dark>{{ emailSendIcon }}</v-icon>
        Send reset email
      </v-btn>

      <v-btn plain to="signin" class="mt-4">Or sign in...</v-btn>
    </v-form>
  </div>
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
