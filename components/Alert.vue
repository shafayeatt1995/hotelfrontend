<template>
  <div class="py-3 px-2 rounded-lg border-l-4" :class="getVariant">
    <slot />
  </div>
</template>

<script>
export default {
  name: "alert",
  props: { variant: { type: String, default: "indigo" } },
  computed: {
    getVariant() {
      if (this.variant === "green")
        return "bg-green-100 text-green-600 border-green-600";
      else if (this.variant === "indigo")
        return "bg-indigo-100 text-indigo-600 border-indigo-600";
    },
  },
};
</script>
