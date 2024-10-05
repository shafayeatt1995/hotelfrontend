<template>
  <section class="bg-white">
    <div
      class="container min-h-screen px-6 mx-auto flex lg:items-center flex-col-reverse lg:flex-row justify-end -mt-24"
    >
      <div class="wf-ull lg:w-1/2">
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

          <Button :to="{ name: 'index' }" title="cholozai">
            Take me home
          </Button>
        </div>
      </div>

      <div class="relative w-full mt-12 lg:w-1/2 lg:mt-0" ref="error">
        <nuxt-img
          loading="lazy"
          decoding="async"
          src="/images/404.svg"
          class="object-contain w-full"
          alt="404 page not found"
          title="404 page not found"
          fit="cover"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { initLottie } from "@/utils";

export default {
  name: "NotFound",
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>

<!-- <template>
  <section class="bg-white">
    <div
      class="container min-h-screen px-6 mx-auto flex justify-center items-center -mt-24 flex-col"
    >
      <h1
        class="text-5xl lg:text-9xl md:text-8xl text-indigo-600 text-center font-bold"
      >
        404 ERROR
      </h1>
      <h2 class="mt-3 text-3xl font-semibold text-gray-700 md:text-5xl">
        Page not found
      </h2>
      <p class="mt-4 text-gray-500 text-center">
        Sorry, the page you are looking for doesn't exist. Here are some helpful
        links:
      </p>

      <div class="flex items-center mt-6 gap-x-3">
        <Button @click.native.prevent="goBack" variant="transparent">
          <i class="fas fa-arrow-left-long"></i>
          <span>Go back</span>
        </Button>

        <Button :to="{ name: 'index' }"> Take me home </Button>
      </div>
    </div>
  </section>
</template>

<script>
import { initLottie } from "@/utils";

export default {
  name: "NotFound",
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script> -->
