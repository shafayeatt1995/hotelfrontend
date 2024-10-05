export default async ({ app }, inject) => {
  if (process.client) {
    const Vue = (await import("vue")).default;
    const Carousel = (await import("vue-owl-carousel")).default;
    Vue.component("Carousel", Carousel);
    inject("carouselApi", Carousel);
  }
};
