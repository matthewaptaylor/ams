<template>
  <div style="position: relative" class="autosave-text">
    <transition name="fade-transition">
      <v-skeleton-loader
        type="custom"
        height="48px"
        width="100%"
        v-if="loading"
      />

      <v-form @submit.prevent="save" v-else>
        <div class="d-flex" style="gap: 1rem">
          <v-switch
            v-model="currentValue"
            hide-details="auto"
            class="flex-grow-1 mt-0"
            :disabled="disabled"
          >
            <template v-slot:label>
              <span>
                {{ labelLeft }}
                <strong>
                  {{ currentValue ? labelTrue : labelFalse }}
                </strong>
                {{ labelRight }}
              </span>
            </template>
          </v-switch>

          <div
            v-if="showButton || showSuccess"
            class="mt-n1 mb-n2 ms-n2"
            style="padding-top: 2px"
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
        </div>

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
  background: rgba(189, 188, 188, 0.12);
}
</style>

<script>
import { mdiContentSave, mdiCheckCircle } from "@mdi/js";
import Alert from "../Alert.vue";

export default {
  components: { Alert },

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
    };
  },

  props: {
    labelLeft: String, // First part of the label
    labelTrue: String, // Middle of label when true
    labelFalse: String, // Middle of label when false
    labelRight: String, // Last part of the label
    value: Boolean, // The value saved on the server
    required: Boolean,
    error: Object, // An error to display to the user relating to the field
    loading: Boolean, // Whether to display a skeleton loader
    disabled: Boolean,
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
      // Hide any previous success indicator
      this.showSuccess = false;
      clearTimeout(this.successTimeout);

      this.showButton = val !== this.value; // Show save button if content has been changed
      this.save();
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
        // Fire save event if not already currently saving
        this.$emit("save", this.currentValue);
        this.currentlySaving = true;
      }
    },
  },
};
</script>
