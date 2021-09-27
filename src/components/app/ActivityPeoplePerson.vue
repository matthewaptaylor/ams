<template>
  <v-list-item
    class="flex-wrap my-n3 px-0 px-sm-4"
    :class="{
      'mb-n4': $vuetify.breakpoint.name === 'xs',
    }"
  >
    <v-list-item-avatar>
      <img
        :src="photoURL"
        alt="User picture"
        v-if="photoURL"
        style="width: 40px; border-radius: 50%"
      />

      <avatar
        :username="displayName ? displayName : email"
        :size="40"
        backgroundColor="var(--v-primary-darken1)"
        color="#ffffff"
        v-else
      ></avatar>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{
        (uid ? (displayName ? displayName : email) : "No AMS Account") +
        (email === $currentUser.email ? " (You)" : "")
      }}</v-list-item-title>

      <v-list-item-subtitle v-text="email"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action
      :style="{
        'flex-basis': $vuetify.breakpoint.name === 'xs' ? '100%' : null,
      }"
      class="d-flex flex-row align-self-center justify-start"
      :class="{
        'mb-n16': $vuetify.breakpoint.name === 'xs',
        'mt-n8': $vuetify.breakpoint.name === 'xs',
        'ml-14': $vuetify.breakpoint.name === 'xs',
      }"
    >
      <v-select
        :items="activityRoles"
        label="Role"
        v-model="role"
        solo
        dense
        single-line
        persistent-hint
        style="max-width: 8.75rem"
        :menu-props="{ bottom: true, offsetY: true }"
        hide-details="auto"
        @change="changeRole"
      >
      </v-select>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            class="ml-2"
            @click="remove"
            :disabled="role === 'Activity Leader'"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ deleteIcon }}</v-icon>
          </v-btn>
        </template>
        <span>Remove user</span>
      </v-tooltip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import Avatar from "vue-avatar";

export default {
  components: { Avatar },

  props: {
    uid: String,
    displayName: String,
    email: String,
    currentRole: String,
    photoURL: String,
    activityRoles: Array,
  },

  data() {
    return {
      // Icons
      deleteIcon: mdiDelete,

      role: this.currentRole,
    };
  },

  methods: {
    changeRole() {},
    remove() {},
  },
};
</script>
