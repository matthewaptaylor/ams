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
          @click="$emit('showDialog')"
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
          @click="$emit('showDialog')"
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
                <th>Potential Incident</th>

                <th>Controls</th>

                <th>Risk Level</th>
              </tr>
            </thead>

            <tbody class="can-select">
              <template v-if="loading">
                <tr v-for="i in 2" :key="i">
                  <td>
                    <v-skeleton-loader
                      type="text@3"
                      class="mt-2"
                    ></v-skeleton-loader>
                  </td>

                  <td>
                    <v-skeleton-loader
                      type="text@2"
                      class="mt-2"
                    ></v-skeleton-loader>
                  </td>

                  <td>
                    <v-skeleton-loader
                      type="text@3"
                      class="mt-2"
                    ></v-skeleton-loader>
                  </td>
                </tr>
              </template>

              <tr v-for="(risk, id) in risks" :key="id" class="pt-4" v-else>
                <td>
                  <p class="mb-1">
                    <strong>Category:</strong> {{ risk.category }}
                  </p>

                  <p class="mb-1"><strong>Hazard:</strong> {{ risk.hazard }}</p>

                  <p class="mb-0"><strong>Risk:</strong> {{ risk.risk }}</p>
                </td>

                <td>
                  <p class="mb-1">
                    <strong>Controls:</strong> {{ risk.controls }}
                  </p>

                  <p class="mb-0">
                    <strong>Responsibility:</strong> {{ risk.responsibility }}
                  </p>
                </td>

                <td>
                  <p class="mb-1">
                    <strong>Likelihood:</strong> {{ risk.likelihood }}
                  </p>

                  <p class="mb-1">
                    <strong>Consequence:</strong> {{ risk.consequence }}
                  </p>

                  <p class="mb-0">
                    <strong>Risk level:</strong> {{ risk.level }}
                  </p>

                  <p class="mb-0">
                    This risk is
                    <strong>
                      {{
                        risk.acceptable ? "acceptable" : "not acceptable"
                      }} </strong
                    >.
                  </p>
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
  padding: 0.25rem 1rem !important;
}
</style>

<script>
import Alert from "../../../components/Alert.vue";
import { mdiPlus, mdiInformationOutline } from "@mdi/js";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      plusIcon: mdiPlus,
      informationOutlineIcon: mdiInformationOutline,

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

    // Person has been updated
    updateObject(fieldName, v) {
      console.log(fieldName, v);
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
