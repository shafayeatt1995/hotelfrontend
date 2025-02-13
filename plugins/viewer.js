import "viewerjs/dist/viewer.css";

export default async ({ app }, inject) => {
  if (process.client) {
    const Vue = (await import("vue")).default;
    const VueViewer = (await import("v-viewer")).default;
    Vue.use(VueViewer);
    inject("viewerApi", VueViewer);
  }
};
