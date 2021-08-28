<template>
  <v-dialog :value="dialog" persistent max-width="25rem">
    <v-sheet elevation="2" rounded>
      <v-toolbar
        dark
        color="primary"
        style="position: sticky; top: 0; z-index: 1"
      >
        <v-toolbar-title>Create Activity</v-toolbar-title>
      </v-toolbar>
      <v-form v-model="valid" @submit.prevent="submit" class="pa-4">
        <v-text-field
          v-model="activityName"
          :rules="[(v) => !!v || 'Activity name is required']"
          label="Activity name"
          required
        ></v-text-field>

        <div
          class="d-flex justify-space-between flex-wrap mt-4"
          style="gap: 0.5rem 1rem"
        >
          <v-btn plain @click="$emit('exitDialog')">Cancel</v-btn>

          <v-btn
            color="primary"
            type="submit"
            @click="submit"
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
</template>

<script>
import { mdiPlus } from "@mdi/js";

export default {
  data() {
    return {
      // Icons
      plusIcon: mdiPlus,

      // Form
      valid: false,
      loading: false,

      // Values
      activityName: "",
    };
  },

  props: {
    dialog: Boolean,
  },

  methods: {
    submit() {
      this.loading = true;

      this.$emit("exitDialog");
    },
  },
};
</script>
