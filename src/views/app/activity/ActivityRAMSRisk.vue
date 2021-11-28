<template>
  <v-dialog
    :value="dialog"
    persistent
    max-width="50rem"
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

        <v-toolbar-title
          class="pl-md-0"
          v-text="addMode ? 'Add Risk' : 'Edit Risk'"
        />

        <v-spacer />

        <v-btn icon @click="$emit('exitDialog')" class="d-none d-md-block">
          <v-icon>{{ closeIcon }}</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form
        v-model="valid"
        @submit.prevent="updateRisk"
        class="pa-4"
        style="overflow: auto"
        :style="{
          height: $vuetify.breakpoint.mobile ? 'calc(100vh - 48px)' : null,
          'max-height': !$vuetify.breakpoint.mobile
            ? 'calc(100vh - 144px)'
            : null,
        }"
      >
        <Alert
          type="error"
          :message="loadError"
          :action="{ text: 'Retry', callback: load }"
          class="mb-2"
        />

        <v-row v-if="!loadError">
          <v-col cols="12" sm="6" md="8" class="pb-0 pb-sm-3">
            <v-row>
              <v-col cols="12" md="6" class="pb-0 pb-md-1">
                <v-select
                  v-model="category"
                  :items="categories"
                  label="Category"
                  :rules="[(v) => !!v || 'Category is required']"
                  required
                  v-if="!loadLoading"
                ></v-select>

                <v-skeleton-loader
                  type="custom"
                  height="74.5px"
                  width="100%"
                  style="padding-top: 4px; padding-bottom: 27px"
                  v-else
                />

                <v-textarea
                  v-model="hazard"
                  label="Hazard"
                  rows="2"
                  hint="What causes this risk?"
                  persistent-hint
                  :rules="[(v) => !!v || 'Hazard is required']"
                  required
                  v-if="!loadLoading"
                ></v-textarea>

                <v-skeleton-loader
                  type="custom"
                  height="100.222px"
                  width="100%"
                  style="padding-top: 4px; padding-bottom: 21px"
                  v-else
                />

                <v-textarea
                  v-model="risk"
                  label="Risk"
                  rows="2"
                  hint="What could happen?"
                  persistent-hint
                  :rules="[(v) => !!v || 'Risk is required']"
                  required
                  v-if="!loadLoading"
                ></v-textarea>

                <v-skeleton-loader
                  type="custom"
                  height="100.222px"
                  width="100%"
                  style="padding-top: 4px; padding-bottom: 21px"
                  v-else
                />
              </v-col>

              <v-col cols="12" md="6" class="pt-0 pt-md-1">
                <v-textarea
                  v-model="controls"
                  label="Controls"
                  rows="2"
                  hint="How will you remove, minimise, or isolate the risk?"
                  persistent-hint
                  :rules="[(v) => !!v || 'Controls is required']"
                  required
                  v-if="!loadLoading"
                ></v-textarea>

                <v-skeleton-loader
                  type="custom"
                  height="100.222px"
                  width="100%"
                  style="padding-top: 4px; padding-bottom: 21px"
                  v-else
                />

                <v-text-field
                  v-model="responsibility"
                  label="Responsibility"
                  hint="Who is responsible for managing this risk?"
                  persistent-hint
                  :rules="[(v) => !!v || 'Responsibility is required']"
                  required
                  v-if="!loadLoading"
                ></v-text-field>

                <v-skeleton-loader
                  type="custom"
                  height="70px"
                  width="100%"
                  style="padding-top: 4px; padding-bottom: 21px"
                  v-else
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="pt-0 pt-sm-3">
            <v-select
              v-model="likelihood"
              :items="Object.keys(likelihoods)"
              label="Likelihood"
              persistent-hint
              return-object
              :hint="
                likelihood == undefined
                  ? ''
                  : likelihoods[likelihood].description
              "
              :rules="[(v) => !!v || 'Liklihood is required']"
              required
              v-if="!loadLoading"
            ></v-select>

            <v-skeleton-loader
              type="custom"
              height="74.5px"
              width="100%"
              style="padding-top: 4px; padding-bottom: 27px"
              v-else
            />

            <v-select
              v-model="consequence"
              :items="Object.keys(consequences)"
              label="Consequence"
              persistent-hint
              return-object
              :hint="
                consequence == undefined
                  ? ''
                  : consequences[consequence].description
              "
              class="mb-2"
              :rules="[(v) => !!v || 'Consequence is required']"
              required
              v-if="!loadLoading"
            ></v-select>

            <v-skeleton-loader
              type="custom"
              height="74.5px"
              width="100%"
              style="padding-top: 4px; padding-bottom: 27px"
              v-else
            />

            <p class="mb-0">{{ riskLevels[riskLevel] }}</p>

            <v-checkbox
              v-model="acceptable"
              label="Risk is acceptable"
              class="mt-2"
              v-if="!loadLoading"
            ></v-checkbox>

            <v-skeleton-loader
              type="custom"
              height="58px"
              width="100%"
              style="padding-top: 8px; padding-bottom: 21px"
              v-else
            />
          </v-col>
        </v-row>

        <Alert type="error" :message="error" dismissable class="mt-6" />

        <div
          class="d-flex justify-space-between flex-wrap mt-4"
          style="gap: 0.5rem 1rem"
        >
          <v-btn plain @click="$emit('exitDialog')"> Cancel </v-btn>

          <v-btn
            color="primary"
            type="submit"
            :disabled="!valid || loadError || loading || loadLoading"
            :loading="loading"
          >
            <v-icon left dark>{{
              addMode ? plusIcon : contentSaveIcon
            }}</v-icon>
            {{ addMode ? "Add risk" : "Save" }}
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script>
import Alert from "../../../components/Alert.vue";
import { mdiArrowLeft, mdiClose, mdiPlus, mdiContentSave } from "@mdi/js";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      arrowLeftIcon: mdiArrowLeft,
      closeIcon: mdiClose,
      plusIcon: mdiPlus,
      contentSaveIcon: mdiContentSave,

      // Preexisting data
      addMode: this.$route.params.dialogRoute === "create",
      loadLoading: false,
      loadError: null,

      // Form
      valid: null,
      loading: false,
      error: null,

      category: null,
      hazard: null,
      risk: null,
      controls: null,
      responsibility: null,
      likelihood: null,
      consequence: null,
      acceptable: null,

      // Risk definitions
      categories: [
        "Behaviour",
        "Environment",
        "Equipment",
        "Fire",
        "People",
        "Sickness/Medical",
        "Theft",
        "Water",
      ],

      likelihoods: {
        "Almost certain": {
          description:
            "Expected to occur at least once during the task or activity.",
          level: 5,
        },
        "Highly likely": {
          description: "Could occur during the task or activity.",
          level: 4,
        },
        Likely: {
          description:
            "It’s conceivable it could occur, but only expected infrequently.",
          level: 3,
        },
        Unlikely: {
          description:
            "It’s conceivable that this could happen, although only in unusual circumstances.",
          level: 2,
        },
        Remote: {
          description: "It’s not conceivable that this could occur.",
          level: 1,
        },
      },

      consequences: {
        Catastrophic: {
          description:
            "One or more fatalities. Post-traumatic stress disorder. Long term counselling / therapy is likely to be required. Loss of facilities or equipment. Significant and widespread environmental, financial, reputational or operational impact.",
          level: 5,
        },
        Major: {
          description:
            "Serious injury or illness to one or more people, resulting in permanent disability. Therapy or counselling by a professional may be required. Sustained or extensive damage to facilities or equipment. Extensive environmental, financial, reputational or operational impact.",
          level: 4,
        },
        Serious: {
          description:
            "Injury or illness that requires hospitalisation (with no permanent disability). Very distressed. Requires on-site counselling or support. Does not want to participate in activities. Damage to facilities or equipment resulting in temporary inability to use it. Localised environmental, financial, reputational, or operational impact.",
          level: 3,
        },
        Minor: {
          description:
            "Injury or illness requiring only First Aid (No permanent disability). Stressed beyond comfort level. Wants to leave activity. Isolated and quickly repaired damage to facilities or equipment. Some environmental, financial, reputational, or operational impact.",
          level: 2,
        },
        Negligible: {
          description:
            "No injury or very minor injury or illness that does not require First Aid. Temporary stress or embarrassment. Minor or no damage to facilities or equipment. Little or no environmental, financial, reputational, or operational impact.",
          level: 1,
        },
      },

      riskLevels: {
        low: "The risk level is low. This means you can retain the risk but need to be vigilant that the risk level does not rise.",
        medium:
          "The risk level is medium. You need to make sure this is eliminated or minimised.",
        high: "The risk level is high. This is an unacceptable level of risk, and you should not carry out the activity with this risk.",
      },
    };
  },

  props: {
    dialog: Boolean,
  },

  mounted() {
    if (this.dialog && !this.addMode) {
      this.load();
    }
  },

  computed: {
    riskLevel() {
      if (this.likelihood && this.consequence) {
        const levelNumber =
          this.likelihoods[this.likelihood].level *
          this.consequences[this.consequence].level;

        if (levelNumber < 6) {
          return "low";
        } else if (levelNumber < 12) {
          return "medium";
        } else {
          return "high";
        }
      } else {
        return null;
      }
    },

    formData() {
      return {
        category: this.category,
        hazard: this.hazard,
        risk: this.risk,
        controls: this.controls,
        responsibility: this.responsibility,
        likelihood: this.likelihood,
        consequence: this.consequence,
        acceptable: this.acceptable,
      };
    },
  },

  methods: {
    load() {
      // Display activities
      this.loadError = null;
      this.loadLoading = true;

      this.$functions
        .httpsCallable("activityRAMSGet")({
          id: this.$route.params.activityId,
          riskId: this.$route.params.dialogRoute,
        })
        .then((data) => {
          // Success
          this.loadLoading = false;

          this.category = data.data.category;
          this.hazard = data.data.hazard;
          this.risk = data.data.risk;
          this.controls = data.data.controls;
          this.responsibility = data.data.responsibility;
          this.likelihood = data.data.likelihood;
          this.consequence = data.data.consequence;
          this.acceptable = data.data.acceptable;
        })
        .catch((error) => {
          // Error
          this.loadLoading = false;

          this.loadError =
            error.message === "internal"
              ? "An error occurred when connecting to the server."
              : error.message;
        });
    },

    updateRisk() {
      // Display people info
      this.loading = true;
      this.error = null;

      this.$functions
        .httpsCallable("activityRAMSUpdate")({
          id: this.$route.params.activityId,
          [this.addMode ? undefined : "riskId"]: this.$route.params.dialogRoute,
          ...this.formData,
        })
        .then((data) => {
          // Success
          this.loading = false;

          this.$emit("updateObject", "risks", {
            [data.data.id]: this.formData,
          });

          this.$emit("exitDialog");
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
  },
};
</script>
