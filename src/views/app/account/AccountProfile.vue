<template>
  <v-sheet elevation="2" rounded class="flex-grow-1 pa-4">
    <h1 class="text-h4">Profile</h1>

    <v-container fluid class="px-0">
      <v-row dense>
        <v-col cols="12" sm="6" md="8" lg="6" dense>
          <AutosaveText
            label="Display name"
            type="text"
            :value="displayName"
            autocomplete="name"
            :rules="[(v) => !!v || 'Display name is required']"
            :required="true"
            :error="displayNameError"
            @save="saveDisplayName"
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" sm="6" md="8" lg="6">
          <v-text-field
            :value="email"
            label="Email"
            type="email"
            hint="You can change this in Login Methods"
            persistent-hint
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import firebase from "firebase/app";
import AutosaveText from "../../../components/app/AutosaveText.vue";

export default {
  components: { AutosaveText },
  data() {
    return {
      user: null,
      displayName: null,
      displayNameError: null,
      email: null,
    };
  },
  mounted() {
    this.user = firebase.auth().currentUser;
    this.displayName = this.user.displayName;
    this.email = this.user.email;
  },
  methods: {
    saveDisplayName(newDisplayName) {
      this.user
        .updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          this.displayName = newDisplayName;
          this.displayNameError = null;
        })
        .catch((error) => {
          this.displayNameError = error;
        });
    },
  },
};
</script>
