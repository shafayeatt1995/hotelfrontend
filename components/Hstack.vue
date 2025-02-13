<template>
  <div class="flex items-center">
    <i
      class="fas fa-minus size-6 rounded-full border border-indigo-600 flex justify-center items-center text-indigo-600 cursor-pointer hover:bg-indigo-600 hover:text-white transition-all duration-200"
      @click="value > min ? value-- : triggerLimit('minLimit')"
    >
    </i>
    <p class="min-w-8 text-center text-lg font-bold text-gray-800">
      {{ value }}
    </p>
    <p
      class="fas fa-plus size-6 rounded-full border border-indigo-600 flex justify-center items-center text-indigo-600 cursor-pointer hover:bg-indigo-600 hover:text-white transition-all duration-200"
      @click="value < max ? value++ : triggerLimit('maxLimit')"
    ></p>
  </div>
</template>

<script>
export default {
  name: "Hstack",
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    limitCross: Boolean,
  },
  computed: {
    value: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    triggerLimit(name) {
      if (this.limitCross) name === "minLimit" ? this.value-- : this.value++;
      this.$emit(name);
    },
  },
};
</script>
