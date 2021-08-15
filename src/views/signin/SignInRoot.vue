<template>
  <div id="sign-in-root">
    <v-main class="fill-height">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<style scoped>
#sign-in-root {
  min-height: 100%;
  background-image: url("../../assets/images/purple-background.svg");
  background-color: var(--v-primary-base);
  background-size: cover;
  background-position: center;
}
</style>
