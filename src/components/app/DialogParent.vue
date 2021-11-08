<template>
  <div>
    <component
      :is="$route.meta.dialog"
      @exitDialog="exitDialog"
      :dialog="dialog"
      :key="key"
      @update="(fieldName, v) => $emit('update', fieldName, v)"
      @updateObject="updateObject"
    />

    <component
      :is="$route.meta.default"
      v-bind="$props"
      :dialog="dialog"
      @showDialog="showDialog"
      @update="(fieldName, v) => $emit('update', fieldName, v)"
      ref="page"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$route.matched[this.$route.matched.length - 1], // Current route is always the last item of the matched routes array

      dialog: null,
      useBackToExit: null, // Going back if the dialog is opened will stay on this page

      dialogPathArray: null,

      key: 0, // Increment to force rerender of dialog on reopen
    };
  },

  props: {
    activityName: String,
    category: String,
    description: String,
    location: String,
    scoutGroup: String,
    scoutZoneRegion: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    numbers: Object,
    activityLeader: Object,
    contact: Object,
    signatures: Object,
    activityLeaderUID: String,
  },

  mounted() {
    const pathItems = this.$route.path.split("/").filter((x) => !!x);

    if (
      this.$route.params.dialogRoute !== undefined ||
      pathItems[pathItems.length - 1] == this.$route.meta.dialogPath
    ) {
      // The current path is the same as the route's dialog path
      this.dialog = true;
      this.useBackToExit = false;

      this.key++;
    } else {
      this.dialog = false;
      this.useBackToExit = true;
    }
  },

  beforeRouteUpdate(to, from, next) {
    // User action has caused move between default view and dialog
    const pathItems = to.path.split("/").filter((x) => !!x);

    this.dialog =
      to.params.dialogRoute !== undefined ||
      pathItems[pathItems.length - 1] == to.meta.dialogPath;

    next(); // Proceed
  },

  methods: {
    updateObject(fieldName, v) {
      this.$refs.page.updateObject(fieldName, v);
    },

    showDialog(dialogName) {
      // Shows the dialog

      if (this.$route.meta.dialogPath) {
        // Dislog display based on a static path
        this.$router.push(
          [
            "",
            ...this.$route.path.split("/").filter((x) => !!x),
            this.$route.meta.dialogPath,
          ].join("/")
        );
      } else {
        // Dialog display based on dialogRoute parameter
        this.$router.push({
          name: this.$route.name,
          params: { dialogRoute: dialogName },
        });
      }

      this.key++;
    },

    exitDialog() {
      // Exit the dialog
      if (this.useBackToExit) {
        this.$router.go(-1);
      } else {
        // Using back functionality won't go to the dialog's parent
        this.useBackToExit = true;

        this.$router.replace({ name: this.currentRoute.name });
      }
    },
  },
};
</script>
