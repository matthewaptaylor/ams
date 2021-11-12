<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Plan</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <Editor />
          </v-col>

          <v-col cols="12" class="mt-2">
            <v-btn
              color="primary"
              :disabled="loading"
              :loading="loading"
              @click="save"
            >
              <v-icon left dark>{{ contentSaveIcon }}</v-icon>
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiContentSave } from "@mdi/js";
import Editor from "../../../components/inputs/Editor.vue";

export default {
  components: { Editor },
  data() {
    return {
      contentSaveIcon: mdiContentSave,
      loading: false,
    };
  },
  methods: {
    save() {},
  },
};
</script>
