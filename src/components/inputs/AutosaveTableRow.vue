<template>
  <tr class="pt-4 can-select">
    <td class="pa-1" style="width: 2.25rem">
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
        <v-text-field
          solo
          flat
          dense
          background-color="#fafafa"
          v-model="currentRow[name]"
          :placeholder="name"
          hide-details="auto"
        ></v-text-field>
      </td>
    </template>
  </tr>
</template>

<style scoped>
td {
  padding: 4px 4px 3px 4px !important;
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
    row: Object,
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
      currentRow: { ...this.row },
    };
  },

  watch: {
    currentRow: {
      deep: true,

      handler(v) {
        // Check if currentRow and row are the same
        const rowKeys = Object.keys(this.row);
        let equals = rowKeys.length === Object.keys(v).length;
        Object.entries(v).forEach(([row, value]) => {
          if (!rowKeys.includes(row) || this.row[row] !== value) equals = false;
        });

        this.$emit("update", equals ? null : v);
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
