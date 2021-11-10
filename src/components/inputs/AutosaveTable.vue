<template>
  <v-simple-table fixed-header style="overflow: auto">
    <thead>
      <tr>
        <th class="px-1" style="width: 2.25rem"></th>

        <th v-for="(data, name) in columns" :key="name" class="text-left">
          {{ name }}
        </th>
      </tr>
    </thead>

    <tbody>
      <AutosaveTableRow
        :columns="columns"
        :row="data"
        @update="(v) => update(index, v)"
        v-for="(data, index) in rows"
        :key="index"
      />
    </tbody>
  </v-simple-table>
</template>

<style scoped>
th {
  white-space: nowrap;
}
</style>

<script>
import { mdiDelete } from "@mdi/js";
import AutosaveTableRow from "./AutosaveTableRow.vue";

export default {
  components: {
    AutosaveTableRow,
  },

  props: {
    columns: Object,
    rows: Array,
  },

  data() {
    return {
      // Icons
      deleteIcon: mdiDelete,

      // Data
      rowChanges: {}, // Row is array, but rowChanges may skip some indexes
    };
  },

  methods: {
    update(index, v) {
      if (v === null) {
        // Row is no longer different
        delete this.rowChanges[index];
      } else {
        // Update row changes
        this.rowChanges[index] = v;
      }

      console.log(this.rowChanges);
    },

    save() {
      this.$functions
        .httpsCallable("activityTableSet")({
          id: this.$route.params.activityId,
        })
        .then((data) => {
          // Success
          console.log(data);
        })
        .catch((error) => {
          // Error
          console.log(error);
        });
    },
  },
};
</script>
