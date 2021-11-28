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
            <v-simple-table fixed-header style="overflow: auto">
              <thead>
                <tr>
                  <th
                    v-for="name in ['Subtotal', '10% Contingency', 'Total']"
                    :key="name"
                    class="text-left"
                    style="min-width: 8rem"
                  >
                    {{ name }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <td class="py-2 px-4">${{ subtotal.toFixed(2) }}</td>

                <td class="py-2 px-4">${{ contingency.toFixed(2) }}</td>

                <td class="py-2 px-4">${{ total.toFixed(2) }}</td>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12">
            <AutosaveTable
              name="budget"
              :columns="columns"
              :computedColumns="computedColumns"
              @savedRows="updateHeaderTable"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiCurrencyUsd } from "@mdi/js";
import AutosaveTable from "../../../components/inputs/AutosaveTable.vue";

export default {
  components: {
    AutosaveTable,
  },

  data() {
    return {
      subtotal: 0,
      contingency: 0,
      total: 0,

      columns: {
        Description: {
          minWidth: "12rem",
          rows: 2,
        },
        Link: {
          minWidth: "8rem",
          rows: 1,
        },
        Quantity: {
          minWidth: "8rem",
          type: "number",
          rows: 1,
        },
        "Unit Cost": {
          minWidth: "8rem",
          type: "number",
          prependInnerIcon: mdiCurrencyUsd,
          rows: 1,
        },
      },

      computedColumns: {
        "Total Cost": {
          minWidth: "8rem",
          prependInnerIcon: mdiCurrencyUsd,
          calculation: (row) => {
            const v = row[2] * row[3];
            return v ? v : "";
          },
        },
      },
    };
  },

  methods: {
    updateHeaderTable(v) {
      // Calculate totals
      this.subtotal = Object.values(v).reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue[2] * currentValue[3],
        0
      );

      this.contingency = this.subtotal * 0.1;
      this.total = this.subtotal + this.contingency;
    },
  },
};
</script>
