<template>
  <div>
    <div
      class="flex flex-wrap justify-between lg:justify-start gap-3 lg:gap-6 px-3 mt-3 max-h-96 overflow-y-auto"
      v-if="images.length > 0"
    >
      <div
        class="relative cursor-pointer text-green-600 flex items-center"
        @click="setImage(image)"
        v-for="(image, i) in images"
        :key="i"
      >
        <transition name="fade" mode="out-in">
          <div
            v-if="checkId(image)"
            class="flex items-center justify-center absolute w-full h-full bg-gray-800 bg-opacity-70 z-10"
          >
            <i class="text-2xl fas fa-circle-check" />
          </div>
        </transition>
        <img
          loading="lazy"
          :src="image.url"
          class="object-contain w-28 h-full"
          alt="delete image"
        />
      </div>

      <Observer @load="getImages">
        <Spinner class="text-green-600 h-7 w-7" v-if="isLoading" />
      </Observer>
    </div>
    <div class="flex justify-center items-center w-full py-5" v-else>
      <EmptyMessage
        @action="$emit('activeUpload')"
        title="No Images found"
        buttonText="Upload Image"
        icon="fas fa-cloud-arrow-up"
      />
    </div>
    <div
      class="flex flex-col lg:flex-row justify-end mt-3 pt-3 bg-white border-t border-gray-300 gap-4"
    >
      <Button
        variant="red"
        @click.native.prevent="$emit('update:modal', false)"
      >
        Close
      </Button>
      <Button
        variant="red"
        @click.native.prevent="select"
        :disabled="selected.length === 0"
      >
        <i class="fas fa-trash-can" />
        Delete Images
      </Button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DeleteImage",
  props: { modal: Boolean },
  data() {
    return {
      observer: null,
      selected: [],
      click: true,
    };
  },
  computed: {
    ...mapGetters("image", ["images", "isLoading"]),
  },
  mounted() {
    this.getImages();
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    ...mapActions("image", ["getImages", "reset"]),
    async select() {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$userApi.deleteImage({ keyList: this.selected });
            this.selected = [];
            this.$nuxt.$emit("success", "Image deleted successfully");
            await this.reset();
            await this.getImages();
            this.click = true;
          }
        } catch (error) {
          this.$nuxt.$emit("error", error.response.data.message);
        } finally {
          this.click = true;
        }
      }
    },
    setImage({ key }) {
      const index = this.selected.findIndex((val) => val === key);

      if (index !== -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(key);
      }
    },
    checkId({ key }) {
      return this.selected.some((val) => val === key);
    },
  },
};
</script>
