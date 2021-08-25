<template>
  <v-dialog v-model="show" persistent width="290px">
    <v-date-picker v-model="newValue" scrollable v-if="type === 'date'">
      <v-spacer></v-spacer>

      <v-btn text color="primary" @click="close"> Cancel </v-btn>

      <v-btn text color="primary" @click="save"> OK </v-btn>
    </v-date-picker>

    <v-time-picker
      format="24hr"
      v-model="startTime"
      full-width
      v-if="type === 'time'"
    >
      <v-spacer></v-spacer>

      <v-btn text color="primary" @click="close"> Cancel </v-btn>

      <v-btn text color="primary" @click="save"> OK </v-btn>
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

  methods: {
    close() {
      // EMit event to parent asking to close the dialog
      this.$emit("close");
    },

    save() {
      // Return the selected date to the parent
      this.$emit("save", this.newValue);
    },
  },
};
</script>
