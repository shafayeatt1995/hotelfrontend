<template>
  <Badge
    class="font-bold"
    square
    :variant="getVariant()"
    v-if="mode === 'badge'"
  >
    <div class="flex items-center justify-between gap-1 text-lg">
      <i class="fas fa-star text-white text-xs"></i>
      <span v-if="rating === 0">New</span>
      <span v-else>{{ rating | rating }}</span>
    </div>
  </Badge>
  <Badge
    class="font-bold"
    v-else-if="rating === 0 && !star0"
    size="sm"
    square
    variant="solidGreen"
  >
    <i class="fas fa-star text-white text-xs"></i>
    New
  </Badge>
  <div v-else>
    <p v-if="label">{{ label }}</p>
    <Skeleton v-if="loading" class="w-full h-5 pr-3" />
    <div
      v-else
      class="flex items-center gap-1"
      :class="basic ? '' : 'bg-white shadow-md rounded-2xl py-2 px-3'"
    >
      <i
        v-for="(r, index) in getRating(rating)"
        :key="`rating-${index}`"
        :class="r"
        class="text-amber-400"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: {
    rating: { type: [String, Number], default: 0 },
    mode: { type: String, default: "star" },
    basic: Boolean,
    loading: Boolean,
    star0: Boolean,
    label: String,
  },
  methods: {
    getVariant() {
      if (this.rating === 0) {
        return "solidGreen";
      } else if (this.rating < 2.5) {
        return "solidRed";
      } else if (this.rating < 3.5) {
        return "solidAmber";
      } else if (this.rating < 4.5) {
        return "solidLime";
      } else {
        return "solidGreen";
      }
    },
    getRating(rating) {
      const floorRating = Math.floor(rating);
      const remainder = rating % 1;
      return Array.from({ length: 5 }, (_, i) => {
        if (i < floorRating) {
          return "fas fa-star";
        } else if (i === floorRating && remainder >= 0.5) {
          return "fas fa-star-half-stroke";
        } else {
          return "far fa-star";
        }
      });
    },
  },
};
</script>
