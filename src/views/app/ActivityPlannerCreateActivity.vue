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

      <v-form
        class="pa-4"
        style="overflow: auto"
        :style="{
          height: $vuetify.breakpoint.mobile ? 'calc(100vh - 48px)' : null,
          'max-height': !$vuetify.breakpoint.mobile
            ? 'calc(100vh - 144px)'
            : null,
        }"
        @submit.prevent="submit"
        ref="form"
      >
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              :rules="[(v) => !!v || 'Name is required']"
              label="Name"
              hide-details="auto"
              autofocus
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-switch v-model="requiresAIF" hide-details="auto">
              <template v-slot:label>
                <span>
                  Activity
                  <strong>
                    {{ requiresAIF ? "requires" : "does not require" }}
                  </strong>
                  an AIF
                </span>
              </template>
            </v-switch>
          </v-col>

          <v-col cols="12">
            <v-card outlined>
              <v-expansion-panels v-model="AIFPanel" flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    When do I need an AIF?
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <p>
                      Most Groups require an Activity Intention Form (AIF) for
                      all activities that aren't in their Scout Hall, as well as
                      overnight stays. However, as set out in the
                      <a
                        href="https://drive.google.com/file/d/1-DY987ykeLa1Oy9UzlS1b6_2h9HsdIXv/view"
                        >rulebook</a
                      >, an AIF is only required in three situations:
                    </p>

                    <ol class="mb-4">
                      <li>
                        All activities (regardless of duration) which include,
                        tramping, caving, canoeing, sailing, rafting, cycling
                        expeditions, underwater diving, skiing, horse trekking,
                        ice or snow work, shooting, any other water activity
                        (other than in public baths or a patrolled area),
                        flying, gliding, parachuting, parasailing, any activity
                        requiring Scouts to enter an Aircraft Movement Area or
                        any activity where Search and Rescue services may be
                        needed in an emergency, or
                      </li>

                      <li>Any activity, of more than one day’s duration, or</li>

                      <li>If the Group Leader requests one.</li>
                    </ol>

                    <p>
                      An activity intention form is not required for any day
                      activities at an approved centre where adequate
                      supervision exists nor for any activity carried out by Sea
                      Scouts in accordance with Clause 2.4 – Water Activities.
                    </p>

                    <p>
                      Parties of adult members which do not include any youth
                      members are not required to obtain permission but should
                      use the activity intention form to plan their activity and
                      inform a contact person if an AIF would usually be
                      required.
                    </p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-switch v-model="requiresRAMS" hide-details="auto">
              <template v-slot:label>
                <span>
                  Activity
                  <strong>
                    {{ requiresRAMS ? "requires" : "does not require" }}
                  </strong>
                  a RAMS form
                </span>
              </template>
            </v-switch>
          </v-col>

          <v-col cols="12">
            <v-card outlined>
              <v-expansion-panels v-model="RAMSPanel" flat>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    >When do I need a RAMS form?</v-expansion-panel-header
                  >

                  <v-expansion-panel-content>
                    A Risk Analysis and Management System (RAMS) form is
                    required for all activities with an element of risk.
                    Usually, if you need an AIF, or are leaving your Scout Hall,
                    you need a RAMS. No matter what, activities involving
                    overnight stays or the use of fire require a RAMS.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <Alert
            dismissable
            type="error"
            :message="error"
            class="mt-2"
            style="width: 100%"
          />

          <v-col cols="12" class="mt-2">
            <div
              class="d-flex justify-space-between flex-wrap mt-2 border-top"
              style="gap: 0.5rem 1rem"
            >
              <v-btn plain @click="$emit('exitDialog')">Cancel</v-btn>

              <v-btn
                color="primary"
                type="submit"
                :disabled="loading"
                :loading="loading"
              >
                <v-icon left dark>{{ plusIcon }}</v-icon>
                Create Activity
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<style>
.v-list-item__action .v-input .v-messages {
  display: block;
}
</style>

<script>
import { mdiArrowLeft, mdiClose, mdiPlus } from "@mdi/js";
import Alert from "../../components/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      arrowLeftIcon: mdiArrowLeft,
      closeIcon: mdiClose,
      plusIcon: mdiPlus,

      // Details form
      valid: false,
      loading: false,
      error: null,

      name: "",
      requiresAIF: false,
      requiresRAMS: false,

      // Hints
      AIFPanel: null,
      RAMSPanel: null,
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

      if (!this.error) {
        // Safe to continue
        this.$functions
          .httpsCallable("activityPlannerCreateActivity")({
            name: this.name,
            requiresAIF: this.requiresAIF,
            requiresRAMS: this.requiresRAMS,
          })
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
