<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h4">{{ action }}</h1>
      </v-col>
    </v-row>

    <v-row dense v-if="this.action === 'Reauthenticate'">
      <v-col cols="12">
        <p>To continue, we need you need to confirm your identity.</p>
      </v-col>
    </v-row>

    <v-row dense v-if="providers.includes('google.com')">
      <v-col cols="12">
        <v-btn
          block
          color="blue"
          class="white--text"
          :loading="googleLoading"
          :disabled="googleLoading"
          @click="signInWithGoogle"
          style="max-width: 100%"
        >
          <v-icon left dark>{{ googleIcon }}</v-icon>
          {{ action }} with Google
        </v-btn>

        <Alert type="error" :message="googleError" class="mt-5" />
      </v-col>
    </v-row>

    <v-row dense v-if="providers.length === 2">
      <v-col cols="12">
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
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-form
          v-model="valid"
          @submit.prevent="signIn"
          v-if="providers.includes('password')"
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
                autocomplete="current-password"
                label="Password"
                :prepend-icon="lockIcon"
                required
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? eyeIcon : eyeOffIcon"
                @click:append="showPassword = !showPassword"
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
                <v-icon left dark>{{ loginIcon }}</v-icon>
                {{ action }}
              </v-btn>

              <Alert type="error" :message="error" class="mt-5" />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <div
          class="d-flex justify-space-between flex-wrap"
          style="gap: 1rem"
          v-if="this.action === 'Sign In'"
        >
          <v-btn plain to="forgotpassword">Forgot password?</v-btn>

          <v-btn plain to="signup">Or sign up...</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import {
  mdiGoogle,
  mdiEmail,
  mdiLock,
  mdiEye,
  mdiEyeOff,
  mdiLogin,
} from "@mdi/js";
import firebase from "firebase/app";
import Alert from "../../components/app/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Change name of the page based on whether the URL is sign in or reauthenticate
      action: {
        GeneralReauthenticate: "Reauthenticate",
        GeneralSignIn: "Sign In",
      }[this.$route.name],

      // Icons
      googleIcon: mdiGoogle,
      googleLoading: false,
      emailIcon: mdiEmail,
      lockIcon: mdiLock,
      eyeIcon: mdiEye,
      eyeOffIcon: mdiEyeOff,
      loginIcon: mdiLogin,

      googleError: null,

      // Form control
      loading: false,
      valid: false,
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
      showPassword: false,
      error: null,
    };
  },
  computed: {
    providers() {
      if (this.action === "Reauthenticate") {
        return firebase
          .auth()
          .currentUser.providerData.map((provider) => provider.providerId);
      } else {
        return ["google.com", "password"];
      }
    },
  },
  methods: {
    signInWithGoogle() {
      this.googleLoading = true;
      this.googleError = null;

      if (this.action === "Sign In") {
        firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(() => {
            this.googleLoading = false;
          })
          .catch((error) => {
            this.googleLoading = false;
            this.googleError = error.message;
          });
      } else {
        // Reauthenticate the user
        firebase
          .auth()
          .currentUser.reauthenticateWithPopup(
            new firebase.auth.GoogleAuthProvider()
          )
          .then(() => {
            // Success
            this.googleLoading = false;

            // Redirect back to the account page
            this.$router.go(-1);
          })
          .catch((error) => {
            this.googleLoading = false;
            this.googleError = error.message;
          });
      }
    },
    signIn() {
      this.loading = true;
      this.error = null;

      if (this.action === "Sign In") {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // Signed in
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.error = error.message;
          });
      } else {
        // Reauthenticate the user
        this.error = null;

        var credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          this.password
        );

        firebase
          .auth()
          .currentUser.reauthenticateWithCredential(credential)
          .then(() => {
            // Success
            this.loading = false;

            // Redirect back to the account page
            this.$router.go(-1);
          })
          .catch((error) => {
            this.loading = false;
            this.error = error.message;
          });
      }
    },
  },
};
</script>
