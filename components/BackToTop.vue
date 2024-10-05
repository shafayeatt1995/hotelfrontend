<template>
  <transition name="fade">
    <button
      v-if="isVisible && $route.name !== 'hotel-slug'"
      @click="scrollToTop"
      class="bg-indigo-600 shadow-xl size-12 rounded-full fixed bottom-5 right-4 text-2xl z-50 text-white"
    >
      <i class="fa-solid fa-chevron-up"></i>
    </button>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.checkScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkScroll);
  },
  methods: {
    checkScroll() {
      this.isVisible = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.back-to-top:hover {
  background-color: #333;
}
</style>
