<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="50rem">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-icon left dark>{{ plusIcon }}</v-icon>
          Add risk
        </v-btn>
      </template>

      <v-sheet elevation="2" rounded>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add risk</v-toolbar-title>
        </v-toolbar>

        <v-form
          v-model="valid"
          :disabled="loading"
          @submit.prevent="createActivity"
          class="pa-4"
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
              ></v-select>

              <p>{{ riskLevels[riskLevel] }}</p>

              <v-checkbox label="Risk is acceptable"></v-checkbox>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between flex-wrap mt-4">
            <v-btn plain @click="dialog = false"> Cancel </v-btn>
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
  </div>
</template>

<script>
import { mdiPlus } from "@mdi/js";

export default {
  data() {
    return {
      plusIcon: mdiPlus,
      dialog: false,
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
