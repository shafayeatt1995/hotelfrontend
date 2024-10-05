import "vue2-datepicker/index.css";

export default async ({ app }, inject) => {
  if (process.client) {
    const Vue = (await import("vue")).default;
    const DatePicker = (await import("vue2-datepicker")).default;

    Vue.component("DatePicker", DatePicker);
    inject("datePicker", DatePicker);
  }
};
