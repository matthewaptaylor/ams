<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col
        cols="12"
        class="d-flex justify-space-between align-center flex-wrap"
        style="column-gap: 1rem; row-gap: 0.5rem"
      >
        <h1 class="text-h4">RAMS</h1>

        <v-btn
          color="primary"
          @click="$emit('showDialog', 'create')"
          v-if="$vuetify.breakpoint.name !== 'xs'"
        >
          <v-icon left dark>{{ plusIcon }}</v-icon>
          Add risk
        </v-btn>

        <v-btn
          color="primary"
          fab
          fixed
          bottom
          right
          v-else
          @click="$emit('showDialog', 'create')"
        >
          <v-icon>{{ plusIcon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <Alert type="error" :message="error" class="mb-2" />

        <v-simple-table fixed-header style="overflow: auto">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="px-1" style="width: 2.25rem"></th>

                <th
                  class="px-1"
                  style="min-width: 12rem; width: calc(0.3 * (100% - 2.25rem))"
                >
                  Potential Incident
                </th>

                <th
                  class="px-1"
                  style="min-width: 16rem; width: calc(0.4 * (100% - 2.25rem))"
                >
                  Controls
                </th>

                <th
                  class="px-1"
                  style="min-width: 12rem; width: calc(0.3 * (100% - 2.25rem))"
                >
                  Risk Level
                </th>
              </tr>
            </thead>

            <tbody v-if="!loading">
              <ActivityRAMSRow
                :key="id"
                :activityId="$route.params.activityId"
                :riskId="id"
                :risk="risk"
                @showDialog="(id) => $emit('showDialog', id)"
                @updateObject="updateObject"
                v-for="(risk, id) in risks"
              />
            </tbody>

            <tbody v-if="loading">
              <tr v-for="i in 2" :key="i">
                <td class="px-1">
                  <v-skeleton-loader
                    type="text@3"
                    class="mt-2"
                  ></v-skeleton-loader>
                </td>

                <td class="px-1">
                  <v-skeleton-loader
                    type="text@2"
                    class="mt-2"
                  ></v-skeleton-loader>
                </td>

                <td class="px-1">
                  <v-skeleton-loader
                    type="text@3"
                    class="mt-2"
                  ></v-skeleton-loader>
                </td>

                <td></td>
              </tr>
            </tbody>

            <tbody v-if="!loading && !Object.keys(risks).length">
              <tr>
                <td colspan="3" class="text-center py-3">
                  <v-icon>{{ mapSearchIcon }}</v-icon>

                  <v-list-item-title class="text-wrap text--secondary">
                    We searched all over, but there's nothing here.
                  </v-list-item-title>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
th {
  white-space: nowrap;
}
td {
  vertical-align: top;
}
</style>

<script>
import {
  mdiPlus,
  mdiInformationOutline,
  mdiMapSearch,
  mdiDelete,
  mdiPencil,
} from "@mdi/js";

import Alert from "../../../components/Alert.vue";
import ActivityRAMSRow from "../../../components/app/ActivityRAMSRow.vue";

export default {
  components: { Alert, ActivityRAMSRow },

  data() {
    return {
      // Icons
      plusIcon: mdiPlus,
      informationOutlineIcon: mdiInformationOutline,
      mapSearchIcon: mdiMapSearch,
      deleteIcon: mdiDelete,
      pencilIcon: mdiPencil,

      loading: false,
      error: null,

      risks: {},
    };
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      // Display activities
      this.error = null;
      this.loading = true;

      this.$functions
        .httpsCallable("activityRAMSGet")({
          id: this.$route.params.activityId,
        })
        .then((data) => {
          // Success
          this.loading = false;

          this.risks = data.data;
        })
        .catch((error) => {
          // Error
          this.loading = false;

          this.error =
            error.message === "internal"
              ? "An error occurred when connecting to the server."
              : error.message;
        });
    },

    // RAMS has been updated
    updateObject(fieldName, v) {
      // Update new roles
      this[fieldName] = { ...this[fieldName], ...v };

      // Remove nullish values from object
      Object.keys(v).forEach((key) => {
        if (this[fieldName][key] == null) delete this[fieldName][key];
      });
    },
  },
};
</script>
