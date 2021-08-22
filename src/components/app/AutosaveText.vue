<template>
  <v-form @submit.prevent="save">
    <v-text-field
      :label="label"
      type="text"
      v-model="currentValue"
      :autocomplete="autocomplete"
      :rules="rules"
      :required="required"
      ref="input"
      hide-details="auto"
      @blur="save"
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
      type="error"
      :message="error && error.message ? error.message : null"
      :link="
        error && error.link ? { text: error.linkText, link: error.link } : null
      "
      class="mt-2"
    />
  </v-form>
</template>

<script>
import { mdiContentSave, mdiCheckCircle } from "@mdi/js";
import Alert from "./Alert.vue";

export default {
  components: { Alert },

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
    error: Object,
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
