<template>
  <div :ref="key" class="w-full flex justify-center">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Observer",
  data() {
    return {
      key: [...Array(10)].map(() => Math.random().toString(36)[2]).join(""),
      observer: null,
    };
  },
  mounted() {
    this.setObserver();
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    setObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$emit("load");
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        }
      );

      this.observer.observe(this.$refs[this.key]);
    },
  },
};
</script>
