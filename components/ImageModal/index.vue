<template>
  <div class="relative flex justify-center">
    <transition mode="out-in" name="fade">
      <div
        v-if="modal"
        class="fixed inset-0 z-[9999] overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen px-4 pt-4 bg-gray-500 bg-opacity-50"
        >
          <div
            class="relative inline-block px-4 pt-4 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl w-full lg:w-2/3"
          >
            <div class="flex items-center">
              <TabTitle
                :tabTitle="tabTitle"
                v-model="active"
                fullWidth
                class="flex-1"
              />
            </div>
            <transition name="fade" mode="out-in">
              <ImageModalSelect
                v-if="active === 'Select image'"
                :modal.sync="modal"
                :value="selected"
                @input="update"
                @activeUpload="active = 'Upload image'"
                :multiple="multiple"
                :limit="limit"
              />
              <ImageModalUpload
                v-else-if="active === 'Upload image'"
                v-model="modal"
              />
              <ImageModalDelete
                v-else-if="active === 'Delete image'"
                @activeUpload="active = 'Upload image'"
                :modal.sync="modal"
              />
            </transition>
          </div>
        </div>
      </div>
    </transition>
    <KeyTrigger eventKey="Escape" @action="modal = false" />
  </div>
</template>
<script>
export default {
  name: "ImageModal",
  props: {
    multiple: Boolean,
    limit: { type: Number, default: 999 },
    selected: [String, Array],
  },
  data() {
    return {
      tabTitle: [
        { title: "Select image", icon: "far fa-images" },
        { title: "Upload image", icon: "fas fa-cloud-arrow-up" },
        { title: "Delete image", icon: "fas fa-trash-can" },
      ],
      active: "Select image",
    };
  },
  computed: {
    modal: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    update(data) {
      this.$emit("update:selected", data);
    },
  },
};
</script>
