<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h4">Sign Up</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-form
          v-model="valid"
          :disabled="loading"
          ref="form"
          @submit.prevent="signUp"
        >
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
                :disabled="!valid || loading"
                :loading="loading"
              >
                <v-icon left dark>{{ accountPlusIcon }}</v-icon>
                Sign up
              </v-btn>

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
<style scoped></style>
<script>
import { mdiEmail, mdiLock, mdiAccountPlus } from "@mdi/js";
import firebase from "firebase/app";
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

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
      this.error = null;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // Signed in
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
};
</script>
