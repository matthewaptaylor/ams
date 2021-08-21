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

              <Alert type="success" :message="success" class="mt-5" />

              <Alert type="error" :message="error" class="mt-5" />
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
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      emailIcon: mdiEmail,
      emailSendIcon: mdiEmailSend,
      loading: false,
      valid: false,
      error: null,
      success: null,
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
      this.error = null;
      this.success = null;

      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          // Signed in
          this.loading = false;
          this.success = "Check your inbox for a confirmation email.";
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
};
</script>
