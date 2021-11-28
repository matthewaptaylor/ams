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
            <p class="mb-0">
              The <strong>Activity Leader</strong> accepts responsibility for
              the running of the activity, and confirms this by signing an AIF
              when needed. If they are a youth member, the activity would count
              towards a "Lead" in the Award Scheme. People
              <strong>Assisting</strong> are typically people who are helping
              run the activity, under the Activity Leader's direction.
              <strong>Editors</strong> are generally people in a supervision
              role, such as a Section Group Leader (as they need to sign your
              AIF), and <strong>Viewers</strong> are anyone who you want to be
              able to see the activity's paperwork, but not change it.
            </p>
          </v-col>

          <v-col cols="12" v-if="error || loading">
            <Alert
              type="error"
              fullWidth
              :message="error"
              :action="{ text: 'Retry', callback: load }"
            />

            <div class="mt-2" v-if="loading">
              <v-skeleton-loader
                max-width="300"
                type="list-item-two-line"
                class="my-n3 mx-n4 mx-sm-0 px-sm-0"
                v-for="i in 2"
                :key="i"
              ></v-skeleton-loader>
            </div>
          </v-col>

          <v-col cols="12" v-else>
            <v-list two-line class="mt-2 py-0">
              <ActivityPeoplePerson
                v-for="(role, uid) in peopleByUID"
                :key="uid"
                :uid="uid"
                :displayName="infoByUID[uid].displayName"
                :email="infoByUID[uid].email"
                :currentRole="role"
                :photoURL="infoByUID[uid].photoURL"
                :activityRoles="activityRoles"
                :disabled="viewer"
                @updateObject="updateObject"
              />

              <ActivityPeoplePerson
                v-for="(role, email) in peopleByEmail"
                :key="email"
                :email="email"
                :currentRole="role"
                :activityRoles="activityRoles"
                :disabled="viewer"
                @updateObject="updateObject"
              />

              <ActivityPeopleAdd
                :activityRoles="activityRoles"
                @updateObject="updateObject"
                v-if="!viewer"
              />
            </v-list>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Paperwork Reminders</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" xl="6">
            <v-row dense>
              <v-col cols="12">
                <p class="mb-0">
                  This setting allows you to set automatic reminders about this
                  activity's paperwork via email.
                </p>
              </v-col>

              <v-col cols="12">
                <AutosaveText
                  label="Emails"
                  type="autocomplete"
                  :comboboxItems="allEmails"
                  :rules="[
                    (v) =>
                      v.every((item) => /.+@.+/.test(item)) ||
                      'All emails must be valid.',
                  ]"
                  :value="remindEmails"
                  :error="remindEmailsError"
                  :disabled="viewer"
                  :loading="loading"
                  chips
                  @save="(v) => update(v, 'remindEmails', 'remindEmailsError')"
                />
              </v-col>

              <v-col cols="12">
                <AutosaveCheckbox
                  label="Days Before Activity"
                  :options="['7', '14', '21', '28']"
                  :value="remindTimes"
                  :error="remindTimesError"
                  :disabled="viewer"
                  @save="(v) => update(v, 'remindTimes', 'remindTimesError')"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Alert from "../../../components/Alert.vue";
import ActivityPeoplePerson from "../../../components/app/ActivityPeoplePerson.vue";
import ActivityPeopleAdd from "../../../components/app/ActivityPeopleAdd.vue";
import AutosaveText from "../../../components/inputs/AutosaveText.vue";
import AutosaveCheckbox from "../../../components/inputs/AutosaveCheckbox.vue";

export default {
  components: {
    Alert,
    ActivityPeoplePerson,
    ActivityPeopleAdd,
    AutosaveText,
    AutosaveCheckbox,
  },

  props: {
    remindEmails: Array,
    remindTimes: Array,
    viewer: Boolean,
  },

  data() {
    return {
      // Data fetching
      loading: false,
      error: null,

      // People
      peopleByUID: null,
      infoByUID: null,
      peopleByEmail: null, // People without accounts

      activityRoles: ["Activity Leader", "Assisting", "Editor", "Viewer"],

      // Errors
      remindEmailsError: null,
      remindTimesError: null,
    };
  },

  mounted() {
    this.load();
  },

  computed: {
    allEmails() {
      return [
        ...Object.keys(this.peopleByEmail ? this.peopleByEmail : {}).map(
          (email) => email.replace(/&period;/g, ".")
        ),
        ...Object.keys(this.peopleByUID ? this.peopleByUID : {}).map(
          (uid) => this.infoByUID[uid].email
        ),
      ];
    },
  },

  methods: {
    load() {
      // Display people info
      this.error = null;
      this.loading = true;

      this.$functions
        .httpsCallable("activityPeopleGet")({
          id: this.$route.params.activityId,
        })
        .then((data) => {
          // Success
          this.loading = false;

          this.peopleByUID = data.data.peopleByUID;
          this.infoByUID = data.data.infoByUID;
          this.peopleByEmail = data.data.peopleByEmail;
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

    // Update activity overview
    update(v, fieldName, errorName) {
      // Display activities
      this[errorName] = null;

      this.$functions
        .httpsCallable("activityOverviewSet")({
          id: this.$route.params.activityId,
          [fieldName]: v,
        })
        .then(() => {
          // Success
          this.$emit("update", fieldName, v);
        })
        .catch((error) => {
          // Error
          this[errorName] = { message: error.message };
        });
    },

    // Person has been updated
    updateObject(fieldName, v) {
      // Update new roles
      this[fieldName] = { ...this[fieldName], ...v };

      // Update Activity Leader UID
      const UID = Object.entries(this.peopleByUID).find(
        (person) => person[1] == "Activity Leader"
      )?.[0];
      this.$emit("update", "activityLeaderUID", UID);

      // Remove nullish values from object
      Object.keys(v).forEach((key) => {
        if (this[fieldName][key] == null) delete this[fieldName][key];
      });
    },
  },
};
</script>
