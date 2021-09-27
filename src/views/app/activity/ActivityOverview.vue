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
            <AutosaveText
              label="Activity name"
              type="text"
              :rules="[(v) => !!v || 'Activity name is required']"
              required
              :value="activityName"
              :error="nameError"
              @save="(v) => update(v, 'name', 'nameError')"
            />
          </v-col>

          <v-col cols="12">
            <AutosaveText
              label="Location"
              type="text"
              :value="location"
              :error="locationError"
              @save="(v) => update(v, 'location', 'locationError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="Start date"
              type="date"
              :value="startDate"
              :icon="calendarIcon"
              :error="startDateError"
              @save="(v) => update(v, 'startDate', 'startDateError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="Start time"
              type="time"
              :value="startTime"
              :icon="clockIcon"
              :error="startTimeError"
              @save="(v) => update(v, 'startTime', 'startTimeError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="End date"
              type="date"
              :value="endDate"
              :icon="calendarIcon"
              :error="endDateError"
              @save="(v) => update(v, 'endDate', 'endDateError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="End time"
              type="time"
              :value="endTime"
              :icon="clockIcon"
              :error="endTimeError"
              @save="(v) => update(v, 'endTime', 'endTimeError')"
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

  props: {
    activityName: String,
    location: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
  },

  data() {
    return {
      // Icons
      calendarIcon: mdiCalendar,
      clockIcon: mdiClock,
      contentSaveIcon: mdiContentSave,

      // Fields
      nameError: null,
      locationError: null,
      startDateError: null,
      startTimeError: null,
      endDateError: null,
      endTimeError: null,
    };
  },

  methods: {
    update(v, fieldName, errorName) {
      // Display activities
      this[errorName] = null;

      this.$functions
        .httpsCallable("activityOverviewSet")({
          id: this.$route.params.activityId,
          [fieldName]: v,
        })
        .then(() => {
          // Success
          this.$emit("update", fieldName, v);
        })
        .catch((error) => {
          // Error
          this[errorName] = { message: error.message };
        });
    },
  },
};
</script>
