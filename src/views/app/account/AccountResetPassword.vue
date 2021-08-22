<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Reset Password</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="8" lg="6">
        <v-form v-model="valid" ref="form" @submit.prevent="resetPassword">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                :value="$currentUser.email"
                label="Email"
                type="email"
                autocomplete="username"
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

              <Alert
                type="error"
                :message="error"
                :link="errorLink"
                class="m2-2"
              />

              <v-btn
                color="primary"
                type="submit"
                :disabled="!valid || loading"
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
import Alert from "../../../components/app/Alert.vue";

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

      // Form status
      loading: false,
      valid: false,
      success: null,
      error: null,
      errorLink: null,

      // Form values
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
    };
  },

  mounted() {
    this.email = this.$currentUser.email;
  },

  methods: {
    resetPassword() {
      this.loading = true;
      this.success = null;
      this.error = null;
      this.errorLink = null;

      this.$currentUser
        .updatePassword(this.password)
        .then(() => {
          // Update successful
          this.loading = false;

          // Reset password fields
          this.password = "";
          this.confirmPassword = "";
          this.$refs.form.resetValidation();

          this.success = "Password updated successfully.";
        })
        .catch((error) => {
          // An error ocurred
          this.loading = false;

          if (error.code === "auth/requires-recent-login") {
            // User needs to reauthenticate

            this.error =
              "We need to confirm your identity before you do this. Please reauthenticate and try again.";
            this.errorLink = {
              text: "Reauthenticate",
              link: { name: "GeneralReauthenticate" },
            };
          } else {
            // Show error message as normal
            this.error = error.message;
          }
        });
    },
  },
};
</script>
