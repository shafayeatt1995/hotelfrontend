<template>
  <div class="sticky top-0 z-30 bg-white">
    <header class="text-gray-100 lg:hidden shadow-md">
      <div class="container flex items-center justify-between p-4 mx-auto">
        <nuxt-link :to="{ name: 'index' }" class="text-white">
          <img src="/full-logo-tr.webp" alt="logo" class="h-10" />
        </nuxt-link>

        <button
          @click="isOpen = !isOpen"
          class="p-2 rounded-lg focus:outline-none text-gray-800"
        >
          <template v-if="!isOpen">
            <i class="fas fa-align-justify text-xl" />
          </template>
          <template v-else>
            <i class="fas fa-xmark text-xl" />
          </template>
        </button>
      </div>
    </header>

    <div
      v-cloak
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-30 lg:hidden"
    ></div>
  </div>
</template>
<script>
export default {
  name: "MobileTopBar",
  data() {
    return {};
  },
  computed: {
    isOpen: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
