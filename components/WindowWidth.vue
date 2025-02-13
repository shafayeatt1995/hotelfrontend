<template></template>
<script>
import { mapActions } from "vuex";
export default {
  name: "windowWidth",
  mounted() {
    this.windowWidth();
    window.addEventListener("resize", this.windowWidth());
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.windowWidth());
  },
  methods: {
    ...mapActions(["windowWidth"]),
  },
};
</script>
