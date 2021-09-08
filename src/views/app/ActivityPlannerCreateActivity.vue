<template>
  <v-dialog
    :value="dialog"
    persistent
    max-width="35rem"
    :fullscreen="$vuetify.breakpoint.mobile"
  >
    <v-sheet elevation="2" rounded class="fill-height">
      <v-toolbar
        dark
        color="primary"
        style="position: sticky; top: 0; z-index: 1"
        :dense="$vuetify.breakpoint.mobile"
      >
        <v-btn
          icon
          @click="$emit('exitDialog')"
          style="width: 40px; height: 40px"
          class="d-md-none"
        >
          <v-icon>{{ arrowLeftIcon }}</v-icon>
        </v-btn>

        <v-toolbar-title class="pl-md-0">Create Activity</v-toolbar-title>

        <v-spacer />

        <v-btn icon @click="$emit('exitDialog')" class="d-none d-md-block">
          <v-icon>{{ closeIcon }}</v-icon>
        </v-btn>
      </v-toolbar>

      <v-stepper v-model="step" flat>
        <v-stepper-header
          class="py-2"
          style="height: unset; box-shadow: none"
          elevation="0"
        >
          <v-stepper-step :complete="step > 1" step="1" class="py-1">
            Details
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="step > 2" step="2" class="py-1">
            People
          </v-stepper-step>
        </v-stepper-header>

        <v-divider />

        <v-stepper-items>
          <v-stepper-content step="1" class="pa-4">
            <v-row>
              <v-col cols="12">
                <h2 class="text-h5">Details</h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-form v-model="valid" @submit.prevent="step = 2" ref="form">
                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field
                        v-model="activityName"
                        :rules="[(v) => !!v || 'Activity name is required']"
                        label="Activity Name"
                        hide-details="auto"
                        autofocus
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="location"
                        label="Location"
                        hide-details="auto"
                        autofocus
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="startDate"
                        label="Start date"
                        hide-details="auto"
                        readonly
                        class="v-input--pointer"
                        @click="showStartDate = true"
                      ></v-text-field>

                      <PickerDialog
                        :show="showStartDate"
                        :value="startDate"
                        type="date"
                        @close="showStartDate = false"
                        @save="
                          (value) => {
                            startDate = value;
                            showStartDate = false;
                          }
                        "
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="startTime"
                        label="Start time"
                        hide-details="auto"
                        readonly
                        class="v-input--pointer"
                        @click="showStartTime = true"
                      ></v-text-field>

                      <PickerDialog
                        :show="showStartTime"
                        :value="startTime"
                        type="time"
                        @close="showStartTime = false"
                        @save="
                          (value) => {
                            startTime = value;
                            showStartTime = false;
                          }
                        "
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="endDate"
                        label="End date"
                        hide-details="auto"
                        readonly
                        class="v-input--pointer"
                        @click="showEndDate = true"
                      ></v-text-field>

                      <PickerDialog
                        :show="showEndDate"
                        :value="endDate"
                        type="date"
                        @close="showEndDate = false"
                        @save="
                          (value) => {
                            endDate = value;
                            showEndDate = false;
                          }
                        "
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="endTime"
                        label="End time"
                        hide-details="auto"
                        readonly
                        class="v-input--pointer"
                        @click="showEndTime = true"
                      ></v-text-field>

                      <PickerDialog
                        :show="showEndTime"
                        :value="endTime"
                        type="time"
                        @close="showEndTime = false"
                        @save="
                          (value) => {
                            endTime = value;
                            showEndTime = false;
                          }
                        "
                      />
                    </v-col>

                    <v-col cols="12" class="mt-2">
                      <div
                        class="d-flex justify-space-between flex-wrap"
                        style="gap: 0.5rem 1rem"
                      >
                        <v-btn plain @click="$emit('exitDialog')">Cancel</v-btn>

                        <v-btn color="primary" type="submit" :disabled="!valid">
                          Next
                          <v-icon right dark>{{ arrowRightIcon }}</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2" class="pa-4">
            <v-row>
              <v-col cols="12">
                <h2 class="text-h5">People</h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <ActivityAccess />
              </v-col>

              <v-col cols="12" class="mt-n4">
                <div
                  class="d-flex justify-space-between flex-wrap mt-2 border-top"
                  style="gap: 0.5rem 1rem"
                >
                  <v-btn plain @click="step = 1">
                    <v-icon left dark>{{ arrowLeftIcon }}</v-icon>
                    Back
                  </v-btn>

                  <v-btn color="primary" type="submit">
                    <v-icon left dark>{{ plusIcon }}</v-icon>
                    Create Activity
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-sheet>
  </v-dialog>
</template>

<style>
.v-list-item__action .v-input .v-messages {
  display: block;
}
</style>

<script>
import { mdiArrowLeft, mdiClose, mdiArrowRight, mdiPlus } from "@mdi/js";
import firebase from "firebase/app";
import PickerDialog from "../../components/inputs/PickerDialog.vue";
import ActivityAccess from "../../components/app/ActivityAccess.vue";

export default {
  components: { PickerDialog, ActivityAccess },

  data() {
    return {
      // Icons
      arrowLeftIcon: mdiArrowLeft,
      closeIcon: mdiClose,
      arrowRightIcon: mdiArrowRight,
      plusIcon: mdiPlus,

      // Stepper
      step: 1,

      // Details form
      valid: false,
      loading: false,

      activityName: "",

      location: "",

      startDate: null,
      showStartDate: false,

      startTime: null,
      showStartTime: false,

      endDate: null,
      showEndDate: false,

      endTime: null,
      showEndTime: false,

      // Values
    };
  },

  props: {
    dialog: Boolean,
  },

  methods: {
    addAccount(e) {
      console.log(
        e,
        this.$refs.accountInput.getValue(),
        this.$refs.accountInput.getText(),
        this.$refs.accountInput.getContent()
      );
    },

    submit() {
      this.loading = true;

      var activityPlannerCreateActivity = firebase
        .functions()
        .httpsCallable("activityPlannerCreateActivity");

      activityPlannerCreateActivity({
        name: this.activityName,
      }).then(() => {
        // Success
        this.loading = false;

        this.$emit("exitDialog");
      });
    },
  },
};
</script>
