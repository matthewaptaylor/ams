<template>
  <v-alert
    type="error"
    v-model="showAlert"
    v-if="showAlert"
    close-text="Close Alert"
    dismissible
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      showAlert: null,
    };
  },

  props: {
    message: String,
  },

  watch: {
    message(val) {
      if (val) {
        // Error has been set
        this.showAlert = true;
      } else {
        // No longer an error
        this.showAlert = false;
      }
    },
  },
};
</script>
