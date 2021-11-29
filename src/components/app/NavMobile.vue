<template>
  <v-sheet elevation="2">
    <v-chip-group mandatory :show-arrows="!mobile" color="primary">
      <template v-if="loading">
        <v-skeleton-loader
          style="margin: 4px 8px 4px 0"
          type="chip"
          v-for="i in 2"
          :key="i"
          :class="{ 'ms-2': i === 1 }"
        ></v-skeleton-loader>
      </template>

      <v-chip
        v-for="(item, index) in items"
        :to="item.to"
        replace
        :key="item.title"
        :class="{ 'ms-2': index === 0 }"
        v-else
      >
        {{ item.title }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
</template>

<script>
export default {
  props: {
    items: Array,
    loading: Boolean,
  },

  data() {
    return {
      mobile: navigator.userAgentData.mobile,
    };
  },
};
</script>
