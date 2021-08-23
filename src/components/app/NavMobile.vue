<template>
  <v-sheet elevation="2">
    <v-chip-group mandatory color="primary">
      <v-chip
        v-for="(item, index) in items"
        :to="item.to"
        :key="item.title"
        :class="{ 'ms-2': index === 0 }"
      >
        {{ item.title }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
</template>
<style scoped></style>
<script>
export default {
  props: {
    items: Array,
  },
};
</script>
