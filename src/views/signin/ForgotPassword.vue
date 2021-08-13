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
        <h1>Forgot password?</h1>
        <v-form v-model="valid" :disabled="loading">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            autocomplete="username"
            type="email"
            label="Email"
            :prepend-icon="emailIcon"
            required
          ></v-text-field>
          <v-btn
            block
            color="primary"
            type="submit"
            class="mt-4"
            :disabled="!valid || loading"
            :loading="loading"
            @click="loading = true"
          >
            <v-icon left dark>{{ emailSendIcon }}</v-icon>
            Send reset email
          </v-btn>
          <v-btn plain to="signin" class="mt-4">Or sign in...</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </v-container>
</template>
<style scoped></style>
<script>
import { mdiEmail, mdiEmailSend } from "@mdi/js";

export default {
  data() {
    return {
      emailIcon: mdiEmail,
      emailSendIcon: mdiEmailSend,
      loading: false,
      valid: false,
      email: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
};
</script>
