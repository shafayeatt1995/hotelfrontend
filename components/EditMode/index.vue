<template>
  <div v-if="edit" class="w-full">
    <textarea
      v-model="value"
      ref="textarea"
      class="w-full"
      v-click-outside="() => (edit = false)"
    ></textarea>
  </div>
  <component :is="tagName" v-else @click="setEdit">{{ value }}</component>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";
export default {
  directives: { clickOutside: vClickOutside.directive },
  props: {
    tagName: {
      type: String,
      default: "span",
    },
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: {
    ...mapGetters(["isDev"]),
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
    setEdit() {
      if (this.isDev) {
        this.edit = true;
        this.$nextTick(() => {
          this.$refs.textarea.focus();
        });
      }
    },
  },
};
</script>
