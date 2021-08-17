<template>
  <div>
    <h1 class="display-1">Forgot password?</h1>
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
  </div>
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
