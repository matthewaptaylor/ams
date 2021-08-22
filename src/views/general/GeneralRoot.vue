<template>
  <div id="sign-in-root">
    <v-main class="fill-height">
      <v-container class="fill-height align-content-center justify-center">
        <div style="width: 100%; max-width: 25rem">
          <router-link
            to="/"
            class="d-block mx-auto mb-4 pa-4 text-decoration-none text-center"
          >
            <img
              src="@/assets/images/logo.svg"
              alt="Scouts Aotearoa logo"
              class="d-block mx-auto pa-2"
              style="height: 4rem; max-width: 100%"
              draggable="false"
            />
            <span class="white--text" style="font-size: 1.25rem">
              Activity Management System
            </span>
          </router-link>
          <v-sheet elevation="2" rounded>
            <router-view></router-view>
          </v-sheet>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
#sign-in-root {
  min-height: 100%;
  background-image: url("../../assets/images/background.svg");
  background-color: var(--v-primary-base);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
