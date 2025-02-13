<template>
  <div>
    <PageName> All Locations </PageName>
    <div class="container mx-auto py-5">
      <div
        class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-10"
        v-if="posts && posts.length"
      >
        <LocationSinglePost
          v-for="(post, key) in posts"
          :key="key + 'i'"
          :post="post"
        />
      </div>
      <div v-else class="w-full flex flex-col justify-center items-center">
        <div ref="empty" class="h-96"></div>
        <h1 class="text-3xl font-bold">No location post found</h1>
      </div>
      <div
        class="mt-10 flex items-center justify-center"
        v-if="posts && posts.length"
      >
        <Paginate :posts="posts" />
      </div>
      <div v-else class="flex justify-center items-center"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { initLottie, meta } from "@/utils";
export default {
  name: "LocationPage",
  auth: false,
  head() {
    const title = `Location - Page ${this.page} | ${this.$pageTitle}`;
    const description = `Explore a diverse range of travel information on CholoZai. From travel tips and destination guides to cultural insights. page number ${this.page}.`;

    return {
      title,
      meta: meta({ title, description }),
    };
  },
  async asyncData(context) {
    try {
      const { store, error, route } = context;
      const { params } = route;
      const { apiUrl } = store.getters;
      const page = params?.page || 1;
      let res = await axios.get(`${apiUrl}/api/fetch/posts/${page}`);
      if (res.data) {
        const { posts } = res.data;
        return { posts, page };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      console.error(err);
      const { error } = context;
      error({
        statusCode: 500,
        message: "Something wrong. Please try again 2",
      });
    }
  },
  data() {
    return {
      posts: [],
      page: 1,
    };
  },
  computed: {
    pageNumber() {
      return +this.$route.params.page;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.empty) {
        initLottie(this.$refs.empty, "/lottie/empty.json");
      }
    });
  },
};
</script>
