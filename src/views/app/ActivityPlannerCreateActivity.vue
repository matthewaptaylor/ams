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
          .httpsCallable("activityPlannerCreateActivity")({ name: this.name })
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
