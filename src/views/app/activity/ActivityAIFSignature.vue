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
          v-text="this.role ? `${this.role} Signature` : 'Signature'"
        />

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
        <p>I, {{ $currentUser.displayName }}, {{ agreement }}</p>

        <v-sheet
          outlined
          class="mx-auto"
          style="width: 500px; max-width: 100%; overflow: none"
        >
          <VueSignaturePad
            width="500px"
            height="100px"
            ref="signaturePad"
            :options="{ onBegin }"
            style="max-width: 100%"
          ></VueSignaturePad>

          <div
            class="border-top mx-2 mb-2 pt-2 d-flex align-center"
            style="gap: 1rem; border-top: thin solid rgba(0, 0, 0, 0.12)"
          >
            <p class="flex-grow-1 mb-0">
              Use your mouse or touch screen to sign above.
            </p>

            <v-btn @click="clear" outlined color="error" :disabled="empty">
              Clear
            </v-btn>
          </div>
        </v-sheet>

        <Alert type="error" :message="error" dismissable class="mt-6" />

        <div
          class="d-flex justify-space-between flex-wrap mt-4"
          style="gap: 0.5rem 1rem"
        >
          <v-btn plain @click="$emit('exitDialog')"> Cancel </v-btn>

          <v-btn
            color="primary"
            type="submit"
            :disabled="loading || empty"
            :loading="loading"
            @click="save"
          >
            <v-icon left dark>{{ contentSaveIcon }}</v-icon>
            Save
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
import Alert from "../../../components/Alert.vue";
import { mdiArrowLeft, mdiClose, mdiContentSave } from "@mdi/js";
import VueSignaturePad from "vue-signature-pad";

export default {
  components: { Alert, VueSignaturePad },

  data() {
    return {
      // Icons
      arrowLeftIcon: mdiArrowLeft,
      closeIcon: mdiClose,
      contentSaveIcon: mdiContentSave,

      role: null,
      agreement: null,

      error: null,
      loading: false,

      // Signature pad
      empty: true,
    };
  },

  props: {
    dialog: Boolean,
  },

  mounted() {
    if (this.dialog) {
      switch (this.$route.params.dialogRoute) {
        case "activityleadersignature":
          this.role = "Activity Leader";
          this.agreement =
            "accept responsibility for this activity as Activity Leader.";
          break;
        case "sectionleadersignature":
          this.role = "Section Leader";
          this.agreement = "approve this activity as Section Leader.";
          break;
        case "groupleadersignature":
          this.role = "Group Leader";
          this.agreement = "approve this activity as Group Leader.";
          break;
        default:
          this.$emit("exitDialog");
      }

      // Bug regarding canvas width being set to 0
      this.$nextTick(() => {
        this.$refs.signaturePad.resizeCanvas();
      });
    }
  },

  methods: {
    clear() {
      this.empty = true;
      this.$refs.signaturePad.clearSignature();
    },

    save() {
      this.error = null;
      this.loading = true;

      // Encode data into smaller array
      const currentTime = new Date().getTime();

      const data = this.$refs.signaturePad.toData();
      const encodedData = data.map((line) =>
        Object.fromEntries(
          line.points.map((point, index) => [
            index,
            [
              point.time - currentTime,
              Math.round(point.x),
              Math.round(point.y),
            ],
          ])
        )
      );

      this.$functions
        .httpsCallable("activitySignatureSet")({
          id: this.$route.params.activityId,
          role: this.role,
          signature: encodedData,
        })
        .then(() => {
          // Success
          this.loading = false;

          this.$emit("update", `signatures.${this.role}`, {
            name: this.$currentUser.displayName,
            email: this.$currentUser.email,
            date: new Date().toISOString().slice(0, 10),
            uid: this.$currentUser.uid,
            signature: encodedData,
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

    onBegin() {
      this.empty = false;
    },
  },
};
</script>
