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
        <v-radio-group
          v-model="currentValue"
          hide-details="auto"
          class="flex-grow-1 mt-0"
        >
          <template v-slot:label>
            <div class="d-flex" style="gap: 1rem">
              <span style="line-height: 2rem">{{ label }}</span>

              <div v-if="showButton || showSuccess">
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
          </template>

          <div class="d-flex flex-column" style="gap: 0.75rem">
            <div v-for="(categoryOptions, name) in categories" :key="name">
              <p class="text--secondary mb-2">{{ name }}</p>

              <div class="d-flex flex-wrap" style="column-gap: 1rem">
                <v-radio
                  v-for="category in categoryOptions"
                  :key="category"
                  :value="category"
                  :label="category"
                  style="width: 7rem"
                  class="mb-1"
                />
              </div>
            </div>
          </div>
        </v-radio-group>

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
    label: String,
    categories: Object,
    value: String, // The value saved on the server
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
