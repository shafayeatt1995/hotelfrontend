<template>
  <div class="relative min-h-screen lg:flex">
    <DashboardMobileTopbar v-model="isOpen" />
    <DashboardSidebar :isOpen="isOpen" />
    <main
      id="content"
      class="flex-1 pb-12 overflow-y-auto bg-gray-100 lg:h-screen"
    >
      <DashboardTopbar />
      <div class="px-3 mt-4">
        <Nuxt />
      </div>
    </main>
    <WindowWidth />
  </div>
</template>
<script>
import { refreshTokens } from "@/utils";

export default {
  name: "DashboardLayout",
  data() {
    return {
      isOpen: false,
    };
  },

  mounted() {
    refreshTokens.call(this);

    this.$nuxt.$on("success", (success) => {
      this.$toast.success(success);
    });

    // Trigger Error Toast Message
    this.$nuxt.$on("error", (message) => {
      this.$toast.error(message);
    });

    //Trigger Info Toast Message
    this.$nuxt.$on("warning", (warning) => {
      this.$toast.warning(warning);
    });
  },

  beforeDestroy() {
    this.$nuxt.$off("success");
    this.$nuxt.$off("error");
    this.$nuxt.$off("warning");
  },

  watch: {
    $route() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.cke_button__link,
.cke_button__unlink,
.cke_toolbar_break,
.cke_button__anchor {
  display: none !important;
}
</style>
