export default async ({ app }, inject) => {
  if (process.client) {
    const Vue = (await import("vue")).default;
    const vueDropzone = (await import("vue2-dropzone")).default;
    Vue.component("vueDropzone", vueDropzone);
    inject("vueDropzoneApi", vueDropzone);
  }
};
