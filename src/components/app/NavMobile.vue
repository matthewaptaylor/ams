<template>
  <v-sheet elevation="2" rounded class="mb-4 pa-4">
    <h6 class="text-h6" style="line-height: 1.2">{{ title }}</h6>
    <v-chip-group mandatory color="primary">
      <v-chip v-for="item in items" :to="item.to" :key="item.title">
        {{ item.title }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
</template>
<style scoped></style>
<script>
export default {
  props: {
    title: String,
    items: Array,
  },
};
</script>
