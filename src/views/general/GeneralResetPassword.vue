<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h4">Reset Password</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-form v-model="valid" ref="form" @submit.prevent="resetPassword">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                autocomplete="username"
                type="email"
                label="Email"
                :prepend-icon="emailIcon"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                autocomplete="new-password"
                type="password"
                label="Password"
                :prepend-icon="lockIcon"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                autocomplete="new-password"
                type="password"
                label="Confirm password"
                :prepend-icon="lockIcon"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                type="submit"
                :disabled="!valid || loading || done"
                :loading="loading"
              >
                <v-icon left dark>{{ lockResetIcon }}</v-icon>
                Reset password
              </v-btn>

              <Alert type="success" :message="success" class="mt-5" />

              <Alert type="error" :message="error" class="mt-5" />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiEmail, mdiLock, mdiLockReset } from "@mdi/js";
import firebase from "firebase/app";
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      lockResetIcon: mdiLockReset,
      loading: false,
      valid: false,
      error: null,
      success: null,
      done: false,

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

      oobCode: this.$route.params.oobCode,
    };
  },
  watch: {
    password() {
      // Manually revalidate confirm password field when password changes
      this.$refs.form.validate();
    },
  },
  mounted() {
    firebase
      .auth()
      .verifyPasswordResetCode(this.oobCode)
      .then((email) => {
        this.email = email;
      })
      .catch((error) => {
        this.error = error.message;
      });
  },
  methods: {
    resetPassword() {
      this.loading = true;
      this.error = null;
      this.success = null;

      firebase
        .auth()
        .confirmPasswordReset(this.oobCode, this.password)
        .then(() => {
          this.loading = false;
          this.done = true;
          this.success = "Password reset successfully.";
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
};
</script>
