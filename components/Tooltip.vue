<template>
  <div class="flex items-center">
    <div class="group relative">
      <slot name="label" />
      <div
        class="bg-gray-800 p-2 rounded-md group-hover:block hidden absolute text-white -translate-x-1/2 left-1/2 transition-all duration-300"
        v-if="!!$slots.body"
      >
        <slot name="body" />
        <div
          class="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolTip",
  data() {
    return {
      visible: false,
      tooltipTop: 0,
      tooltipLeft: 0,
    };
  },
  methods: {
    showTooltip(event) {
      const rect = this.$refs.tooltipContainer.getBoundingClientRect();
      this.tooltipTop = rect.top + window.scrollY - 30;
      this.tooltipLeft = rect.left + window.scrollX + rect.width / 2;
      this.visible = true;
    },
    hideTooltip() {
      this.visible = false;
    },
  },
};
</script>
