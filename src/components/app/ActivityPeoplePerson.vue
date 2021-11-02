<template>
  <div>
    <v-list-item
      class="flex-wrap my-n3 px-0 px-sm-4"
      :class="{
        'mb-n4': $vuetify.breakpoint.name === 'xs',
      }"
    >
      <v-list-item-avatar>
        <img
          :src="photoURL"
          alt="User picture"
          v-if="photoURL"
          style="width: 40px; border-radius: 50%"
        />

        <avatar
          :username="displayName ? displayName : email"
          :size="40"
          backgroundColor="var(--v-primary-darken1)"
          color="#ffffff"
          v-else
        ></avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{
          (uid ? (displayName ? displayName : email) : "No AMS Account") +
          (email === $currentUser.email ? " (You)" : "")
        }}</v-list-item-title>

        <v-list-item-subtitle v-text="email"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action
        :style="{
          'flex-basis': $vuetify.breakpoint.name === 'xs' ? '100%' : null,
        }"
        class="d-flex flex-row align-self-center justify-start"
        :class="{
          'mb-n16': $vuetify.breakpoint.name === 'xs',
          'mt-n8': $vuetify.breakpoint.name === 'xs',
          'ml-14': $vuetify.breakpoint.name === 'xs',
        }"
      >
        <v-select
          :items="activityRoles"
          label="Role"
          v-model="role"
          solo
          dense
          single-line
          persistent-hint
          style="max-width: 8.75rem"
          :menu-props="{ bottom: true, offsetY: true }"
          :loading="roleLoading"
          hide-details="auto"
          @change="updatePerson(false)"
        >
        </v-select>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              class="ml-2"
              @click="showRemove = true"
              :disabled="showRemove"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ deleteIcon }}</v-icon>
            </v-btn>
          </template>

          <span>Remove user</span>
        </v-tooltip>
      </v-list-item-action>
    </v-list-item>

    <v-sheet
      color="error"
      dark
      elevation="2"
      rounded
      class="pa-4 mb-2"
      :class="{
        'mt-2': $vuetify.breakpoint.name !== 'xs',
      }"
      v-if="showRemove"
    >
      <p>Are you sure you want to remove this person?</p>

      <div class="d-flex flex-wrap" style="gap: 0.5rem 1rem; width: 100%">
        <v-btn
          outlined
          @click="updatePerson(true)"
          :loading="removeLoading"
          :disabled="removeLoading"
        >
          Delete
        </v-btn>

        <v-btn plain @click="showRemove = false">Cancel</v-btn>
      </div>
    </v-sheet>

    <Alert
      dismissable
      type="error"
      :message="error"
      class="mb-2"
      :class="{
        'mt-2': $vuetify.breakpoint.name !== 'xs',
      }"
    />
  </div>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import Alert from "../Alert.vue";
import Avatar from "vue-avatar";

export default {
  components: { Alert, Avatar },

  props: {
    uid: String,
    displayName: String,
    email: String,
    currentRole: String,
    photoURL: String,
    activityRoles: Array,
  },

  data() {
    return {
      // Icons
      deleteIcon: mdiDelete,

      // Submission
      error: null,
      removeLoading: false,
      roleLoading: false,

      role: this.currentRole,

      // Remove confirmation
      showRemove: false,
    };
  },

  watch: {
    currentRole(v) {
      this.role = v;
    },
  },

  methods: {
    updatePerson(remove) {
      // Display people info
      this.error = null;
      this[remove ? "removeLoading" : "roleLoading"] = true;

      this.$functions
        .httpsCallable("activityPeopleUpdate")({
          id: this.$route.params.activityId,
          email: this.email,
          role: remove ? undefined : this.role, // Removing the person's role removes them
        })
        .then((data) => {
          // Success
          this[remove ? "removeLoading" : "roleLoading"] = false;
          this.showRemove = false;

          // Update list of people
          if ("peopleByUID" in data.data) {
            this.$emit("updateObject", "peopleByUID", data.data.peopleByUID);
          } else {
            this.$emit(
              "updateObject",
              "peopleByEmail",
              data.data.peopleByEmail
            );
          }
        })
        .catch((error) => {
          // Error
          this[remove ? "removeLoading" : "roleLoading"] = false;
          this.showRemove = false;

          // Reset role
          this.role = this.currentRole;

          this.error =
            error.message === "internal"
              ? "An error occurred when connecting to the server."
              : error.message;
        });
    },
  },
};
</script>
