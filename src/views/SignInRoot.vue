<template>
  <div id="sign-in-root">
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
#sign-in-root {
  min-height: 100vh;
  background-image: url("../assets/images/purple-background.svg");
  background-size: cover;
  background-position: center;
}
</style>

<script>
export default {};
</script>
