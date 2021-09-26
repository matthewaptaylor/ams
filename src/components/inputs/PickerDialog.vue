<template>
  <v-dialog v-model="show" width="290px">
    <v-date-picker v-model="newValue" scrollable v-if="type === 'date'">
      <div
        class="d-flex justify-space-between flex-wrap"
        style="gap: 0.5rem 1rem; width: 100%"
      >
        <v-btn plain @click="close">Cancel</v-btn>

        <v-btn color="primary" @click="save"> OK </v-btn>
      </div>
    </v-date-picker>

    <v-time-picker
      format="24hr"
      v-model="newValue"
      full-width
      v-if="type === 'time'"
    >
      <div
        class="d-flex justify-space-between flex-wrap"
        style="gap: 0.5rem 1rem; width: 100%"
      >
        <v-btn plain @click="close">Cancel</v-btn>

        <v-btn color="primary" @click="save"> OK </v-btn>
      </div>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      newValue: this.value,
    };
  },

  props: {
    value: String, // The current value
    show: Boolean, // Whether to show the modal
    type: String, // Either "date" or "time"
  },

  watch: {
    show(val) {
      // Update URL if picker opened or closed
      if (val) {
        window.location.hash = "picker";
      } else if (window.location.hash) {
        this.$router.go(-1); // Remove hash
      }
    },

    $route() {
      if (!window.location.hash) {
        // Hide picker if user navigated back
        this.close();
      }
    },
  },

  methods: {
    close() {
      // Emit event to parent asking to close the dialog
      this.$emit("close");
    },

    save() {
      // Return the selected date to the parent
      this.$emit("save", this.newValue);
    },
  },
};
</script>
