<template>
  <v-container class="fill-height align-content-center justify-center">
    <div style="width: 100%; max-width: 25rem">
      <v-sheet elevation="2" rounded class="pa-4 mb-4">
        <img
          src="@/assets/images/sign-in-logo.svg"
          alt="Scouts Aotearoa logo"
          class="d-block mx-auto"
          style="max-height: 5rem"
        />
        <div class="text-center" style="font-size: 1.25rem">
          Activity Management System
        </div>
      </v-sheet>
      <v-sheet elevation="2" rounded class="pa-4">
        <h1>Sign up</h1>
        <v-form
          v-model="valid"
          :disabled="loading"
          ref="form"
          @submit.prevent="signUp"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            autocomplete="username"
            type="email"
            label="Email"
            :prepend-icon="emailIcon"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            autocomplete="new-password"
            type="password"
            label="Password"
            :prepend-icon="lockIcon"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            autocomplete="new-password"
            type="password"
            label="Confirm password"
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
            <v-icon left dark>{{ accountPlusIcon }}</v-icon>
            Sign up
          </v-btn>
          <v-btn plain to="signin" class="mt-4">Or sign in...</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </v-container>
</template>
<style scoped></style>
<script>
import { mdiEmail, mdiLock, mdiAccountPlus } from "@mdi/js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      accountPlusIcon: mdiAccountPlus,
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
      confirmPassword: "",
      confirmPasswordRules: [
        (v) => !!v || "Password confirmation is required",
        (v) => v === this.password || "Passwords do not match",
      ],
    };
  },
  watch: {
    password() {
      // Manually revalidate confirm password field when password changes
      this.$refs.form.validate();
    },
  },
  methods: {
    signUp() {
      this.loading = true;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
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
