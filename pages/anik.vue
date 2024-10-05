<template>
  <div>
    <section
      class="h-dvh bg-cover bg-center relative -mt-[81px] overflow-x-hidden"
    >
      <div class="w-screen h-dvh absolute top-0 left-0">
        <nuxt-img
          loading="lazy"
          decoding="async"
          src="/hero-background.webp"
          alt="Hero background image Cholozai.com"
          title="Hero background image Cholozai.com"
          class="object-cover inset-0 w-full h-full"
          format="webp"
          quality="50"
          width="1920"
          height="1080"
          :sizes="{ xs: 640, sm: 768, md: 1024, lg: 1280, xl: 1920 }"
        />
      </div>
      <div class="absolute bg-gray-900/20 h-full w-full top-0 left-0"></div>
      <div class="container mx-auto relative z-10 h-full">
        <div
          class="flex justify-center lg:justify-between items-center h-full flex-col lg:flex-row"
        >
          <div class="lg:w-2/3 flex flex-col justify-center px-2 md:px-0">
            <h1
              class="font-black lg:text-5xl 2xl:text-7xl md:text-4xl text-2xl text-white mt-5 relative"
            >
              Discover Every Destination in Bangladesh. A Complete Travel Guide
              <span class="font-bold">Cholozai.com</span>
            </h1>
            <p
              class="lg:text-xl text-sm text-white font-semibold md:mt-8 mt-4 px-2"
            >
              Discover the beauty, history, and culture of Bangladesh with
              detailed guides to every corner of the country. Explore every
              destination with our in-depth guides, designed to help you
              experience the best of what this incredible country offers. Plan
              your perfect trip with insider tips and local insights.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="container mx-auto mt-10">
      <h2
        class="text-4xl font-bold text-center pb-5 w-full text-gray-800 dark:text-white"
      >
        See recent posts
      </h2>
      <div
        class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-10 px-2"
      >
        <LocationSinglePost
          v-for="(post, key) in posts"
          :key="key + 'i'"
          :post="post"
        />
      </div>
      <div class="mt-10 flex items-center justify-center">
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button
            disabled
            class="relative flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
          >
            <i class="fa-solid fa-angle-left text-xs"></i>
            <span>Previous</span>
          </button>
          <nuxt-link
            :to="{ name: 'location-page-page', params: { page: 1 } }"
            title="Next page"
            class="relative flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
          >
            <span>Next</span>
            <i class="fa-solid fa-angle-right text-xs"></i>
          </nuxt-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { meta } from "@/utils";
export default {
  name: "IndexPage",
  auth: false,
  head() {
    return {
      title: `All tours and travel tips and information - ${this.$pageTitle}`,
      meta: meta(),
    };
  },
  async asyncData(context) {
    const { store, error } = context;
    try {
      const { apiUrl } = store.getters;
      let res = await axios.get(`${apiUrl}/api/fetch/posts/2`);
      if (res.data) {
        const { posts } = res.data;
        return { posts };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      error({ statusCode: 500, message: "Something wrong. Please try again" });
    }
  },
  data() {
    return { posts: [] };
  },
};
</script>
