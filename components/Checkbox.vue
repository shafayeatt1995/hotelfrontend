<template>
  <div class="flex items-center">
    <input
      class="checkbox-icon rounded border border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-500/20 focus:ring-opacity-50 me-2 appearance-none p-0 inline-block size-4 bg-white checked:border-transparent checked:bg-current checked:bg-center checked:bg-no-repeat cursor-pointer"
      type="checkbox"
      v-model="model"
      :id="id"
      :value="val"
      v-show="!hideCheckbox"
      :name="name"
    />
    <label class="flex-1" :for="id"><slot :active="isChecked" /></label>
  </div>
</template>

<script>
import { arrayConverter, randomStr } from "@/utils";

export default {
  name: "Checkbox",
  props: {
    id: [String, Number],
    val: [String, Number],
    hideCheckbox: Boolean,
    name: { type: String, default: randomStr() },
  },
  computed: {
    model: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    isChecked() {
      return arrayConverter(this.model).includes(this.val);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox-icon:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}
</style>
