<template>
  <transition name="fade">
    <div
      class="fixed inset-0 z-40 bg-black/30"
      v-if="show"
      @click="clickable ? (show = !show) : null"
    ></div>
  </transition>
</template>

<script>
export default {
  name: "OverLay",
  props: { clickable: Boolean },
  computed: {
    show: {
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
