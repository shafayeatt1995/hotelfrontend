<template>
  <div>
    <p v-if="label">{{ label }}</p>
    <div class="flex">
      <span
        v-for="star in stars"
        :key="star"
        class="cursor-pointer text-2xl pr-2"
        :class="{
          'text-yellow-500': star <= hoverRating || star <= rating,
          'text-gray-300': star > hoverRating && star > rating,
        }"
        @click="rating = star"
        @mouseover="setHoverRating(star)"
        @mouseleave="resetHoverRating"
      >
        <i class="fas fa-star"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarSelect",
  props: { maxStars: { type: Number, default: 5 }, label: String },
  data() {
    return {
      hoverRating: 0,
    };
  },
  computed: {
    rating: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    stars() {
      return Array.from({ length: this.maxStars }, (_, i) => i + 1);
    },
  },
  methods: {
    setHoverRating(star) {
      this.hoverRating = star;
    },
    resetHoverRating() {
      this.hoverRating = 0;
    },
  },
};
</script>
