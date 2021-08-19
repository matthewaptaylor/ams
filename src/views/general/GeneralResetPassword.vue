<template>
  <div>
    <h1 class="text-h4">Reset Password</h1>

    <v-form
      v-model="valid"
      :disabled="loading"
      ref="form"
      @submit.prevent="resetPassword"
    >
      <v-text-field
        v-model="email"
        autocomplete="username"
        type="email"
        label="Email"
        :prepend-icon="emailIcon"
        disabled
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

      <v-alert type="success" class="mt-4" v-if="success">
        Password reset successfully.
        <router-link to="/">Sign in.</router-link>.
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
        <v-icon left dark>{{ lockResetIcon }}</v-icon>
        Reset password
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mdiEmail, mdiLock, mdiLockReset } from "@mdi/js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      lockResetIcon: mdiLockReset,
      loading: false,
      valid: false,
      error: null,
      success: false,
      email: null,
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
      actionCode: new URL(window.location.href).searchParams.get("oobCode"),
    };
  },
  watch: {
    password() {
      // Manually revalidate confirm password field when password changes
      this.$refs.form.validate();
    },
  },
  mounted() {
    if (this.actionCode === null) {
      this.error =
        "You must have a valid code to reset your password. If you pasted a link to get here, please make sure you pasted the full link.";
    } else {
      firebase
        .auth()
        .verifyPasswordResetCode(this.actionCode)
        .then((email) => {
          this.email = email;
        })
        .catch((error) => {
          this.error = error.message;
          this.success = false;
        });
    }
  },
  methods: {
    resetPassword() {
      this.loading = true;
      firebase
        .auth()
        .confirmPasswordReset(this.actionCode, this.password)
        .then(() => {
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
