<template>
  <ChildPage title="About" :breadcrumbItems="breadcrumbItems">
    <v-container fluid class="pa-4">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4">About</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="10" lg="8" xl="6">
          <p class="mb-2">
            I developed Activity Management System to be a solution to the
            paperwork problems my Venturer Unit was experiencing. While you can
            teach people how to perfectly prepare and file paperwork for events
            and programme nights, collaborating and providing feedback on
            paperwork is always a clunky affair involing lots of emails,
            document versions, and sometimes miscommunication. AMS was designed
            to solve this issue, as a central system to help ensure paperwork is
            done correctly and on time.
          </p>

          <p class="mb-2">I hope that you find AMS as useful as we have.</p>

          <p class="mb-2">
            Thank you to Beach Haven Scout Group for their advice on RAMS forms.
          </p>

          <v-btn
            dark
            color="black"
            target="_blank"
            href="https://github.com/matthewaptaylor"
          >
            <v-icon left dark>{{ githubIcon }}</v-icon>
            Follow me on GitHub
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </ChildPage>
</template>

<script>
import { mdiGithub } from "@mdi/js";
import ChildPage from "../../components/app/ChildPage.vue";

export default {
  components: {
    ChildPage,
  },

  data() {
    return {
      // Icons
      githubIcon: mdiGithub,

      breadcrumbItems: [
        {
          text: "Activity Planner",
          to: { name: "ActivityPlanner" },
        },
        {
          text: "About",
          disabled: true,
        },
      ],
    };
  },
};
</script>
