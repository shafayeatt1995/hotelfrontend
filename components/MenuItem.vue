<template>
  <nuxt-link
    v-if="to"
    :to="to"
    class="flex items-center gap-2 py-3 px-3 transition-all duration-300 rounded-md cursor-pointer"
    :class="finalClass"
  >
    <slot name="body" />
    <i v-if="icon" :class="icon"></i>
    <p v-if="title">{{ title }}</p>
  </nuxt-link>
  <div
    v-else
    class="flex items-center gap-2 py-3 px-3 transition-all duration-300 rounded-md cursor-pointer"
    :class="finalClass"
  >
    <slot name="body" />
    <i v-if="icon" :class="icon"></i>
    <p v-if="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    icon: String,
    title: String,
    variant: String,
    to: [String, Object],
    active: Boolean,
  },

  computed: {
    variantClass() {
      if (this.variant === "red") {
        return `text-red-600  hover:bg-red-50`;
      } else {
        return `text-gray-700 hover:text-indigo-600 hover:bg-indigo-50`;
      }
    },
    finalClass() {
      return this.active ? this.processClass() : this.variantClass;
    },
  },
  methods: {
    processClass() {
      return this.variantClass
        .split(" ")
        .filter((cls) => cls.startsWith("hover:"))
        .map((cls) => cls.replace("hover:", ""))
        .join(" ");
    },
  },
};
</script>
