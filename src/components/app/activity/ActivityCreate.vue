<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="25rem" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-icon left dark>{{ plusIcon }}</v-icon>
          Create activity
        </v-btn>
      </template>

      <v-sheet elevation="2" rounded>
        <v-toolbar
          dark
          color="primary"
          style="position: sticky; top: 0; z-index: 1"
        >
          <v-toolbar-title>Create activity</v-toolbar-title>
        </v-toolbar>

        <v-form v-model="valid" @submit.prevent="createActivity" class="pa-4">
          <v-text-field
            v-model="activityName"
            :rules="activityNameRules"
            label="Activity name"
            required
          ></v-text-field>

          <div class="d-flex justify-space-between flex-wrap mt-4">
            <v-btn plain @click="dialog = false"> Cancel </v-btn>
            <v-btn
              color="primary"
              type="submit"
              :disabled="!valid || loading"
              :loading="loading"
            >
              <v-icon left dark>{{ plusIcon }}</v-icon>
              Create activity
            </v-btn>
          </div>
        </v-form>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
import { mdiPlus } from "@mdi/js";

export default {
  data() {
    return {
      plusIcon: mdiPlus,
      dialog: false,
      valid: false,
      loading: false,
      activityName: "",
      activityNameRules: [(v) => !!v || "Activity name is required"],
    };
  },
  methods: {
    createActivity() {
      this.loading = true;
    },
  },
};
</script>
