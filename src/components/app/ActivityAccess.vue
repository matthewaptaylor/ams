<template>
  <v-row dense>
    <v-col cols="12">
      The <strong>Activity Leader</strong> accepts responsibility for the
      running of the activity, and confirms this by signing an AIF when needed.
      If they are a youth member, the activity would count towards a "Lead" in
      the Award Scheme. People <strong>Assisting</strong> are typically people
      who are helping run the activity, under the Activity Leader's direction.
      <strong>Editors</strong> are generally people in a supervision role, such
      as a Group Leader, and <strong>Viewers</strong> are anyone who you want to
      be able to see the activity's paperwork, but not change it.
    </v-col>

    <v-col cols="12">
      <v-list two-line class="mt-2 py-0">
        <v-list-item
          v-for="account in people"
          :key="account.email"
          class="flex-wrap my-n3 px-0 px-sm-4"
          :class="{
            'mb-n4': $vuetify.breakpoint.name === 'xs',
          }"
        >
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              :class="{ 'error--text': removedPeople.includes(account.email) }"
              >{{
                account.name +
                (account.email === $currentUser.email ? " (You)" : "") +
                (removedPeople.includes(account.email) ? " (removed)" : "")
              }}</v-list-item-title
            >

            <v-list-item-subtitle v-text="account.email"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action
            :style="{
              'flex-basis': $vuetify.breakpoint.name === 'xs' ? '100%' : null,
            }"
            class="d-flex flex-row align-self-center"
            :class="{
              'mb-n16': $vuetify.breakpoint.name === 'xs',
              'mt-n8': $vuetify.breakpoint.name === 'xs',
              'ml-14': $vuetify.breakpoint.name === 'xs',
            }"
          >
            <v-select
              :items="activityRoles"
              label="Role"
              v-model="account.role"
              solo
              dense
              single-line
              persistent-hint
              style="max-width: 8.75rem"
              :menu-props="{ bottom: true, offsetY: true }"
              hide-details="auto"
              @change="changedRole(account)"
              :disabled="
                removedPeople.includes(account.email) ||
                account.role === 'Activity Leader'
              "
            >
            </v-select>

            <v-tooltip bottom v-if="!removedPeople.includes(account.email)">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="ml-2"
                  @click="
                    () => {
                      removedPeople.push(account.email);
                    }
                  "
                  :disabled="account.role === 'Activity Leader'"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>{{ deleteIcon }}</v-icon>
                </v-btn>
              </template>
              <span>remove</span>
            </v-tooltip>

            <v-tooltip bottom v-if="removedPeople.includes(account.email)">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="ml-2"
                  @click="
                    () => {
                      removedPeople = removedPeople.filter(
                        (email) => email !== account.email
                      );
                    }
                  "
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>{{ plusIcon }}</v-icon>
                </v-btn>
              </template>
              <span>Undo remove</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>

        <v-sheet outlined rounded class="mt-4 pa-4 pt-1">
          <v-form
            v-model="addPersonValid"
            @submit.prevent="addPerson"
            ref="addPersonForm"
          >
            <v-list-item
              class="flex-column mt-1 mb-3 mb-sm-n1 px-0 flex-sm-row"
            >
              <v-list-item-content
                class="align-self-baseline"
                style="width: 100%"
              >
                <v-text-field
                  v-model="addPersonEmail"
                  outlined
                  dense
                  label="Add person"
                  placeholder="Email"
                  type="email"
                  hide-details="auto"
                  :rules="[
                    (v) => !!v || 'Email is required',
                    (v) => /.+@.+/.test(v) || 'Email must be valid',
                  ]"
                  required
                ></v-text-field>
              </v-list-item-content>

              <v-list-item-action
                class="text-left mt-0 mb-0 ml-0 ml-sm-4 align-self-baseline"
                :class="{
                  'mb-n16': $vuetify.breakpoint.name === 'xs',
                }"
                :style="{
                  width: $vuetify.breakpoint.name === 'xs' ? '100%' : '8.75rem',
                }"
              >
                <v-select
                  :items="activityRoles"
                  label="Role"
                  v-model="addPersonRole"
                  solo
                  dense
                  single-line
                  :menu-props="{ bottom: true, offsetY: true }"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Role is required']"
                  required
                  class="v-select"
                  style="width: 100%"
                >
                </v-select>
              </v-list-item-action>
            </v-list-item>

            <Alert
              dismissable
              type="error"
              :message="addPersonError"
              class="mb-2"
            />

            <div class="d-flex">
              <v-spacer />

              <v-btn
                plain
                color="primary"
                type="submit"
                :disabled="!addPersonValid || !addPersonRole"
                :style="{
                  width: $vuetify.breakpoint.name === 'xs' ? '100%' : '8.75rem',
                }"
              >
                <v-icon left dark>{{ plusIcon }}</v-icon>
                Add person
              </v-btn>
            </div>
          </v-form>
        </v-sheet>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mdiDelete, mdiPlus } from "@mdi/js";
import Alert from "../Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      deleteIcon: mdiDelete,
      plusIcon: mdiPlus,

      // People
      activityRoles: ["Activity Leader", "Assisting", "Editor", "Viewer"],
      people: [
        {
          name: this.$currentUser.displayName,
          email: this.$currentUser.email,
          role: "Activity Leader",
        },
      ], // Array of people objects, start off with current user
      modifiedPeople: [], // Emails of existing entries in people array with modified roles
      newPeople: [], // Emails of new entries to people array
      removedPeople: [],

      // Add person
      addPersonValid: null,
      addPersonEmail: null,
      addPersonRole: null,
      addPersonError: null,
    };
  },

  methods: {
    addPerson() {
      this.addPersonError = null;

      if (this.people.some((person) => person.email === this.addPersonEmail)) {
        // Person is already entered
        this.addPersonError = "This person has already been added.";
      } else {
        if (this.addPersonRole === "Activity Leader") {
          // New activity leader, remove old one
          const leaderIndex = this.people.findIndex(
            (person) => person.role === "Activity Leader"
          );

          this.people[leaderIndex].role = "Editor";
        }

        // Add person
        this.people.push({
          name: this.addPersonEmail,
          email: this.addPersonEmail,
          role: this.addPersonRole,
        });

        this.newPeople.push(this.addPersonEmail);

        this.$refs.addPersonForm.reset();
        this.$refs.addPersonForm.resetValidation();
      }
    },

    changedRole(account) {
      if (account.role === "Activity Leader") {
        // New activity leader, remove old one
        const leaderIndex = this.people.findIndex(
          (person) =>
            person.role === "Activity Leader" && person.email !== account.email
        );

        this.people[leaderIndex].role = "Editor";
      }

      if (!this.people.some((person) => person.role === "Activity Leader")) {
        // Currently no Activity LEader, make this person it
        const accountIndex = this.people.findIndex(
          (person) => person.email === account.email
        );

        this.$nextTick(() => {
          this.people[accountIndex].role = "Activity Leader";
        });
      } else {
        this.modifiedPeople.push(account.email);
      }
    },
  },
};
</script>
