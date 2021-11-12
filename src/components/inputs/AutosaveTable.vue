<template>
  <v-simple-table fixed-header style="overflow: auto">
    <thead>
      <tr>
        <th class="px-1" style="min-width: 44px"></th>

        <th
          v-for="(data, name) in columns"
          :key="name"
          class="text-left"
          :style="{ 'min-width': data.minWidth }"
        >
          {{ name }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr class="hideHover">
        <td :colspan="columnNum + 1" class="pa-1" v-if="!loading">
          <div class="d-flex align-center" style="gap: 0.5rem" v-if="!error">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <v-btn icon @click.stop="save" :loading="saveLoading">
                    <v-icon :color="allSaved ? 'success' : 'error'">
                      {{ allSaved ? checkCircleIcon : contentSaveIcon }}
                    </v-icon>
                  </v-btn>
                </div>
              </template>

              <span v-if="saveLoading">Saving</span>

              <span v-else>
                {{ allSaved ? "Saved" : "Save" }}
              </span>
            </v-tooltip>

            <p v-if="allSaved" class="mb-0">Up to date</p>

            <p v-else class="mb-0">
              Last saved {{ timeSinceSaved }} second{{
                timeSinceSaved === 1 ? null : "s"
              }}
              ago
            </p>
          </div>

          <Alert
            type="error"
            :message="error"
            :action="{ text: 'Retry', callback: load }"
            class="mt-1"
          />

          <Alert type="error" :message="saveError" class="mt-1" />
        </td>
      </tr>
    </tbody>

    <tbody v-if="loading">
      <tr class="hideHover" v-for="i in 2" :key="i">
        <td></td>

        <td class="px-1" v-for="i in columnNum" :key="i">
          <v-skeleton-loader type="custom" height="38px" width="100%" />
        </td>
      </tr>
    </tbody>

    <tbody>
      <AutosaveTableRow
        :columns="columns"
        :row="rows[index]"
        @update="(v) => update(index, v)"
        @remove="() => remove(index)"
        v-for="index in Object.keys(rows).sort()"
        :key="index"
      />
    </tbody>
  </v-simple-table>
</template>

<style scoped>
th {
  white-space: nowrap;
}
.hideHover:hover {
  background: none !important;
}
</style>

<script>
import { mdiContentSave, mdiCheckCircle } from "@mdi/js";
import Alert from "../Alert.vue";
import AutosaveTableRow from "./AutosaveTableRow.vue";

export default {
  components: {
    Alert,
    AutosaveTableRow,
  },

  props: {
    name: String,
    columns: Object,
  },

  data() {
    return {
      // Icons
      contentSaveIcon: mdiContentSave,
      checkCircleIcon: mdiCheckCircle,

      // Data fetching
      error: null,
      loading: null,

      // Save functionality
      saveError: null,
      saveLoading: false,
      autosaveTimeout: null,

      allSaved: true,
      savedInterval: null,
      timeSinceSaved: null,
      lastSaved: null,

      // Data
      columnNum: Object.keys(this.columns).length,
      rows: {},
      rowChanges: {}, // Row is array, but rowChanges may skip some indexes
      removedRows: [],
    };
  },

  mounted() {
    this.load();
  },

  watch: {
    allSaved(v) {
      if (!v && !this.savedInterval) {
        // Track time since last saved
        this.lastSaved = new Date().getTime();
        this.timeSinceSaved = 0;

        this.savedInterval = setInterval(() => {
          if (this.allSaved) {
            clearInterval(this.savedInterval);
            this.savedInterval = null;
          } else {
            this.timeSinceSaved = Math.floor(
              (new Date().getTime() - this.lastSaved) / 1000
            );
          }
        }, 1000);
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.savedInterval);
  },

  methods: {
    setAutosave() {
      // Set to autosave in 20 seconds
      if (
        !this.autosaveTimeout &&
        (Object.keys(this.rowChanges).length ||
          Object.keys(this.removedRows).length)
      ) {
        this.autosaveTimeout = setTimeout(() => {
          this.save();
        }, 20000);
      }
    },

    newRow() {
      const rowEntries = Object.entries(this.rows);
      const lastRow = rowEntries[rowEntries.length - 1];

      if (
        !rowEntries.length ||
        (lastRow &&
          (lastRow[1].some((v) => v !== "") || this.rowChanges[lastRow[0]]))
      ) {
        // Last row doesn't exist, isn't empty, or has unsaved changes

        // Generate time-based ID
        let key;
        let i = 0;
        do {
          key = new Date().getTime() + i;
          i++;
        } while (Object.keys(this.rows).includes(key));

        // Add new blank row
        this.rows = { ...this.rows, [key]: new Array(this.columnNum).fill("") };
      }
    },

    update(index, v) {
      if (v === null) {
        // Row is no longer different
        delete this.rowChanges[index];
      } else {
        // Update row changes
        this.rowChanges[index] = v;
        this.newRow();
      }

      // Track row changes
      this.allSaved = !(
        Object.keys(this.rowChanges).length ||
        Object.keys(this.removedRows).length
      );
      this.setAutosave();
    },

    remove(index) {
      this.removedRows.push(index);
      delete this.rows[index];

      // Remove row from current storage
      this.rows = Object.fromEntries(
        Object.entries(this.rows).filter((_, i) => i !== index)
      );
      delete this.rowChanges[index];

      this.newRow();

      // Track row changes
      this.allSaved = false;
      this.save();
    },

    load() {
      this.loading = true;
      this.error = null;

      this.$functions
        .httpsCallable("activityTableGet")({
          id: this.$route.params.activityId,
          tableId: this.name,
        })
        .then((data) => {
          // Success
          this.loading = false;

          this.rows = data.data ? data.data.rows : {};
          this.newRow();
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

    save() {
      clearTimeout(this.autosaveTimeout);
      this.autosaveTimeout = null;

      if (
        !this.saveLoading &&
        (Object.keys(this.rowChanges).length ||
          Object.keys(this.removedRows).length)
      ) {
        const startTime = new Date().getTime();
        this.saveLoading = true;
        this.saveError = null;
        const sentChanges = JSON.parse(JSON.stringify(this.rowChanges));

        this.$functions
          .httpsCallable("activityTableSet")({
            id: this.$route.params.activityId,
            tableId: this.name,
            rowChanges: sentChanges,
            removedRows: this.removedRows,
          })
          .then(() => {
            // Success
            this.saveLoading = false;
            this.lastSaved = startTime;

            this.rows = JSON.parse(
              JSON.stringify(Object.assign(this.rows, sentChanges))
            ); // Avoid JS shallow cloning "feature"

            this.removedRows = [];
          })
          .catch((error) => {
            // Error
            this.saveLoading = false;

            this.saveError =
              error.message === "internal"
                ? "An error occurred when connecting to the server."
                : error.message;
          });
      } else if (this.saveLoading) {
        this.setAutosave();
      }
    },
  },
};
</script>
