<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Overview</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="8" lg="6">
        <v-row dense>
          <v-col>
            <v-text-field
              label="Activity name"
              value=""
              type="text"
              :rules="[(v) => !!v || 'Activity name is required']"
              required
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Location"
              value=""
              type="text"
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="Start date"
              type="date"
              :value="startDate"
              :icon="calendarIcon"
              :error="startDateError"
              @save="saveStartDate"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="Start time"
              type="time"
              :value="startTime"
              :icon="clockIcon"
              :error="startTimeError"
              @save="saveStartTime"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="End date"
              type="date"
              :value="endDate"
              :icon="calendarIcon"
              :error="endDateError"
              @save="saveEndDate"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="End time"
              type="time"
              :value="endTime"
              :icon="clockIcon"
              :error="endTimeError"
              @save="saveEndTime"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiCalendar, mdiClock, mdiContentSave } from "@mdi/js";
import AutosaveText from "../../../components/inputs/AutosaveText.vue";

export default {
  components: { AutosaveText },

  data() {
    return {
      calendarIcon: mdiCalendar,
      clockIcon: mdiClock,
      contentSaveIcon: mdiContentSave,
      loading: false,
      valid: false,

      startDate: "2020-01-01",
      startDateError: null,

      startTime: null,
      startTimeError: null,

      endDate: "2020-01-01",
      endDateError: null,

      endTime: null,
      endTimeError: null,
    };
  },
  methods: {
    saveStartDate() {},
    saveStartTime() {},
    saveEndDate() {},
    saveEndTime() {},
  },
};
</script>
