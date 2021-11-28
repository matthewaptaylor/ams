<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Plan</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <p class="mb-0">
              Go through your activity, step by step. What needs to happen, and
              when? What equipment will you need? Who's job is it to run? You
              may find it useful to brainstorm potential risks that you can
              refer to later when filling out your RAMS form.
            </p>
          </v-col>

          <v-col cols="12">
            <AutosaveTable name="plan" :columns="columns" />
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
        When: {
          minWidth: "8rem",
          rows: 1,
        },
        Description: {
          minWidth: "12rem",
          rows: 2,
        },
        Equipment: {
          minWidth: "8rem",
          rows: 2,
        },
        Responsibility: {
          minWidth: "8rem",
          rows: 1,
        },
        "Potential Risks": {
          minWidth: "8rem",
          rows: 2,
        },
      },
    };
  },
};
</script>
