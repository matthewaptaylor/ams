<template>
  <v-sheet
    elevation="2"
    rounded
    style="
      position: sticky;
      top: 74px;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
      transition: min-width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    "
    :style="{
      minWidth: lockNav || navOpen ? '14rem' : '56px',
    }"
  >
    <v-navigation-drawer
      floating
      permanent
      class="rounded"
      :expand-on-hover="!lockNav"
      @mouseover.native="navOpen = true"
      @mouseleave.native="navOpen = false"
    >
      <v-list-item>
        <v-list-item-content style="height: 60px">
          <v-list-item-title class="text-h6">
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>

        <transition name="fade-transition">
          <v-list-item-action v-if="lockNav || navOpen">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="setLockNav(!lockNav)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>{{ lockNav ? lockOffIcon : lockIcon }}</v-icon>
                </v-btn>
              </template>

              <span>{{ lockNav ? "Unlock" : "Lock" }} navigation</span>
            </v-tooltip>
          </v-list-item-action>
        </transition>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item-group color="primary">
          <template v-if="loading">
            <div v-for="i in 2" :key="i">
              <v-skeleton-loader
                style="height: 40px"
                class="mb-1"
                type="image"
              ></v-skeleton-loader>
            </div>
          </template>

          <v-list-item
            v-for="item in items"
            :to="item.to"
            :key="item.title"
            link
            v-else
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

<script>
import { mdiLock, mdiLockOff } from "@mdi/js";

export default {
  props: {
    title: String,
    items: Array,
    loading: Boolean,
  },

  data() {
    return {
      // Icons
      lockIcon: mdiLock,
      lockOffIcon: mdiLockOff,

      lockNav:
        localStorage.getItem("lockNav") === null
          ? true
          : localStorage.getItem("lockNav") === "true",
      navOpen: false,
    };
  },

  methods: {
    setLockNav(v) {
      localStorage.setItem("lockNav", v ? "true" : "false");
      this.lockNav = v;
    },
  },
};
</script>
