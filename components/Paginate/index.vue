<template>
  <div
    class="mt-10 flex items-center justify-center"
    v-if="posts && posts.length"
  >
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
      <button
        v-if="pageNumber == 1"
        disabled
        class="relative flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
      >
        <i class="fa-solid fa-angle-left text-xs"></i>
        <span>Previous</span>
      </button>
      <nuxt-link
        v-else
        :to="to(-1)"
        title="Previous page"
        class="relative flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
      >
        <i class="fa-solid fa-angle-left text-xs"></i>
        <span>Previous</span>
      </nuxt-link>
      <nuxt-link
        v-if="posts && posts.length === 24"
        :to="to(+1)"
        title="Next page"
        class="relative flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
      >
        <span>Next</span>
        <i class="fa-solid fa-angle-right text-xs"></i>
      </nuxt-link>
      <button
        v-else
        disabled
        class="relative flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
      >
        <span>Next</span>
        <i class="fa-solid fa-angle-right text-xs"></i>
      </button>
    </nav>
  </div>
  <div v-else class="flex justify-center items-center"></div>
</template>

<script>
export default {
  name: "Paginate",
  props: { posts: Array },
  computed: {
    pageNumber() {
      return +this.$route.params.page;
    },
    name() {
      return +this.$route.name;
    },
  },
  methods: {
    params(number) {
      const params = { ...this.$route.params };
      params.page = +params.page + number;
      return params;
    },
    to(number) {
      return { name: this.name, params: this.params(number) };
    },
  },
};
</script>
