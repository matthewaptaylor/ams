<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Reset Password</h1>
      </v-col>
    </v-row>

    <v-row>
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
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                autocomplete="new-password"
                label="Password"
                :prepend-icon="lockIcon"
                required
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? eyeIcon : eyeOffIcon"
                @click:append="showPassword = !showPassword"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                autocomplete="new-password"
                type="password"
                label="Confirm password"
                :prepend-icon="lockIcon"
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-2">
              <Alert type="success" :message="success" class="mb-2" />

              <Alert type="error" :message="error" class="mb-2" />

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
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiEmail, mdiLock, mdiEye, mdiEyeOff, mdiLockReset } from "@mdi/js";
import firebase from "firebase/app";
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      eyeIcon: mdiEye,
      eyeOffIcon: mdiEyeOff,
      lockResetIcon: mdiLockReset,

      // Form controls
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
      showPassword: false,
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

          this.password = "";
          this.confirmPassword = "";
          this.$refs.form.resetValidation();
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
};
</script>
