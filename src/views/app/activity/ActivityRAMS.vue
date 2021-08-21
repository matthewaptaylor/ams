<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <div
          class="d-flex justify-space-between align-center flex-wrap"
          style="column-gap: 1rem; row-gap: 0.5rem"
        >
          <h1 class="text-h4">RAMS</h1>

          <ActivityRAMSRisk />
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-simple-table fixed-header style="overflow: auto">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Category</th>

                <th>Potential Incident</th>

                <th>Controls</th>

                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody class="can-select">
              <tr v-for="risk in risks" :key="risk.id" class="pt-4">
                <td>{{ risk.category }}</td>

                <td>
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
                    This risk is:<strong>
                      {{
                        risk.acceptable ? "acceptable" : "not acceptable"
                      }}</strong
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
import { mdiInformationOutline } from "@mdi/js";
import ActivityRAMSRisk from "../../../components/app/ActivityRAMSRisk.vue";

export default {
  components: { ActivityRAMSRisk },

  data() {
    return {
      informationOutlineIcon: mdiInformationOutline,
      risks: [
        {
          id: 0,
          category: "People",
          hazard: "This is a sample hazard.",
          risk: "This is a sample risk.",
          controls: "This is how you will control the risk.",
          responsibility: "This is the person who is responsible",
          likelihood: "Almost certain",
          consequence: "Negligible",
          level: "Medium",
          acceptable: true,
        },
        {
          id: 1,
          category: "People",
          hazard: "This is a sample hazard.",
          risk: "This is a sample risk.",
          controls: "This is how you will control the risk.",
          responsibility: "This is the person who is responsible",
          likelihood: "Almost certain",
          consequence: "Negligible",
          level: "Medium",
          acceptable: true,
        },
        {
          id: 2,
          category: "People",
          hazard: "This is a sample hazard.",
          risk: "This is a sample risk.",
          controls: "This is how you will control the risk.",
          responsibility: "This is the person who is responsible",
          likelihood: "Almost certain",
          consequence: "Negligible",
          level: "Medium",
          acceptable: true,
        },
      ],
    };
  },
};
</script>