<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Overview</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="8" lg="6">
        <Alert
          type="error"
          :message="error"
          :action="{ text: 'Retry', callback: load }"
          class="mb-2"
        />
        <v-row dense>
          <v-col>
            <AutosaveText
              label="Activity name"
              type="text"
              :rules="[(v) => !!v || 'Activity name is required']"
              required
              :value="name"
              :error="nameError"
              :loading="loading"
              @save="(v) => update(v, 'name', 'nameError')"
            />
          </v-col>

          <v-col cols="12">
            <AutosaveText
              label="Location"
              type="text"
              :value="location"
              :error="locationError"
              :loading="loading"
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
              :loading="loading"
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
              :loading="loading"
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
              :loading="loading"
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
              :loading="loading"
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
import Alert from "../../../components/Alert";
import AutosaveText from "../../../components/inputs/AutosaveText.vue";

export default {
  components: { Alert, AutosaveText },

  data() {
    return {
      // Icons
      calendarIcon: mdiCalendar,
      clockIcon: mdiClock,
      contentSaveIcon: mdiContentSave,

      // Form
      loading: false,
      error: null,

      // Fields
      name: null,
      nameError: null,

      location: null,
      locationError: null,

      startDate: null,
      startDateError: null,

      startTime: null,
      startTimeError: null,

      endDate: null,
      endDateError: null,

      endTime: null,
      endTimeError: null,
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
        .httpsCallable("activityOverviewGet")({
          id: this.$route.params.activityId,
        })
        .then((data) => {
          // Success
          this.loading = false;

          this.name = data.data.name;
          this.location = data.data.location;
          this.startDate = data.data.startDate;
          this.startTime = data.data.startTime;
          this.endDate = data.data.endDate;
          this.endTime = data.data.endTime;
        })
        .catch((error) => {
          // Error
          this.error =
            error.message === "internal"
              ? "An error occurred when connecting to the server."
              : error.message;
        });
    },

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
          this[fieldName] = v;
        })
        .catch((error) => {
          // Error
          this[errorName] = { message: error.message };
        });
    },
  },
};
</script>
