<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Budget</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <AutosaveTable
              name="budget"
              :columns="columns"
              :computedColumns="computedColumns"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AutosaveTable from "../../../components/inputs/AutosaveTable.vue";

export default {
  components: {
    AutosaveTable,
  },

  data() {
    return {
      columns: {
        Description: {
          minWidth: "12rem",
          rows: 2,
        },
        Link: {
          minWidth: "8rem",
          rows: 1,
        },
        "Unit Cost": {
          minWidth: "8rem",
          type: "number",
          rows: 1,
        },
        Quantity: {
          minWidth: "8rem",
          type: "number",
          rows: 1,
        },
      },

      computedColumns: {
        "Total Cost": {
          minWidth: "8rem",
          calculation: (row) => {
            const v = row[2] * row[3];
            return v ? v : "";
          },
        },
      },
    };
  },
};
</script>
