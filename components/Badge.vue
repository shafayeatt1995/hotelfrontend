<template>
  <div
    class="inline-flex items-center gap-x-2 border"
    :class="[variantClass, sizeClass, squareClass]"
  >
    <slot>
      <i v-if="icon" :class="icon" />
      <h2 class="text-sm font-normal">{{ title }}</h2>
      <i v-if="backIcon" :class="backIcon" />
    </slot>
  </div>
</template>
<script>
export default {
  name: "BadgeGreen",
  props: {
    variant: { type: String, default: "indigo" },
    size: { type: String, default: "lg" },
    square: Boolean,
    title: String,
    icon: String,
    backIcon: String,
  },
  computed: {
    variantClass() {
      if (this.variant === "green") {
        return "text-green-500 bg-green-100/60 border-green-500";
      } else if (this.variant === "solidGreen") {
        return "text-white bg-green-600 border-green-600";
      } else if (this.variant === "complete") {
        return "text-green-500 bg-green-100/60 border-green-500";
      } else if (this.variant === "indigo") {
        return "text-indigo-600 bg-indigo-100/60 border-indigo-500";
      } else if (this.variant === "solidIndigo") {
        return "text-white bg-indigo-600 border-indigo-600";
      } else if (this.variant === "blue") {
        return "text-blue-500 bg-blue-100/60 border-blue-500";
      } else if (this.variant === "gray") {
        return "text-gray-700 bg-gray-100/60 border-gray-500";
      } else if (this.variant === "pink") {
        return "text-pink-500 bg-pink-100/60 border-pink-500";
      } else if (this.variant === "solidPink") {
        return "text-white bg-pink-600 border-pink-600";
      } else if (this.variant === "yellow") {
        return "text-yellow-500 bg-yellow-100/60 border-yellow-500";
      } else if (this.variant === "purple") {
        return "text-purple-500 bg-purple-100/60 border-purple-500";
      } else if (this.variant === "billing") {
        return "text-purple-500 bg-purple-100/60 border-purple-500";
      } else if (this.variant === "red") {
        return "text-red-500 bg-red-100/60 border-red-500";
      } else if (this.variant === "solidRed") {
        return "text-white bg-red-500 border-red-600";
      } else if (this.variant === "amber") {
        return "text-amber-500 bg-amber-100/60 border-amber-500";
      } else if (this.variant === "solidAmber") {
        return "text-white bg-amber-600 border-amber-600";
      } else if (this.variant === "solidLime") {
        return "text-white bg-lime-600 border-lime-600";
      } else if (this.variant === "lime") {
        return "text-lime-500 bg-lime-100/60 border-lime-500";
      } else if (this.variant === "pending") {
        return "text-amber-600 bg-amber-100/60 border-amber-600";
      } else if (this.variant === "active") {
        return "text-sky-500 bg-sky-100/60 border-sky-500";
      } else if (this.variant === "sky") {
        return "text-sky-500 bg-sky-100/60 border-sky-500";
      } else if (this.variant === "rose") {
        return "text-rose-500 bg-rose-100/60 border-rose-500";
      } else if (this.variant === "cancel") {
        return "text-rose-500 bg-rose-100/60 border-rose-500";
      } else if (this.variant === "white") {
        return "text-grey-700 bg-white border border-gray-100";
      }
    },
    sizeClass() {
      if (this.size === "sm") {
        return "px-2 py-0";
      } else if (this.size === "xl") {
        return "px-5 py-2";
      } else {
        return "px-3 py-1";
      }
    },
    squareClass() {
      if (this.square) {
        return "rounded-md";
      } else {
        return "rounded-full";
      }
    },
  },
};
</script>
