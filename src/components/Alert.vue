<template>
  <v-alert
    :type="type"
    v-model="showAlert"
    v-if="showAlert"
    close-text="Close Alert"
    :dismissible="dismissable"
    class="mb-0"
    :style="{ width: fullWidth ? '100%' : null }"
  >
    <div>{{ message }}</div>

    <v-btn outlined v-if="link" class="mt-2" :to="link.link">{{
      link.text
    }}</v-btn>

    <v-btn outlined v-if="action" class="mt-2" @click="action.callback">{{
      action.text
    }}</v-btn>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      showAlert: !!this.message, // Shows alert if initialised with a message
    };
  },

  props: {
    type: String,
    message: String,
    link: Object,
    action: Object,
    dismissable: Boolean,
    fullWidth: Boolean,
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
