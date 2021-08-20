<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h4">Recover Email</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <p>
          Hi{{ restoredEmail ? ", " + restoredEmail : "" }}. You can restore
          your email address using the button below.
        </p>

        <Alert type="error" :message="codeError" class="mt-5" />
      </v-col>
    </v-row>

    <v-row dense v-if="!invalidCode">
      <v-col cols="12">
        <v-btn
          block
          color="primary"
          :disabled="restoreLoading || emailRestored"
          :loading="restoreLoading"
          @click="restoreEmail"
        >
          <v-icon left dark>{{ restoreIcon }}</v-icon>
          Restore email
        </v-btn>

        <Alert type="success" :message="restoreSuccess" class="mt-5" />

        <Alert type="error" :message="restoreError" class="mt-5" />
      </v-col>
    </v-row>

    <v-row dense v-if="showResetPasswordButton">
      <v-col cols="12">
        <p>
          If you think somebody may have your password, you can send yourself a
          password reset email using the button below.
        </p>

        <v-btn
          block
          color="primary"
          :disabled="resetPasswordLoading"
          :loading="resetPasswordLoading"
          @click="resetPassword"
        >
          <v-icon left dark>{{ emailSendIcon }}</v-icon>
          Send reset email
        </v-btn>

        <Alert type="success" :message="resetPasswordSuccess" class="mt-5" />

        <Alert type="error" :message="resetPasswordError" class="mt-5" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiRestore, mdiEmailSend } from "@mdi/js";
import firebase from "firebase/app";
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      restoreIcon: mdiRestore,
      emailSendIcon: mdiEmailSend,

      // Route parameters
      oobCode: this.$route.params.oobCode,
      codeError: null,
      invalidCode: false,

      restoredEmail: null,
      restoreLoading: false,
      restoreError: null,
      restoreSuccess: null,
      emailRestored: false,

      showResetPasswordButton: false,
      resetPasswordLoading: false,
      resetPasswordError: null,
      resetPasswordSuccess: null,
    };
  },

  mounted() {
    // Confirm the action code is valid.
    firebase
      .auth()
      .checkActionCode(this.oobCode)
      .then((info) => {
        // Get the restored email address.
        this.restoredEmail = info["data"]["email"];
      })
      .catch((error) => {
        // Error
        this.codeError = error.message;
        this.invalidCode = true; // Stop user from hitting restore email button
      });
  },

  methods: {
    restoreEmail() {
      // Revert to the old email
      this.restoreLoading = true;
      this.restoreError = null;

      firebase
        .auth()
        .applyActionCode(this.oobCode)
        .then(() => {
          // Account email reverted to restoredEmail
          this.restoreLoading = false;
          this.restoreSuccess = "Your email has been successfully restored.";
          this.emailRestored = true;

          this.showResetPasswordButton = true; // Show option to reset password
        })
        .catch((error) => {
          // Invalid code
          this.restoreLoading = false;
          this.restoreError = error.message;
        });
    },

    resetPassword() {
      // Send password reset email
      this.resetPasswordLoading = true;
      this.resetPasswordError = false;

      firebase
        .auth()
        .sendPasswordResetEmail(this.restoredEmail)
        .then(() => {
          // Password reset confirmation sent. Ask user to check their email.
          this.resetPasswordLoading = false;
          this.resetPasswordSuccess =
            "Check your inbox for a confirmation email.";
        })
        .catch((error) => {
          // Error encountered while sending password reset code.
          this.resetPasswordLoading = false;
          this.resetPasswordError = error.message;
        });
    },
  },
};
</script>
