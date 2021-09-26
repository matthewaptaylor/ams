<template>
  <v-dialog
    :value="dialog"
    persistent
    max-width="35rem"
    :fullscreen="$vuetify.breakpoint.mobile"
    style="overflow: hidden"
  >
    <v-sheet elevation="2" :rounded="!$vuetify.breakpoint.mobile">
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

      <v-stepper
        v-model="step"
        flat
        style="overflow: auto"
        :style="{
          height: $vuetify.breakpoint.mobile ? 'calc(100vh - 48px)' : null,
          'max-height': !$vuetify.breakpoint.mobile
            ? 'calc(100vh - 144px)'
            : null,
        }"
      >
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
                        v-model="formData.name"
                        :rules="[(v) => !!v || 'Name is required']"
                        label="Name"
                        hide-details="auto"
                        autofocus
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.location"
                        label="Location"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.startDate"
                        label="Start date"
                        hide-details="auto"
                        readonly
                        class="v-input--pointer"
                        @click="showStartDate = true"
                        v-on:keydown.space.prevent
                        v-on:keyup.space="showStartDate = true"
                      ></v-text-field>

                      <PickerDialog
                        :show="showStartDate"
                        :value="formData.startDate"
                        type="date"
                        @close="showStartDate = false"
                        @save="
                          (value) => {
                            formData.startDate = value;
                            showStartDate = false;
                          }
                        "
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.startTime"
                        label="Start time"
                        hide-details="auto"
                        readonly
                        class="v-input--pointer"
                        @click="showStartTime = true"
                        v-on:keydown.space.prevent
                        v-on:keyup.space="showStartTime = true"
                      ></v-text-field>

                      <PickerDialog
                        :show="showStartTime"
                        :value="formData.startTime"
                        type="time"
                        @close="showStartTime = false"
                        @save="
                          (value) => {
                            formData.startTime = value;
                            showStartTime = false;
                          }
                        "
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.endDate"
                        label="End date"
                        hide-details="auto"
                        readonly
                        class="v-input--pointer"
                        @click="showEndDate = true"
                        v-on:keydown.space.prevent
                        v-on:keyup.space="showEndDate = true"
                      ></v-text-field>

                      <PickerDialog
                        :show="showEndDate"
                        :value="formData.endDate"
                        type="date"
                        @close="showEndDate = false"
                        @save="
                          (value) => {
                            formData.endDate = value;
                            showEndDate = false;
                          }
                        "
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.endTime"
                        label="End time"
                        hide-details="auto"
                        readonly
                        class="v-input--pointer"
                        @click="showEndTime = true"
                        v-on:keydown.space.prevent
                        v-on:keyup.space="showEndTime = true"
                      ></v-text-field>

                      <PickerDialog
                        :show="showEndTime"
                        :value="formData.endTime"
                        type="time"
                        @close="showEndTime = false"
                        @save="
                          (value) => {
                            formData.endTime = value;
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
                <ActivityPeople
                  :storedPeople="people"
                  @people="(val) => (people = val)"
                  @modifiedPeople="(val) => (modifiedPeople = val)"
                  @newPeople="(val) => (newPeople = val)"
                  @removedPeople="(val) => (removedPeople = val)"
                />
              </v-col>

              <v-col cols="12" class="mt-n4">
                <Alert dismissable type="error" :message="error" class="mb-2" />

                <div
                  class="d-flex justify-space-between flex-wrap mt-2 border-top"
                  style="gap: 0.5rem 1rem"
                >
                  <v-btn plain @click="step = 1">
                    <v-icon left dark>{{ arrowLeftIcon }}</v-icon>
                    Back
                  </v-btn>

                  <v-btn
                    color="primary"
                    @click="submit"
                    :disabled="loading"
                    :loading="loading"
                  >
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
import PickerDialog from "../../components/inputs/PickerDialog.vue";
import ActivityPeople from "../../components/app/ActivityPeople.vue";
import Alert from "../../components/Alert.vue";

export default {
  components: { PickerDialog, ActivityPeople, Alert },

  data() {
    return {
      // Icons
      arrowLeftIcon: mdiArrowLeft,
      closeIcon: mdiClose,
      arrowRightIcon: mdiArrowRight,
      plusIcon: mdiPlus,

      // Stepper
      step: 1,
      error: null,

      // Details form
      valid: false,
      loading: false,

      formData: {
        name: "",
        location: "",
      },

      // Pickers
      showStartDate: false,
      showStartTime: false,
      showEndDate: false,
      showEndTime: false,

      // People form
      people: [
        {
          displayName: this.$currentUser.displayName,
          email: this.$currentUser.email,
          role: "Activity Leader",
          photoURL: this.$currentUser.photoURL,
          userExists: true,
        },
      ], // Array of people objects, start off with current user
      modifiedPeople: [], // Emails of existing entries in people array with modified roles
      newPeople: [], // Emails of new entries to people array
      removedPeople: [],
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
      this.error = null;

      // Determine list of people, without removed people
      this.formData.people = this.people;
      this.formData.people = this.formData.people.filter(
        (person) => !this.removedPeople.includes(person.email)
      );

      // If anybody's status is unknown, retry
      if (
        this.formData.people.some((person) => person.userExists === "unknown")
      ) {
        var getUsersByEmail = this.$functions.httpsCallable("getUsersByEmail");

        getUsersByEmail({
          emails: this.formData.people
            .filter((person) => person.userExists === "unknown")
            .map((person) => person.email),
        })
          .then((data) => {
            data.data.forEach((person) => {
              const email = person.email;

              // Get the person's record
              const personIndex = this.formData.people.findIndex(
                (person) => person.email === email
              );

              // Update record
              this.formData.people[personIndex].userExists = person.userExists;
              if (person.displayName)
                this.formData.people[personIndex].displayName =
                  person.displayName;
              if (person.photoURL)
                this.formData.people[personIndex].photoURL = person.photoURL;
            });
          })
          .catch(() => {
            this.loading = false;

            this.error = "An error occurred when connecting to the server.";
          });
      }

      if (!this.error) {
        // Safe to continue
        var activityPlannerCreateActivity = this.$functions.httpsCallable(
          "activityPlannerCreateActivity"
        );

        activityPlannerCreateActivity(this.formData)
          .then((data) => {
            // Success
            this.loading = false;

            // Redirect to page

            this.$router.replace({
              name: "ActivityOverview",
              params: { activityId: data.data.id },
            });
          })
          .catch((error) => {
            // Error
            this.loading = false;

            console.log(error);
            this.error =
              error.message === "internal"
                ? "An error occurred when connecting to the server."
                : error.message;
          });
      }
    },
  },
};
</script>
