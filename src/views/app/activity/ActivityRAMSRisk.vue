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

        <v-toolbar-title class="pl-md-0">Add Risk</v-toolbar-title>

        <v-spacer />

        <v-btn icon @click="$emit('exitDialog')" class="d-none d-md-block">
          <v-icon>{{ closeIcon }}</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form
        v-model="valid"
        @submit.prevent="createActivity"
        class="pa-4"
        style="overflow: auto"
        :style="{
          height: $vuetify.breakpoint.mobile ? 'calc(100vh - 48px)' : null,
          'max-height': !$vuetify.breakpoint.mobile
            ? 'calc(100vh - 144px)'
            : null,
        }"
      >
        <v-row>
          <v-col cols="12" sm="6" md="8" class="pb-0 pb-sm-3">
            <v-row>
              <v-col cols="12" md="6" class="pb-0 pb-md-1">
                <v-select :items="categories" label="Category"></v-select>

                <v-textarea
                  label="Hazard"
                  rows="2"
                  hint="What causes this risk?"
                  persistent-hint
                ></v-textarea>

                <v-textarea
                  label="Risk"
                  rows="2"
                  hint="What could happen?"
                  persistent-hint
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6" class="pt-0 pt-md-1">
                <v-textarea
                  label="Controls"
                  rows="2"
                  hint="How will you remove, minimise, or isolate the risk?"
                  persistent-hint
                ></v-textarea>

                <v-text-field
                  label="Responsibility"
                  hint="Who is responsible for managing this risk?"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" md="4" class="pt-0 pt-sm-3">
            <v-select
              v-model="likelihood"
              :items="likelihoods"
              item-text="text"
              label="Likelihood"
              persistent-hint
              return-object
              :hint="likelihood !== null ? likelihood.description : ''"
            ></v-select>

            <v-select
              v-model="consequence"
              :items="consequences"
              item-text="text"
              label="Consequence"
              persistent-hint
              return-object
              :hint="consequence !== null ? consequence.description : ''"
              class="mb-2"
            ></v-select>

            <p class="mb-0">{{ riskLevels[riskLevel] }}</p>

            <v-checkbox label="Risk is acceptable" class="mt-2"></v-checkbox>
          </v-col>
        </v-row>
        <div
          class="d-flex justify-space-between flex-wrap mt-4"
          style="gap: 0.5rem 1rem"
        >
          <v-btn plain @click="$emit('exitDialog')"> Cancel </v-btn>

          <v-btn
            color="primary"
            type="submit"
            :disabled="!valid || loading"
            :loading="loading"
          >
            <v-icon left dark>{{ plusIcon }}</v-icon>
            Add risk
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { mdiArrowLeft, mdiClose, mdiPlus } from "@mdi/js";

export default {
  data() {
    return {
      // Icons
      arrowLeftIcon: mdiArrowLeft,
      closeIcon: mdiClose,
      plusIcon: mdiPlus,

      valid: false,
      loading: false,
      categories: ["People", "Environment", "Equipment"],
      likelihood: null,
      likelihoods: [
        {
          text: "Almost certain",
          description:
            "Expected to occur at least once during the task or activity.",
          level: 5,
        },
        {
          text: "Highly likely",
          description: "Could occur during the task or activity.",
          level: 4,
        },
        {
          text: "Likely",
          description:
            "It’s conceivable it could occur, but only expected infrequently.",
          level: 3,
        },
        {
          text: "Unlikely",
          description:
            "It’s conceivable that this could happen, although only in unusual circumstances.",
          level: 2,
        },
        {
          text: "Remote",
          description: "It’s not conceivable that this could occur",
          level: 1,
        },
      ],
      consequence: null,
      consequences: [
        {
          text: "Catastrophic",
          description:
            "One or more fatalities. Post-traumatic stress disorder. Long term counselling / therapy is likely to be required. Loss of facilities or equipment. Significant and widespread environmental, financial, reputational or operational impact.",
          level: 5,
        },
        {
          text: "Major",
          description:
            "Serious injury or illness to one or more people, resulting in permanent disability. Therapy or counselling by a professional may be required. Sustained or extensive damage to facilities or equipment. Extensive environmental, financial, reputational or operational impact.",
          level: 4,
        },
        {
          text: "Serious",
          description:
            "Injury or illness that requires hospitalisation (with no permanent disability). Very distressed. Requires on-site counselling or support. Does not want to participate in activities. Damage to facilities or equipment resulting in temporary inability to use it. Localised environmental, financial, reputational, or operational impact.",
          level: 3,
        },
        {
          text: "Minor",
          description:
            "Injury or illness requiring only First Aid (No permanent disability). Stressed beyond comfort level. Wants to leave activity. Isolated and quickly repaired damage to facilities or equipment. Some environmental, financial, reputational, or operational impact.",
          level: 2,
        },
        {
          text: "Negligible",
          description:
            "No injury or very minor injury or illness that does not require First Aid. Temporary stress or embarrassment. Minor or no damage to facilities or equipment. Little or no environmental, financial, reputational, or operational impact.",
          level: 1,
        },
      ],
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

  methods: {
    createActivity() {
      this.loading = true;
    },
  },

  computed: {
    riskLevel() {
      if (this.likelihood && this.consequence) {
        const levelNumber = this.likelihood.level * this.consequence.level;

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
  },
};
</script>
