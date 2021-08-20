<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h4">Verify Email</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <div
          class="d-flex flex-column align-center"
          style="gap: 1rem"
          v-if="!emailVerified"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>

          <p class="mb-0">Verifying your email address.</p>
        </div>

        <Alert type="success" :message="success" class="mt-5" />

        <Alert type="error" :message="error" class="mt-5" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Route parameters
      oobCode: this.$route.params.oobCode,

      emailVerified: false,
      success: null,
      error: null,
    };
  },

  mounted() {
    // Verify email address
    firebase
      .auth()
      .applyActionCode(this.oobCode)
      .then(() => {
        // Email address has been verified
        this.emailVerified = true;

        this.success = "Your email address has been verified.";
      })
      .catch((error) => {
        // Code is invalid or expired
        this.error = error.message;
      });
  },
};
</script>
