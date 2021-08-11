<template>
  <v-breadcrumbs :items="computedItems" class="pt-0 pb-3">
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
  computed: {
    computedItems() {
      let items = this.items.map((item) => ({
        ...item,
        exact: true,
        disabled: false,
      }));
      items[items.length - 1].disabled = true;
      return items;
    },
  },
};
</script>
