<template>
  <div class="container mx-auto py-10 px-4 md:px-10">
    <h1 class="text-3xl font-bold mb-6">Sitemap</h1>

    <p class="my-4 text-gray-700">
      Explore the complete sitemap of Cholozai, your go-to travel guide. Find
      all available tours, travel guides, and tips in one place to plan your
      next adventure effortlessly.
    </p>

    <div
      v-if="urls.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="(url, index) in urls"
        :key="index"
        class="p-4 bg-white shadow-md rounded"
      >
        <a :href="url.url" class="text-indigo-500 hover:underline">{{
          url.loc
        }}</a>
        <p class="text-gray-500 text-sm">{{ url.lastmod }}</p>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      <p>Loading sitemap...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { meta } from "~/utils";
import { parseStringPromise } from "xml2js";

export default {
  auth: false,

  head() {
    const title = `Sitemap | ${this.$pageTitle}`;
    const description =
      "Explore the complete sitemap of Cholozai, your go-to travel guide. Find all available tours, travel guides, and tips in one place to plan your next adventure effortlessly.";

    return {
      title,
      meta: meta({ title, description }),
    };
  },
  async asyncData(context) {
    try {
      const { store, error } = context;
      const { baseUrl } = store.getters;

      let res = await axios.get(`${baseUrl}/sitemap.xml`, {
        responseType: "text",
      });

      if (res.status === 200) {
        const text = res.data;

        const result = await parseStringPromise(text);
        const urls = result.urlset.url.map((entry) => {
          const loc = entry.loc[0] || "No URL";
          const lastmod = entry.lastmod ? entry.lastmod[0] : "Not specified";
          return { loc, lastmod };
        });

        return { urls };
      } else {
        error({ statusCode: 404, message: "Sitemap not found" });
      }
    } catch (err) {
      console.error("Error fetching or parsing sitemap:", err);
      const { error } = context;
      error({
        statusCode: 500,
        message: "Something went wrong. Please try again later.",
      });
    }
  },
  data() {
    return {
      urls: [],
    };
  },
};
</script>
