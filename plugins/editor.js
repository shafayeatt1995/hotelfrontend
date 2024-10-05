export default async ({ app }, inject) => {
  if (process.client) {
    const Vue = (await import("vue")).default;
    const CKEditor = (await import("ckeditor4-vue")).default;
    Vue.use(CKEditor);

    inject("ckeditor", CKEditor);
  }
};
