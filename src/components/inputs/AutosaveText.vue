<template>
  <div style="position: relative" class="autosave-text">
    <transition name="fade-transition">
      <v-skeleton-loader
        type="custom"
        height="48px"
        width="100%"
        v-if="loading"
      />

      <v-form @submit.prevent="save" v-model="valid" v-else>
        <component
          :is="
            type == 'combobox'
              ? vCombobox
              : type == 'textarea'
              ? vTextarea
              : type == 'autocomplete'
              ? VAutocomplete
              : vTextField
          "
          :label="label"
          :type="type == 'number' ? 'number' : 'text'"
          :items="comboboxItems"
          :min="type == 'number' ? '1' : null"
          :step="type == 'number' ? '1' : null"
          :onkeypress="
            type == 'number'
              ? 'return event.charCode >= 48 && event.charCode <= 57'
              : null
          "
          v-model="currentValue"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :rows="type == 'textarea' ? 3 : null"
          :rules="rules"
          :required="required"
          :prepend-icon="icon"
          ref="input"
          hide-details="auto"
          @blur="save"
          :readonly="type === 'date' || type === 'time'"
          :class="{ 'v-input--pointer': type === 'date' || type === 'time' }"
          @click="showPickerDialog = type === 'date' || type === 'time'"
          v-on:keyup.space="
            showPickerDialog = type === 'date' || type === 'time'
          "
          :multiple="chips"
          :chips="chips"
          style="width: 100%"
        >
          <template v-slot:append-outer>
            <div
              v-if="(showButton || showSuccess) && valid"
              class="mt-n1 mb-n2 ms-n2"
            >
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
        </component>

        <Alert
          dismissable
          type="error"
          :message="error && error.message ? error.message : null"
          :link="
            error && error.link
              ? { text: error.linkText, link: error.link }
              : null
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
    </transition>
  </div>
</template>

<style>
.autosave-text .fade-transition-leave-active {
  position: absolute !important;
}
.v-skeleton-loader__custom {
  height: 100%;
  background: rgba(0, 0, 0, 0.12);
}
</style>

<script>
import { mdiContentSave, mdiCheckCircle } from "@mdi/js";
import Alert from "../Alert.vue";
import PickerDialog from "./PickerDialog.vue";
import { VTextField, VCombobox, VAutocomplete, VTextarea } from "vuetify/lib";

export default {
  components: { Alert, PickerDialog, VTextField },

  data() {
    return {
      // Icons
      contentSaveIcon: mdiContentSave,
      checkCircleIcon: mdiCheckCircle,

      // Components
      vTextField: VTextField,
      vCombobox: VCombobox,
      VAutocomplete: VAutocomplete,
      vTextarea: VTextarea,

      valid: null,

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
    value: [String, Array], // The value saved on the server
    comboboxItems: Array, // Autocomplete items
    autocomplete: String, // The field's autocomplete attribute
    rules: Array, // Input validation rules
    required: Boolean,
    icon: String, // An icon to prepend to the input
    error: Object, // An error to display to the user relating to the field
    loading: Boolean, // Whether to display a skeleton loader
    disabled: Boolean, // Whether to display a skeleton loader
    chips: Boolean,
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
          this.$emit(
            "save",
            this.type == "number"
              ? parseInt(this.currentValue)
              : this.currentValue
          );
          this.currentlySaving = true;
        }
      }
    },
  },
};
</script>
