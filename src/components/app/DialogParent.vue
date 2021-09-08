<template>
  <div>
    <component
      :is="$route.meta.dialog"
      @exitDialog="exitDialog"
      :dialog="dialog"
      :key="key"
    />

    <component :is="$route.meta.default" @showDialog="showDialog" />
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

  mounted() {
    // Determine the current URL path (excluding the dialog), adding in URL parameters
    let currentPath = this.currentRoute.path;
    Object.entries(this.$route.params).forEach(([param, value]) => {
      currentPath = currentPath.replace(`:${param}`, value);
    });

    this.dialogPathArray = [
      ...this.toArray(currentPath),
      ...this.toArray(this.currentRoute.meta.dialogPath),
    ];

    if (
      this.arrayIsEqual(this.toArray(this.$route.path), this.dialogPathArray)
    ) {
      // The current path is the same as the route's dialog path
      this.dialog = true;
      this.useBackToExit = false;
    } else {
      this.dialog = false;
      this.useBackToExit = true;
    }
  },

  beforeRouteUpdate(to, from, next) {
    // User action has caused move between default view and dialog
    this.dialog = this.arrayIsEqual(
      this.toArray(to.path),
      this.dialogPathArray
    );

    next(); // Proceed
  },

  methods: {
    showDialog() {
      // Shows the dialog
      this.$router.push("/" + this.dialogPathArray.join("/"));

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

    toArray(x) {
      // Takes a path string and splits it into an array, removing blank items
      return x.split("/").filter((x) => x);
    },

    arrayIsEqual(a, b) {
      // Checks if the items of a and b are equal
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    },
  },
};
</script>
