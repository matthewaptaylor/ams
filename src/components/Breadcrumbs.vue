<template>
  <v-breadcrumbs :items="items" class="pt-0 pb-3">
    <template v-slot:divider>
      <v-icon>{{ chevronRightIcon }}</v-icon>
    </template>
  </v-breadcrumbs>
</template>
<style scoped></style>
<script>
import { mdiChevronRight } from "@mdi/js";

export default {
  data() {
    return {
      chevronRightIcon: mdiChevronRight,
    };
  },
  props: {
    items: Array,
  },
};
</script>
