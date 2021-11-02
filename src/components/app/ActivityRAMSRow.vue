<template>
  <tr class="pt-4 can-select">
    <td class="pa-1" style="width: 2.25rem">
      <div class="d-flex flex-column" style="gap: 0.25rem">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click="$emit('showDialog', riskId)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ pencilIcon }}</v-icon>
            </v-btn>
          </template>

          <span>Edit risk</span>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click="showRemove = !showRemove"
              :disabled="showRemove"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ deleteIcon }}</v-icon>
            </v-btn>
          </template>

          <span>Remove risk</span>
        </v-tooltip>
      </div>
    </td>

    <td colspan="3" class="pa-1" v-if="showRemove">
      <v-sheet color="error" dark elevation="2" rounded class="pa-4 my-1">
        <p style="font-size: 1rem; line-height: 1.15">
          Are you sure you want to remove this risk?
        </p>

        <div class="d-flex flex-wrap" style="gap: 0.5rem 1rem; width: 100%">
          <v-btn
            outlined
            @click="removeRisk"
            :loading="removeLoading"
            :disabled="removeLoading"
          >
            Delete
          </v-btn>

          <v-btn plain @click="showRemove = false">Cancel</v-btn>
        </div>
      </v-sheet>

      <Alert dismissable type="error" :message="removeError" class="mt-2" />
    </td>

    <td class="pa-1" v-if="!showRemove">
      <p class="mb-1"><strong>Category:</strong> {{ risk.category }}</p>

      <p class="mb-1"><strong>Hazard:</strong> {{ risk.hazard }}</p>

      <p class="mb-0"><strong>Risk:</strong> {{ risk.risk }}</p>
    </td>

    <td class="pa-1" v-if="!showRemove">
      <p class="mb-1" v-text="risk.controls"></p>

      <p class="mb-0">
        <strong>Responsibility:</strong> {{ risk.responsibility }}
      </p>
    </td>

    <td class="pa-1" v-if="!showRemove">
      <p class="mb-1">
        {{ risk.likelihood }}, with
        {{ risk.consequence.toLowerCase() }} consequences.
      </p>

      <p class="mb-0">
        This risk is
        <span class="green--text" v-if="risk.acceptable"> acceptable. </span>
        <span class="red--text" v-else>not acceptable.</span>
      </p>
    </td>
  </tr>
</template>

<style scoped>
td {
  vertical-align: top;
}
</style>

<script>
import { mdiDelete, mdiPencil } from "@mdi/js";
import Alert from "../Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      deleteIcon: mdiDelete,
      pencilIcon: mdiPencil,

      // Risk
      showRemove: false,
      removeLoading: false,
      removeError: null,
    };
  },

  props: {
    activityId: String,
    riskId: String,
    risk: Object,
  },

  methods: {
    removeRisk() {
      // Remove risk
      this.removeLoading = true;
      this.removeError = null;

      this.$functions
        .httpsCallable("activityRAMSDelete")({
          id: this.activityId,
          riskId: this.riskId,
        })
        .then(() => {
          // Success
          this.removeLoading = false;

          this.$emit("updateObject", "risks", { [this.riskId]: undefined }); // Remove risk
        })
        .catch((error) => {
          // Error
          this.loading = false;

          this.removeError =
            error.message === "internal"
              ? "An error occurred when connecting to the server."
              : error.message;
        });
    },
  },
};
</script>
