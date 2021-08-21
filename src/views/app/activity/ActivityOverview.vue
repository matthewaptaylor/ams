<template>
  <v-container fluid class="pa-4">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h4">Overview</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-form v-model="valid" @submit.prevent="save">
          <v-row dense>
            <v-col cols="12" sm="6" md="8" lg="6">
              <v-text-field
                label="Activity name"
                value=""
                type="text"
                :rules="[(v) => !!v || 'Activity name is required']"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" sm="6" md="8" lg="6">
              <v-text-field
                label="Location"
                value=""
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="6" sm="3" md="4" lg="3">
              <v-dialog
                ref="startDateDialog"
                v-model="startDateModal"
                :return-value.sync="startDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Start date"
                    :prepend-icon="calendarIcon"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="[(v) => !!v || 'Start date is required']"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker v-model="startDate" scrollable>
                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="startDateModal = false">
                    Cancel
                  </v-btn>

                  <v-btn
                    text
                    color="primary"
                    @click="$refs.startDateDialog.save(startDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col cols="6" sm="3" md="4" lg="3">
              <v-dialog
                ref="startTimeDialog"
                v-model="startTimeModal"
                :return-value.sync="startTime"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startTime"
                    label="Start time"
                    :prepend-icon="clockIcon"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-time-picker format="24hr" v-model="startTime" full-width>
                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="startTimeModal = false">
                    Cancel
                  </v-btn>

                  <v-btn
                    text
                    color="primary"
                    @click="$refs.startTimeDialog.save(startTime)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="6" sm="3" md="4" lg="3">
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
                    :rules="[(v) => !!v || 'End date is required']"
                    required
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

            <v-col cols="6" sm="3" md="4" lg="3">
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

          <v-row dense>
            <v-col cols="12">
              <v-btn
                color="primary"
                type="submit"
                :disabled="!valid || loading"
                :loading="loading"
              >
                <v-icon left dark>{{ contentSaveIcon }}</v-icon>
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiCalendar, mdiClock, mdiContentSave } from "@mdi/js";

export default {
  data() {
    return {
      calendarIcon: mdiCalendar,
      clockIcon: mdiClock,
      contentSaveIcon: mdiContentSave,
      loading: false,
      valid: false,
      startDateModal: false,
      startDate: null,
      startTimeModal: false,
      startTime: null,
      endDateModal: false,
      endDate: null,
      endTimeModal: false,
      endTime: null,
    };
  },
  methods: {
    save() {},
  },
};
</script>
