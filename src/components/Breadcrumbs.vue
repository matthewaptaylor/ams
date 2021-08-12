<template>
  <div
    class="d-flex flex-row align-center pt-0 pb-3"
    style="gap: 0.5rem; min-height: 2rem"
  >
    <v-btn
      icon
      plain
      v-if="computedItems.length > 1"
      :to="computedItems[computedItems.length - 2].to"
      class="my-n2 ms-n2"
    >
      <v-icon>{{ arrowLeftIcon }}</v-icon>
    </v-btn>

    <v-breadcrumbs :items="computedItems" class="pa-0">
      <template v-slot:divider>
        <v-icon>{{ chevronRightIcon }}</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<style scoped></style>
<script>
import { mdiArrowLeft, mdiChevronRight } from "@mdi/js";

export default {
  data() {
    return {
      arrowLeftIcon: mdiArrowLeft,
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
