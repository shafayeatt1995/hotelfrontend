<template>
  <Error />
</template>

<script>
export default {
  name: "NotFound",
  auth: false,
  head() {
    return { title: `404 - Page Not Found - ${this.$pageTitle}` };
  },

  async mounted() {
    initLottie(this.$refs.error, "/lottie/404.json");
  },

  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>
