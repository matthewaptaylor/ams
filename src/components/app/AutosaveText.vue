<template>
  <div>
    <v-text-field
      :label="label"
      type="text"
      v-model="currentValue"
      :autocomplete="autocomplete"
      :rules="rules"
      :required="required"
      @blur="save"
      ref="input"
    >
      <template v-slot:append-outer>
        <div v-if="showButton || showSuccess">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn
                  icon
                  @click.stop="save"
                  :loading="currentlySaving"
                  v-if="showButton"
                >
                  <v-icon color="error">
                    {{ contentSaveIcon }}
                  </v-icon>
                </v-btn>

                <v-icon
                  x-large
                  color="success"
                  v-on="on"
                  v-if="showSuccess"
                  class="pa-2"
                >
                  {{ checkCircleIcon }}
                </v-icon>
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

    <v-alert type="error" class="mt-2" v-if="error">{{ error }}</v-alert>
  </div>
</template>

<script>
import { mdiContentSave, mdiCheckCircle } from "@mdi/js";

export default {
  data() {
    return {
      contentSaveIcon: mdiContentSave,
      checkCircleIcon: mdiCheckCircle,
      currentValue: this.value,
      showButton: false,
      currentlySaving: false,
      showSuccess: false,
      successTimeout: null,
    };
  },
  props: {
    label: String,
    type: String,
    value: String,
    autocomplete: String,
    rules: Array,
    required: Boolean,
    error: String,
  },
  watch: {
    value(val, oldVal) {
      // Reset once a new value is given
      this.currentValue = val;
      this.showButton = false;
      this.currentlySaving = false;

      if (oldVal !== null) {
        this.showSuccess = true;
        this.successTimeout = setTimeout(() => {
          this.showSuccess = false;
        }, 5000);
      }
    },
    currentValue(val) {
      this.showButton = val !== this.value; // Show save button if content has been changed
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
