<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Delete Account</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="8" lg="6">
        <p class="mb-2">
          If you no longer use AMS, you may delete your account. If you are only
          deleting because you have gotten a new email address, please note that
          you can change your email address in Sign In Methods.
        </p>

        <v-btn color="error" @click="$emit('showDialog')">
          <v-icon left dark>{{ deleteIcon }}</v-icon>
          Delete account
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiDelete } from "@mdi/js";

export default {
  data() {
    return {
      // Icons
      deleteIcon: mdiDelete,
    };
  },
};
</script>
