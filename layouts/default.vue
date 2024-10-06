<template>
  <div class="selection:bg-indigo-600 selection:text-white">
    <HomeNavbar />
    <div class="bg-white dark:bg-gray-900 lg:py-24 py-20">
      <Nuxt />
    </div>
    <Footer />
    <BackToTop />
    <LoginPopup />
    <ShareHotelPopup />
    <WindowWidth />
  </div>
</template>
<script>
import { arrayConverter, refreshTokens } from "@/utils";

export default {
  name: "DefaultLayout",
  mounted() {
    refreshTokens.call(this);
    this.$nuxt.$on("preview", this.handlePreview);

    this.$nuxt.$on("success", (success) => {
      this.$toast.success(success);
    });

    this.$nuxt.$on("error", (message) => {
      this.$toast.error(message);
    });

    this.$nuxt.$on("warning", (warning) => {
      this.$toast.warning(warning);
    });

    this.loadCarousel();
  },
  beforeDestroy() {
    this.$nuxt.$off("preview", this.handlePreview);
    this.$nuxt.$off("success");
    this.$nuxt.$off("error");
    this.$nuxt.$off("warning");
  },
  methods: {
    async loadCarousel() {},

    async loadViewer() {
      if (!this.$viewerApi) {
        await import("viewerjs/dist/viewer.css");
        const { default: VueViewer } = await import("v-viewer");
        this.$viewerApi = VueViewer;
      }
    },

    async handlePreview(images) {
      await this.loadViewer();
      this.$viewerApi({
        images: arrayConverter(images),
      });
    },
  },
};
</script>

<style lang="scss">
$namespace: "xmx";
$primary-color: rgb(79 70 229);
$default-color: #555;
@import "~vue2-datepicker/scss/index.scss";

.xmx-datepicker {
  width: 100% !important;
}
.xmx-input {
  font-size: 16px;
  height: 42px;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  box-shadow: none;
  &:hover,
  &:focus {
    border-color: rgb(79 70 229) !important;
  }
}
</style>
