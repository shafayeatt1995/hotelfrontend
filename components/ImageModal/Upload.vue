<template>
  <div>
    <p class="text-gray-700 mt-4 mb-2">
      You can upload max {{ superAdmin ? "unlimited" : 50 }} images
    </p>
    <vue-dropzone
      v-if="setData"
      id="myDropzone"
      :options="dropzoneOptions"
      @vdropzone-queue-complete="onSuccess"
    />

    <div class="flex justify-end mt-3">
      <Button variant="red" @click.native.prevent="modal = false">
        Close
      </Button>
    </div>
  </div>
</template>

<script>
let vueDropzone;
if (process.client) vueDropzone = require("vue2-dropzone");
import { mapActions, mapGetters } from "vuex";
import { getItem } from "~/utils";

export default {
  name: "UploadImage",
  ssr: false,
  components: { vueDropzone },
  data() {
    return { setData: false, dropzoneOptions: {} };
  },
  computed: {
    ...mapGetters(["superAdmin", "apiUrl"]),
    modal: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    this.dropzoneOptions = {
      url: `${this.apiUrl}/api/user/image`,
      headers: { Authorization: getItem("auth._token.cookie") },
      thumbnailWidth: 150,
      paramName: "image",
      acceptedFiles: "image/*",
      maxFilesize: 10,
      maxFiles: 50,
      dictMaxFilesExceeded: "You can't upload more than 20 images at a time",
      dictDefaultMessage: `<div class="flex flex-col items-center" >
        <p class="text-8xl text-indigo-600">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </p>
        <br /> Click or drop file here to upload. Max file size 10 MB.</div>`,
    };
    this.setData = true;
  },
  methods: {
    ...mapActions("image", ["reset"]),
    onSuccess() {
      this.reset();
    },
  },
};
</script>
