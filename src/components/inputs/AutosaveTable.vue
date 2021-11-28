<template>
  <v-simple-table fixed-header style="overflow: auto">
    <thead>
      <tr>
        <th
          class="px-1"
          style="min-width: 44px; max-width: 44px"
          v-if="!disabled"
        ></th>

        <th
          v-for="(data, name) in {
            ...columns,
            ...(computedColumns ? computedColumns : {}),
          }"
          :key="name"
          class="text-left"
          :style="{ 'min-width': data.minWidth }"
        >
          {{ name }}
        </th>
      </tr>
    </thead>

    <tbody v-if="!disabled">
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
              Last saved {{ secondsSinceSaved }} second{{
                secondsSinceSaved === 1 ? null : "s"
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

          <Alert type="error" :message="saveError" class="mt-1" dismissable />
        </td>
      </tr>
    </tbody>

    <tbody v-if="loading">
      <tr class="hideHover" v-for="i in 2" :key="i">
        <td v-if="!disabled"></td>

        <td class="px-1" v-for="i in columnNum" :key="i">
          <v-skeleton-loader type="custom" height="38px" width="100%" />
        </td>
      </tr>
    </tbody>

    <tbody>
      <AutosaveTableRow
        :columns="columns"
        :computedColumns="computedColumns ? computedColumns : {}"
        :row="rows[index]"
        @update="(v) => update(index, v)"
        @remove="() => remove(index)"
        v-for="index in Object.keys(rows ? rows : {}).sort()"
        :key="index"
        :disabled="disabled"
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
    computedColumns: Object,
    disabled: Boolean,
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
      allSaved: true,
      saveInterval: null,
      secondsSinceSaved: 0,
      lastSaveTime: null,
      lastChangeTime: null,

      // Data
      columnNum:
        Object.keys(this.columns).length +
        Object.keys(this.computedColumns ? this.computedColumns : {}).length,
      rows: {},
      rowChanges: {}, // Row is array, but rowChanges may skip some indexes
      removedRows: [],
    };
  },

  mounted() {
    this.load();
  },

  watch: {
    rows: {
      deep: true,

      handler(v) {
        this.$emit("savedRows", v);
      },
    },

    allSaved(v) {
      if (v) {
        // Everything saved
        clearInterval(this.saveInterval);
      } else {
        // No longer up to date
        this.secondsSinceSaved = 0;
        this.lastSaveTime = new Date().getTime();

        this.saveInterval = setInterval(() => {
          // Check if save is needed every second
          const now = new Date().getTime();
          this.secondsSinceSaved = Math.floor((now - this.lastSaveTime) / 1000);

          if (
            now >= this.lastSaveTime + 15000 ||
            now >= this.lastChangeTime + 3000
          ) {
            // Haven't typed in 3 seconds, or haven't saved in 15
            this.save();
          }
        }, 1000);
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.saveInterval);
  },

  methods: {
    newRow() {
      const rowEntries = Object.entries(this.rows ? this.rows : {});
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
        } while (Object.keys(this.rows ? this.rows : {}).includes(key));

        // Add new blank row
        this.rows = {
          ...this.rows,
          [key]: new Array(Object.keys(this.columns).length).fill(""),
        };
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
      this.lastChangeTime = new Date().getTime();
      this.allSaved = !(
        Object.keys(this.rowChanges).length ||
        Object.keys(this.removedRows).length
      );
    },

    remove(index) {
      this.removedRows.push(index);
      delete this.rows[index];

      // Remove row from current storage
      this.rows = Object.fromEntries(
        Object.entries(this.rows ? this.rows : {}).filter((_, i) => i !== index)
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
      if (
        Object.keys(this.rowChanges).length ||
        Object.keys(this.removedRows).length
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
            this.lastSaveTime = startTime;

            this.rows = JSON.parse(
              JSON.stringify(
                Object.assign(this.rows ? this.rows : {}, sentChanges)
              )
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
      }
    },
  },
};
</script>
