<template>
  <v-container class="fill-height align-content-center justify-center">
    <div style="width: 100%; max-width: 25rem">
      <v-sheet elevation="2" rounded class="pa-2 mb-4">
        <img
          src="@/assets/images/sign-in-logo.svg"
          alt="Scouts Aotearoa logo"
          class="d-block mx-auto pa-2"
          style="height: 4rem; max-width: 100%"
        />
        <div class="pa-2 text-center" style="font-size: 1.25rem">
          Activity Management System
        </div>
      </v-sheet>
      <v-sheet elevation="2" rounded class="pa-4">
        <h1 class="display-1">Sign in</h1>
        <v-btn block color="blue" dark class="mt-4" @click="signInWithGoogle">
          <v-icon left dark>{{ googleIcon }}</v-icon>
          Sign in with Google
        </v-btn>
        <v-alert type="error" class="mt-4" v-if="googleError">{{
          googleError
        }}</v-alert>
        <div
          style="
            position: relative;
            margin-top: 1rem;
            height: 1rem;
            text-align: center;
            font-weight: 500;
          "
        >
          <v-divider
            style="
              position: absolute;
              margin: calc(0.5rem - 1px) 0 0.5rem;
              width: 100%;
            "
          />
          <div
            style="
              position: absolute;
              width: 100%;
              line-height: 1rem;
              text-align: center;
            "
          >
            <span
              style="
                display: inline-block;
                padding: 0 0.5rem;
                background-color: #ffffff;
              "
            >
              OR
            </span>
          </div>
        </div>
        <v-form v-model="valid" :disabled="loading" @submit.prevent="signIn">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            autocomplete="username"
            type="email"
            label="Email"
            :prepend-icon="emailIcon"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            autocomplete="current-password"
            type="password"
            label="Password"
            :prepend-icon="lockIcon"
            required
          ></v-text-field>
          <v-alert type="error" class="mt-4" v-if="error">{{ error }}</v-alert>
          <v-btn
            block
            color="primary"
            type="submit"
            class="mt-4"
            :disabled="!valid || loading"
            :loading="loading"
          >
            <v-icon left dark>{{ loginIcon }}</v-icon>
            Sign in
          </v-btn>
          <div
            class="d-flex justify-space-between flex-wrap mt-4"
            style="gap: 1rem"
          >
            <v-btn plain to="forgotpassword">Forgot password?</v-btn>
            <v-btn plain to="signup">Or sign up...</v-btn>
          </div>
        </v-form>
      </v-sheet>
    </div>
  </v-container>
</template>
<style scoped></style>
<script>
import { mdiGoogle, mdiEmail, mdiLock, mdiLogin } from "@mdi/js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      googleIcon: mdiGoogle,
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      loginIcon: mdiLogin,
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
      googleError: null,
    };
  },
  methods: {
    signInWithGoogle() {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .catch((error) => {
          this.googleError = error.message;
        });
    },
    signIn() {
      this.loading = true;

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // Signed in
          this.loading = false;
          this.error = null;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
};
</script>
