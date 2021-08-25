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

          <v-col cols="12" sm="6" lg="6">
            <AutosaveText
              label="Start date"
              type="date"
              :value="startDate"
              :icon="calendarIcon"
              :error="startDateError"
              @save="saveStartDate"
            />
          </v-col>

          <v-col cols="12" sm="6" lg="6">
            <AutosaveText
              label="Start time"
              type="time"
              :value="startTime"
              :icon="clockIcon"
              :error="startTimeError"
              @save="saveStartTime"
            />
          </v-col>

          <v-col cols="12" sm="6" lg="6">
            <v-dialog
              ref="endDateDialog"
              v-model="endDateModal"
              :return-value.sync="endDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="End date"
                  :prepend-icon="calendarIcon"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  hide-details="auto"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" scrollable>
                <v-spacer></v-spacer>

                <v-btn text color="primary" @click="endDateModal = false">
                  Cancel
                </v-btn>

                <v-btn
                  text
                  color="primary"
                  @click="$refs.endDateDialog.save(endDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col cols="12" sm="6" lg="6">
            <v-dialog
              ref="endTimeDialog"
              v-model="endTimeModal"
              :return-value.sync="endTime"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endTime"
                  label="End time"
                  :prepend-icon="clockIcon"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  hide-details="auto"
                ></v-text-field>
              </template>
              <v-time-picker format="24hr" v-model="endTime" full-width>
                <v-spacer></v-spacer>

                <v-btn text color="primary" @click="endTimeModal = false">
                  Cancel
                </v-btn>

                <v-btn
                  text
                  color="primary"
                  @click="$refs.endTimeDialog.save(endTime)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiCalendar, mdiClock, mdiContentSave } from "@mdi/js";
import AutosaveText from "../../../components/app/AutosaveText.vue";

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

      endDateModal: false,
      endDate: null,
      endTimeModal: false,
      endTime: null,
    };
  },
  methods: {
    saveStartDate() {},
  },
};
</script>
