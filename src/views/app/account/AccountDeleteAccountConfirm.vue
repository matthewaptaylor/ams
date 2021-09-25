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
        color="error"
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

        <v-toolbar-title class="pl-md-0">Delete Account</v-toolbar-title>

        <v-spacer />

        <v-btn icon @click="$emit('exitDialog')" class="d-none d-md-block">
          <v-icon>{{ closeIcon }}</v-icon>
        </v-btn>
      </v-toolbar>

      <div
        class="pa-4"
        style="overflow: auto"
        :style="{
          height: $vuetify.breakpoint.mobile ? 'calc(100vh - 48px)' : null,
          'max-height': !$vuetify.breakpoint.mobile
            ? 'calc(100vh - 144px)'
            : null,
        }"
      >
        <p class="mb-0">
          This action can't be undone! Are you sure that you want to continue?
        </p>

        <Alert
          dismissable
          type="error"
          :message="error"
          :link="errorLink"
          class="mt-2"
        />

        <div
          class="d-flex justify-space-between flex-wrap mt-4"
          style="gap: 0.5rem 1rem"
        >
          <v-btn plain @click="$emit('exitDialog')"> Cancel </v-btn>

          <v-btn
            color="error"
            type="submit"
            :loading="loading"
            :disabled="loading"
            @click="deleteAccount"
          >
            <v-icon left dark>{{ deleteIcon }}</v-icon>
            Delete account
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { mdiArrowLeft, mdiClose, mdiDelete } from "@mdi/js";
import Alert from "../../../components/Alert.vue";

export default {
  components: { Alert },

  data() {
    return {
      // Icons
      arrowLeftIcon: mdiArrowLeft,
      closeIcon: mdiClose,
      deleteIcon: mdiDelete,

      // Form
      loading: false,
      error: null,
      errorLink: null,
    };
  },

  props: {
    dialog: Boolean,
  },

  methods: {
    deleteAccount() {
      this.loading = true;

      this.$currentUser
        .delete()
        .then(() => {
          // User deleted
          this.loading = false;
        })
        .catch((error) => {
          // An error occurred
          this.loading = false;

          if (error.code === "auth/requires-recent-login") {
            // User needs to reauthenticate

            this.error =
              "We need to confirm your identity before you do this. Please reauthenticate and try again.";
            this.errorLink = {
              text: "Reauthenticate",
              link: { name: "GeneralReauthenticate" },
            };
          } else {
            // Show error message as normal
            this.error = error.message;
          }
        });
    },
  },
};
</script>
