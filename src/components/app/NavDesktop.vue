<template>
  <v-sheet elevation="2" rounded style="width: 14rem">
    <v-navigation-drawer floating permanent class="rounded">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="subtitle">
            {{ subtitle }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in items"
            :to="item.to"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>
<style scoped></style>
<script>
export default {
  props: {
    title: String,
    subtitle: String,
    items: Array,
  },
};
</script>
