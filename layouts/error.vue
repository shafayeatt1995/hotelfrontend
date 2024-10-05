<template>
  <section class="bg-white">
    <div
      class="container min-h-screen px-6 mx-auto flex lg:items-center flex-col-reverse lg:flex-row justify-end -mt-24"
    >
      <div class="wf-ull lg:w-1/3">
        <p class="text-sm font-medium text-indigo-600">404 error</p>
        <h1 class="mt-3 text-2xl font-semibold text-gray-700 md:text-3xl">
          Page not found
        </h1>
        <p class="mt-4 text-gray-500">
          Sorry, the page you are looking for doesn't exist. Here are some
          helpful links:
        </p>

        <div class="flex items-center mt-6 gap-x-3">
          <Button @click.native.prevent="goBack" variant="transparent">
            <i class="fas fa-arrow-left-long"></i>
            <span>Go back</span>
          </Button>

          <Button :to="{ name: 'index' }"> Take me home </Button>
        </div>
      </div>

      <div class="relative w-full mt-12 lg:w-2/3 lg:mt-0" ref="error"></div>
    </div>
  </section>
</template>

<script>
import { initLottie } from "@/utils";

export default {
  name: "NotFound",
  data() {
    return {};
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
