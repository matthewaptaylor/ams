<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">People</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-row dense>
          <v-col cols="12">
            The <strong>Activity Leader</strong> accepts responsibility for the
            running of the activity, and confirms this by signing an AIF when
            needed. If they are a youth member, the activity would count towards
            a "Lead" in the Award Scheme. People <strong>Assisting</strong> are
            typically people who are helping run the activity, under the
            Activity Leader's direction. <strong>Editors</strong> are generally
            people in a supervision role, such as a Group Leader, and
            <strong>Viewers</strong> are anyone who you want to be able to see
            the activity's paperwork, but not change it.
          </v-col>

          <v-col cols="12">
            <v-list two-line class="mt-2 py-0">
              <ActivityPeoplePerson
                v-for="(role, uid) in peopleByUid"
                :key="uid"
                :uid="uid"
                :displayName="infoByUid[uid].displayName"
                :email="infoByUid[uid].email"
                :currentRole="role"
                :photoURL="infoByUid[uid].photoURL"
                :activityRoles="activityRoles"
              />

              <ActivityPeoplePerson
                v-for="(role, email) in peopleByEmail"
                :key="email"
                :email="email"
                :currentRole="role"
                :activityRoles="activityRoles"
              />

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
                      class="
                        text-left
                        mt-0
                        mb-0
                        ml-0 ml-sm-4
                        align-self-baseline
                      "
                      :class="{
                        'mb-n16': $vuetify.breakpoint.name === 'xs',
                      }"
                      :style="{
                        width:
                          $vuetify.breakpoint.name === 'xs'
                            ? '100%'
                            : '8.75rem',
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

                  <v-btn
                    plain
                    color="primary"
                    type="submit"
                    :disabled="!addPersonValid || !addPersonRole"
                    style="width: 100%"
                  >
                    <v-icon left dark>{{ plusIcon }}</v-icon>
                    Add person
                  </v-btn>
                </v-form>
              </v-sheet>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import Alert from "../../../components/Alert.vue";
import ActivityPeoplePerson from "../../../components/app/ActivityPeoplePerson.vue";

export default {
  components: { Alert, ActivityPeoplePerson },

  data() {
    return {
      // Icons
      plusIcon: mdiPlus,

      activityRoles: ["Activity Leader", "Assisting", "Editor", "Viewer"],

      // People with accounts
      peopleByUid: { Uz0n2bElE0Pbryy3FEfnPPht0yQ8: "Activity Leader" },
      infoByUid: {
        Uz0n2bElE0Pbryy3FEfnPPht0yQ8: {
          displayName: "Mountain Orange",
          email: "mountain.orange.338@example.com",
          photoURL:
            "https://hobsonville.org.nz/wp-content/uploads/2020/09/blank-profile-picture-mystery-man-avatar-973460.jpg",
        },
      },

      // People without accounts
      peopleByEmail: { "test@test.com": "Editor" },

      // Add person
      addPersonValid: null,
      addPersonEmail: null,
      addPersonRole: "Viewer",
      addPersonError: null,
    };
  },

  methods: {
    addPerson() {},
  },
};
</script>
