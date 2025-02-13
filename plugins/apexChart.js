export default async ({ app }, inject) => {
  if (process.client) {
    const Vue = (await import("vue")).default;
    const VueApexCharts = (await import("vue-apexcharts")).default;

    Vue.use(VueApexCharts);
    Vue.component("apexchart", VueApexCharts);
    inject("apexCharts", VueApexCharts);
  }
};
