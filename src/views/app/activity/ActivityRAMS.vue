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
          @click="$emit('showDialog', 'create')"
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
          @click="$emit('showDialog', 'create')"
        >
          <v-icon>{{ plusIcon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <v-card outlined>
              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    How do I do a risk assessment?
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <p>
                      When doing a risk assessment, you need to think about what
                      could cause something to go wrong (the hazard), and what
                      could happen because of this (the risk). For example:
                    </p>

                    <ul class="mb-4">
                      <li>
                        One hazard might be rocks and uneven ground, with a risk
                        of trips, cuts, and scrapes.
                      </li>

                      <li>
                        Another hazard might be driver fatigue, with a risk of
                        crashing.
                      </li>
                    </ul>

                    <p>
                      The best way to come up with these is to go through your
                      plan, step by step. What are the risks and hazards for
                      each step? You can brainstorm these on the
                      <router-link :to="{ name: 'ActivityPlan' }"
                        >Plan</router-link
                      >
                      page using the "Potential Risks" column.
                    </p>

                    <p>
                      Risks are a problem. You need to find a way to remove (so
                      it won't happen), minimise (so it's not as likely, or the
                      consequences aren't as bad), or isolate (keep it away from
                      people) each risk, and record whose responsibility it is
                      to take action. For example:
                    </p>

                    <ul class="mb-4">
                      <li>
                        You could remove the hazard of rocks and uneven ground
                        by avoiding those routes. You could also minimise the
                        risk by making sure everybody wears strong and sturdy
                        shows.
                      </li>

                      <li>
                        You could minimise the risk of driver fatigue by making
                        sure they take breaks every two hours (this is Scouts
                        Aotearoa policy).
                      </li>
                    </ul>

                    <p>
                      Finally, you need to evaluate if a risk is acceptable or
                      not. To do this, you should consider the likelihood of a
                      risk happening with the controls you've set in place, and
                      weigh it up with the potential consequences. If you think
                      this is an acceptable risk, you can tick the box on the
                      "Add Risk" dialog and continue on with the activity.

                      <strong>
                        If you believe that a risk is not acceptable, you should
                        not carry out the activity.
                      </strong>

                      For example:
                    </p>

                    <ul class="mb-4">
                      <li>
                        The risk posed by rocks and uneven ground, when we're
                        controlling it (e.g. making sure everybody wears sturdy
                        shoes), is likely. The "Add Risk" dialog says this means
                        it’s conceivable it could occur, but only expected
                        infrequently. The potential consequences are minor. This
                        risk is acceptable.
                      </li>

                      <li>
                        The risk posed by driver fatigue, when we're controlling
                        it (e.g. by taking breaks every two hours), is unlikely.
                        The "Add Risk" dislog says this means it’s conceivable
                        that this could happen, although only in unusual
                        circumstances. However, the potential consequences of
                        this could be catastrophic. As long as we make sure to
                        control this risk, it is acceptable.
                      </li>
                    </ul>

                    <p class="mb-0">
                      A risk assessment is a living document. This means
                      <strong>
                        you should constantly be thinking of potential risks
                      </strong>
                      both before and during the activity, and adding to it. You
                      may not realise something important until you're there.
                    </p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <Alert type="error" :message="error" class="my-2" />

          <v-col cols="12">
            <v-simple-table fixed-header style="overflow: auto">
              <thead>
                <tr>
                  <th class="px-1" style="min-width: 44px"></th>

                  <th
                    class="px-1"
                    style="
                      min-width: 12rem;
                      width: calc(0.3 * (100% - 2.25rem));
                    "
                  >
                    Potential Incident
                  </th>

                  <th
                    class="px-1"
                    style="
                      min-width: 16rem;
                      width: calc(0.4 * (100% - 2.25rem));
                    "
                  >
                    Controls
                  </th>

                  <th
                    class="px-1"
                    style="
                      min-width: 12rem;
                      width: calc(0.3 * (100% - 2.25rem));
                    "
                  >
                    Risk Level
                  </th>
                </tr>
              </thead>

              <tbody v-if="!loading">
                <ActivityRAMSRow
                  :key="id"
                  :activityId="$route.params.activityId"
                  :riskId="id"
                  :risk="risk"
                  @showDialog="(id) => $emit('showDialog', id)"
                  @updateObject="updateObject"
                  v-for="(risk, id) in risks"
                />
              </tbody>

              <tbody v-if="loading">
                <tr class="hideHover" v-for="i in 2" :key="i">
                  <td></td>

                  <td class="px-1">
                    <v-skeleton-loader
                      type="text@3"
                      class="mt-2"
                    ></v-skeleton-loader>
                  </td>

                  <td class="px-1">
                    <v-skeleton-loader
                      type="text@2"
                      class="mt-2"
                    ></v-skeleton-loader>
                  </td>

                  <td class="px-1">
                    <v-skeleton-loader
                      type="text@3"
                      class="mt-2"
                    ></v-skeleton-loader>
                  </td>
                </tr>
              </tbody>

              <tbody v-if="!loading && !Object.keys(risks).length">
                <tr class="hideHover">
                  <td colspan="4" class="text-center py-3">
                    <v-icon>{{ mapSearchIcon }}</v-icon>

                    <v-list-item-title class="text-wrap text--secondary">
                      We searched all over, but there's nothing here.
                    </v-list-item-title>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
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
}
.hideHover:hover {
  background: none !important;
}
</style>

<script>
import {
  mdiPlus,
  mdiInformationOutline,
  mdiMapSearch,
  mdiDelete,
  mdiPencil,
} from "@mdi/js";

import Alert from "../../../components/Alert.vue";
import ActivityRAMSRow from "../../../components/app/ActivityRAMSRow.vue";

export default {
  components: { Alert, ActivityRAMSRow },

  data() {
    return {
      // Icons
      plusIcon: mdiPlus,
      informationOutlineIcon: mdiInformationOutline,
      mapSearchIcon: mdiMapSearch,
      deleteIcon: mdiDelete,
      pencilIcon: mdiPencil,

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

    // RAMS has been updated
    updateObject(fieldName, v) {
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
