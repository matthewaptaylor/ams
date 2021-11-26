<template>
  <tr class="pt-4 can-select">
    <td class="py-2 px-1" style="width: 2.25rem">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            @click="showRemove = !showRemove"
            :disabled="showRemove"
            v-bind="attrs"
            v-on="on"
            style="margin: 1px 0 1px 0"
          >
            <v-icon>{{ deleteIcon }}</v-icon>
          </v-btn>
        </template>

        <span>Remove</span>
      </v-tooltip>
    </td>

    <td
      :colspan="Object.keys(columns).length"
      class="pa-1 pr-2"
      v-if="showRemove"
    >
      <v-sheet color="error" dark elevation="2" rounded class="pa-4 my-1">
        <p style="font-size: 1rem; line-height: 1.15">
          Are you sure you want to remove this row?
        </p>

        <div class="d-flex flex-wrap" style="gap: 0.5rem 1rem; width: 100%">
          <v-btn
            outlined
            @click="remove"
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

    <template v-if="!showRemove">
      <td v-for="(data, name) in columns" :key="name">
        <v-textarea
          solo
          flat
          dense
          background-color="#fafafa"
          v-model="currentRow[Object.keys(columns).indexOf(name)]"
          :placeholder="name"
          hide-details="auto"
          :rows="data.rows"
          v-if="data.rows > 1"
          :disabled="!!data.computed"
        ></v-textarea>

        <v-text-field
          solo
          flat
          dense
          background-color="#fafafa"
          v-model.number="currentRow[Object.keys(columns).indexOf(name)]"
          :placeholder="name"
          type="number"
          hide-details="auto"
          :disabled="!!data.computed"
          v-if="data.rows <= 1 && data.type === 'number'"
        ></v-text-field>

        <v-text-field
          solo
          flat
          dense
          background-color="#fafafa"
          v-model="currentRow[Object.keys(columns).indexOf(name)]"
          :placeholder="name"
          hide-details="auto"
          :disabled="!!data.computed"
          v-if="data.rows <= 1 && data.type !== 'number'"
        ></v-text-field>
      </td>

      <td v-for="(data, name) in computedColumns" :key="name">
        <v-text-field
          solo
          flat
          dense
          background-color="#fafafa"
          v-model="computedValues[Object.keys(computedColumns).indexOf(name)]"
          :placeholder="name"
          hide-details="auto"
          disabled
        ></v-text-field>
      </td>
    </template>
  </tr>
</template>

<style scoped>
td {
  padding: 8px 4px 7px 4px !important;
  vertical-align: top;
}
</style>

<script>
import { mdiDelete } from "@mdi/js";
import Alert from "../Alert.vue";

export default {
  components: { Alert },

  props: {
    columns: Object,
    computedColumns: Object,
    row: Array,
  },

  data() {
    return {
      // Icons
      deleteIcon: mdiDelete,

      // Remove functionality
      showRemove: false,
      removeLoading: false,
      removeError: null,

      // Track user inputs
      currentRow: [...this.row],
      computedValues: Array(Object.keys(this.computedColumns).keys).fill(""),
    };
  },

  watch: {
    row(v) {
      // Check if new row is same as currentRow
      if (v.every((v, i) => v === this.currentRow[i])) {
        this.$emit("update", null);
      }
    },

    currentRow: {
      deep: true,

      handler(v) {
        // Check if currentRow and row are the same
        let equals =
          this.row.length === v.length &&
          this.row.every((data, index) => data === v[index]);

        this.$emit("update", equals ? null : v);

        // Recalculate any computed rows
        Object.values(this.computedColumns).forEach((column, columnIndex) => {
          this.computedValues[columnIndex] = column.calculation(v);
        });
      },
    },
  },

  methods: {
    remove() {
      this.$emit("remove");
    },
  },
};
</script>
