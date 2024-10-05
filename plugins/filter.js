import Vue from "vue";
import { endDate } from "@/utils";

Vue.filter("fullDate", (value, sign = "-") => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return endDate(value)
    .toLocaleDateString("en-GB", options)
    .replace(/ /g, sign);
});

Vue.filter("decimal", (value) => parseFloat(value).toFixed(2));

Vue.filter("cleanDecimal", (value) =>
  parseFloat(value)
    .toFixed(value % 1 ? 2 : 0)
    .replace(/(\.0+|(?<=\.\d)0+)$/, "")
);

Vue.filter("number", (value) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
);

Vue.filter("currency", (value) => Math.round(value).toLocaleString("en-IN"));

Vue.filter("rating", (value) => (Math.round(+value * 100) / 100).toFixed(2));
