<template>
  <v-form @submit.prevent="save">
    <v-text-field
      :label="label"
      type="text"
      v-model="currentValue"
      :autocomplete="autocomplete"
      :rules="rules"
      :required="required"
      :prepend-icon="icon"
      ref="input"
      hide-details="auto"
      @blur="save"
      :readonly="type === 'date' || type === 'time'"
      :class="{ 'v-input--pointer': type === 'date' || type === 'time' }"
      @click="showPickerDialog = type === 'date' || type === 'time'"
    >
      <template v-slot:append-outer>
        <div v-if="showButton || showSuccess" class="mt-n1 mb-n2 ms-n2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn
                  icon
                  @click.stop="save"
                  :loading="currentlySaving"
                  v-if="showButton || showSuccess"
                >
                  <v-icon :color="showButton ? 'error' : 'success'">
                    {{ showButton ? contentSaveIcon : checkCircleIcon }}
                  </v-icon>
                </v-btn>
              </div>
            </template>

            <span v-if="showButton">
              {{ currentlySaving ? "Saving" : "Save" }}
            </span>

            <span v-if="showSuccess">Saved</span>
          </v-tooltip>
        </div>
      </template>
    </v-text-field>

    <Alert
      dismissable
      type="error"
      :message="error && error.message ? error.message : null"
      :link="
        error && error.link ? { text: error.linkText, link: error.link } : null
      "
      class="mt-2"
    />

    <PickerDialog
      v-if="type === 'date' || type === 'time'"
      :show="showPickerDialog"
      :value="currentValue"
      :type="type"
      @close="
        () => {
          showPickerDialog = false;
          $refs.input.blur();
        }
      "
      @save="
        (value) => {
          currentValue = value;
          showPickerDialog = false;
          $refs.input.blur();
          save();
        }
      "
    />
  </v-form>
</template>

<style>
.v-input--pointer input {
  cursor: pointer;
}
</style>

<script>
import { mdiContentSave, mdiCheckCircle } from "@mdi/js";
import Alert from "../Alert.vue";
import PickerDialog from "./PickerDialog.vue";

export default {
  components: { Alert, PickerDialog },

  data() {
    return {
      // Icons
      contentSaveIcon: mdiContentSave,
      checkCircleIcon: mdiCheckCircle,

      // Track the current inputted value
      currentValue: this.value,

      // Status button
      showButton: false,
      currentlySaving: false,
      showSuccess: false,

      // Hide success icon after certain time
      successTimeout: null,

      // Dialogs
      showPickerDialog: false,
    };
  },

  props: {
    label: String, // Label to show to the user
    type: String, // input type, e.g. "text"
    value: String, // The value saved on the server
    autocomplete: String, // The field's autocomplete attribute
    rules: Array, // Input validation rules
    required: Boolean,
    icon: String, // An icon to prepend to the input
    error: Object, // An error to display to the user relating to the field
  },

  watch: {
    value(val, oldVal) {
      // Reset once a new value is given
      this.currentValue = val;
      this.showButton = false;
      this.currentlySaving = false;

      if (oldVal !== null && val === this.currentValue) {
        // New value is what we set it to be
        this.showSuccess = true;
        this.successTimeout = setTimeout(() => {
          this.showSuccess = false;
        }, 5000);
      }
    },

    currentValue(val) {
      this.showButton = val !== this.value; // Show save button if content has been changed

      // Hide any previous success indicator
      this.showSuccess = false;
      clearTimeout(this.successTimeout);
    },

    error() {
      // Error occurred while saving
      this.currentlySaving = false;
    },
  },

  methods: {
    save() {
      // Emits an event to the parent component that the current value should be saved
      if (this.value !== this.currentValue && !this.currentlySaving) {
        if (this.$refs.input.valid) {
          // Fire save event if not already currently saving
          this.$emit("save", this.currentValue);
          this.currentlySaving = true;
        }
      }
    },
  },
};
</script>
