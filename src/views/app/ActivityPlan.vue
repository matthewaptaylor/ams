<template>
  <v-sheet elevation="2" rounded class="flex-grow-1 pa-4">
    <h1>Plan</h1>
    <Editor class="mt-4" />

    <v-btn
      color="primary"
      :disabled="loading"
      :loading="loading"
      class="d-flex mt-4"
      @click="save"
    >
      <v-icon left dark>{{ contentSaveIcon }}</v-icon>
      Save
    </v-btn>
  </v-sheet>
</template>

<script>
import { mdiContentSave } from "@mdi/js";
import Editor from "../../components/app/Editor.vue";

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
