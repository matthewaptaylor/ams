<template>
  <v-container class="fill-height align-content-center justify-center">
    <div style="width: 100%; max-width: 25rem">
      <v-sheet elevation="2" rounded class="pa-4 mb-4">
        <img
          src="@/assets/images/purple-on-transparent-logo.svg"
          alt="Scouts Aotearoa logo"
          class="d-block mx-auto"
          style="max-height: 5rem"
        />
        <div class="text-center" style="font-size: 1.25rem">
          Activity Management System
        </div>
      </v-sheet>
      <v-sheet elevation="2" rounded class="pa-4">
        <h1>Sign in</h1>
        <v-form v-model="valid" :disabled="loading" @submit.prevent="signIn">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            autocomplete="username"
            type="email"
            label="E-mail"
            :prepend-icon="emailIcon"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            autocomplete="current-password"
            type="password"
            label="Password"
            :prepend-icon="lockIcon"
            required
          ></v-text-field>
          <v-alert type="error" class="mt-4" v-if="error">{{ error }}</v-alert>
          <v-btn
            block
            color="primary"
            type="submit"
            class="mt-4"
            :disabled="!valid || loading"
            :loading="loading"
          >
            <v-icon left dark>{{ loginIcon }}</v-icon>
            Sign in
          </v-btn>
          <div
            class="d-flex justify-space-between flex-wrap mt-4"
            style="gap: 1rem"
          >
            <v-btn plain to="forgotpassword">Forgot password?</v-btn>
            <v-btn plain to="signup">Or sign up...</v-btn>
          </div>
        </v-form>
      </v-sheet>
    </div>
  </v-container>
</template>
<style scoped></style>
<script>
import { mdiEmail } from "@mdi/js";
import { mdiLock } from "@mdi/js";
import { mdiLogin } from "@mdi/js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      loginIcon: mdiLogin,
      loading: false,
      valid: false,
      error: null,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
    };
  },
  methods: {
    signIn() {
      this.loading = true;

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
    },
  },
};
</script>
