<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Route</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header>
                What do I need to do?
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <p>
                  Unfortunately, there aren't many good route planing tools for
                  New Zealand's bush. If you're going along a route for a Type B
                  - High Risk activity, you need to define a route for your AIF.
                  The best way to do this is by using official topographical
                  maps, which can be found at
                  <a href="https://www.topomap.co.nz/">topomap.co.nz</a>. You
                  can find the exact coordinates of a point using this website
                  by clicking on "More", then "Coordinates". It also lets you
                  print off maps for your journey.
                </p>

                <p class="mb-0">
                  You should keep in mind that official topo maps aren't always
                  up to date. The Department of Conservation records all the
                  tracks, huts, and campsites they manage at
                  <a href="https://www.doc.govt.nz/map/index.html"
                    >doc.govt.nz/map/index.html</a
                  >. Note that every track in an Auckland Regional Park is
                  managed by Auckland Council.
                </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="6">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Plan</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12">
            <AutosaveTable name="route" :columns="columns" />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" xl="6">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Alternate/Emergency Plan</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12">
            <AutosaveTable name="emergencyRoute" :columns="columns" />
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
        Date: {
          minWidth: "8rem",
          rows: 1,
        },
        "Route Description": {
          minWidth: "18rem",
          rows: 1,
        },
        "Overnight at Map Reference": {
          minWidth: "12rem",
          rows: 1,
        },
      },
    };
  },
};
</script>
