export default async ({ app }, inject) => {
  if (process.client) {
    const Vue = (await import("vue")).default;
    const VTooltip = (await import("v-tooltip")).default;
    Vue.use(VTooltip);
  }
};
