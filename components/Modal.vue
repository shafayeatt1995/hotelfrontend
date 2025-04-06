<template>
  <transition-group mode="out-in" name="fade">
    <div class="relative flex justify-center z-[999]" v-if="modal" :key="key">
      <div class="fixed inset-0 z-40 overflow-y-auto" :key="key">
        <div
          class="flex items-center justify-center min-h-screen bg-gray-500/70 dark:bg-black/50 backdrop-blur-sm"
        >
          <div
            class="absolute lg:relative bottom-0 inline-block p-4 overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-gray-800 dark:text-white text-gray-800 rounded-2xl shadow-xl w-full sm:align-middle opacity-100"
            :class="[getWidth, modal ? 'translate-y-0' : 'translate-y-full']"
          >
            <slot name="title" />
            <div class="lg:my-2"></div>
            <div class="max-h-[79vh] overflow-y-auto">
              <slot name="body" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>
<script>
import { randomStr } from "@/utils";

export default {
  name: "Modal",
  props: {
    size: { type: String, default: "lg" },
  },
  computed: {
    key: () => randomStr(),
    modal: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    getWidth() {
      if (this.size === "lg") {
        return "lg:w-2/4";
      } else if (this.size === "xl") {
        return "lg:w-3/4";
      } else if (this.size === "sm") {
        return "lg:w-1/3";
      } else if (this.size === "fixed") {
        return `lg:w-[750px]`;
      }
      randomStr;
    },
  },
};
</script>
