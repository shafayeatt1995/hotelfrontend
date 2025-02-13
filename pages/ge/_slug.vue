<template>
  <div class="py-24">
    <div v-if="loaded">
      <p id="title">{{ item?.url?.title }}</p>
      <p id="districtName">{{ item?.url?.districtName }}</p>
      <div v-html="item?.url?.content" id="content"></div>
    </div>
    <div v-else id="data-loading">Loading</div>
  </div>
</template>

<script>
export default {
  name: "GePage",
  data() {
    return {
      loaded: false,
      item: null,
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const { item } = await this.$commonApi.fetchDemoPost({
          slug: this.$route.params.slug,
        });
        this.item = item;
        this.loaded = true;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
#content h2 {
  @apply text-3xl font-bold mt-4 text-gray-800 dark:text-white;
}
</style>
