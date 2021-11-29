<template>
  <v-sheet outlined rounded class="mt-4 pa-4 pt-1">
    <v-form v-model="valid" @submit.prevent="addPerson" ref="form">
      <v-list-item class="flex-column mt-1 mb-3 mb-sm-n1 px-0 flex-sm-row">
        <v-list-item-content class="align-self-baseline" style="width: 100%">
          <v-text-field
            v-model="email"
            outlined
            dense
            label="Email"
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
            v-model="role"
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

      <Alert dismissable type="error" :message="error" class="mb-2" />

      <v-btn
        plain
        color="primary"
        type="submit"
        :loading="loading"
        :disabled="!valid || !role || loading"
        style="width: 100%"
      >
        <v-icon left dark>{{ plusIcon }}</v-icon>
        Add person
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import Alert from "../Alert.vue";

export default {
  components: { Alert },

  props: {
    activityRoles: Array,
  },

  data() {
    return {
      // Icons
      plusIcon: mdiPlus,

      // Form
      loading: false,
      error: null,
      valid: null,

      // Values
      email: "",
      role: "Editor",
    };
  },

  methods: {
    addPerson() {
      // Display people info
      this.error = null;
      this.loading = true;

      // Record fact that we're saving in case of user navigation
      const randomId = Math.random().toString(36);
      this.$updateSaveProcess("start", randomId);

      this.$functions
        .httpsCallable("activityPeopleUpdate")({
          id: this.$route.params.activityId,
          email: this.email,
          role: this.role,
        })
        .then((data) => {
          // Success
          this.loading = false;
          this.$updateSaveProcess("end", randomId);

          // Reset
          this.email = "";
          this.role = "Editor";
          this.$refs.form.resetValidation();

          // Update user info
          this.$emit("updateObject", "infoByUID", data.data.infoByUID);

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
          this.loading = false;
          this.$updateSaveProcess("end", randomId);

          this.error =
            error.message === "internal"
              ? "An error occurred when connecting to the server."
              : error.message;
        });
    },
  },
};
</script>
