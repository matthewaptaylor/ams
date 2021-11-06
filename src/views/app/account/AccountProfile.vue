<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Profile</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="6">
        <v-row dense>
          <v-col cols="12">
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

          <v-col cols="12">
            <v-text-field
              :value="$currentUser.email"
              label="Email"
              type="email"
              hint="You can change this in Login Methods"
              persistent-hint
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AutosaveText from "../../../components/inputs/AutosaveText.vue";

export default {
  components: { AutosaveText },
  data() {
    return {
      displayName: null,
      displayNameError: null,
    };
  },
  mounted() {
    this.displayName = this.$currentUser.displayName;
  },
  methods: {
    saveDisplayName(newDisplayName) {
      this.$currentUser
        .updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          this.displayName = newDisplayName;
          this.displayNameError = null;

          this.$updateUser(); // Update the global user object to match
        })
        .catch((error) => {
          this.displayNameError = error;
        });
    },
  },
};
</script>
