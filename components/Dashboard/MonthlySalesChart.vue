<template>
  <div class="my-4">
    <div class="rounded-2xl shadow-lg bg-white p-3">
      <div class="flex flex-col lg:flex-row justify-between lg:items-center">
        <h1
          class="font-semibold text-xl text-gray-700 py-2 px-2"
          @click="getSalesLog"
        >
          Monthly Sales Details
        </h1>
        <client-only>
          <div class="w-60">
            <DatePicker
              v-if="!chartLoader"
              v-model="filterDate"
              type="month"
              placeholder="Select month"
              prefix-class="xmx"
            />
          </div>
        </client-only>
      </div>
      <div class="relative">
        <div
          v-if="chartLoader"
          class="w-full flex justify-center items-center h-96"
        >
          <Spinner class="text-indigo-600 scale-[5]" />
        </div>
        <client-only v-else>
          <apexchart
            height="450"
            type="area"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>
<script>
import {
  compareDate,
  endDate,
  getDatesBetween,
  startDate,
  timezone,
} from "@/utils";
export default {
  name: "MonthlySalesChart",
  data() {
    return {
      filterDate: new Date(),
      chartLoader: true,
      series: [{ name: "Sales", data: [] }],
      chartOptions: {
        chart: {
          type: "area",
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        xaxis: {
          type: "category",
          labels: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            formatter(value) {
              return new Date(value).toLocaleString("en-GB", {
                day: "numeric",
              });
            },
          },
          axisBorder: {
            show: true,
            color: "#4f46e5",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
          crosshairs: {
            stroke: {
              color: "#4f46e5",
              width: 2,
              dashArray: 0,
            },
          },
        },
        yaxis: {
          show: true,
          labels: {
            formatter(val) {
              return val.toLocaleString("en-IN");
            },
          },
        },
        markers: {
          size: 0,
          strokeWidth: 25,
          strokeColors: "#4f46e580",
          strokeOpacity: 1,
          hover: {
            size: 10,
          },
        },
        colors: ["#4f46e5"],
        tooltip: {
          enabled: true,
          followCursor: true,
          y: {
            formatter(val) {
              return val.toLocaleString("en-IN");
            },
          },
        },
        grid: { padding: { right: 40 } },
      },
    };
  },
  watch: {
    filterDate() {
      this.getSalesLog();
    },
  },
  mounted() {
    this.getSalesLog();
  },
  methods: {
    async getSalesLog() {
      try {
        this.chartLoader = true;
        const body = {
          start: startDate(
            new Date(
              new Date(this.filterDate).getFullYear(),
              new Date(this.filterDate).getMonth(),
              1
            )
          ),
          end: endDate(
            new Date(
              new Date(this.filterDate).getFullYear(),
              new Date(this.filterDate).getMonth() + 1,
              0
            )
          ),
          timezone,
        };
        const { salesLog } = await this.$omApi.getSalesLog(body);
        const chartDate = getDatesBetween(body.start, body.end).map((date) => {
          const findData = salesLog.find(({ _id }) => {
            const [day, month, year] = _id.split("-").map(Number);
            return compareDate(new Date(year, month - 1, day), date);
          });
          if (findData) {
            return { x: new Date(date), y: findData.total };
          } else {
            return { x: new Date(date), y: 0 };
          }
        });
        this.series[0].data = chartDate;
      } catch (error) {
      } finally {
        this.chartLoader = false;
      }
    },
  },
};
</script>
