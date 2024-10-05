<template>
  <div>
    <section class="px-2 lg:px-6">
      <div>
        <p class="font-medium text-gray-700 mb-2">
          {{ todayDate }}
        </p>
        <h2 class="text-3xl font-medium text-gray-700 mb-2">
          Hello, {{ $auth?.user?.name }} at {{ $auth?.user?.hotel?.name }}
        </h2>
      </div>
    </section>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
      <div class="flex bg-white items-center rounded-2xl p-3 shadow-md">
        <div class="flex items-center">
          <div
            class="rounded-full bg-indigo-100 size-10 flex justify-center items-center"
          >
            <i class="text-indigo-600 text-xl fas fa-clipboard-check" />
          </div>
        </div>
        <div class="ml-4 text-gray-700">
          <p class="font-medium">Today's Booking</p>
          <h4 class="text-xl font-bold">
            <span>{{ todaySummery.total }}</span>
          </h4>
        </div>
      </div>
      <div class="flex bg-white items-center rounded-2xl p-3 shadow-md">
        <div class="flex items-center">
          <div
            class="rounded-full bg-indigo-100 size-10 flex justify-center items-center"
          >
            <i class="text-indigo-600 text-xl fas fa-chart-simple" />
          </div>
        </div>
        <div class="ml-4 text-gray-700">
          <p class="font-medium">Today's Earning</p>
          <h4 class="text-xl font-bold">
            <span>{{ $taka }}{{ todaySummery.earning | currency }}</span>
          </h4>
        </div>
      </div>
      <div class="flex bg-white items-center rounded-2xl p-3 shadow-md">
        <div class="flex items-center">
          <div
            class="rounded-full bg-indigo-100 size-10 flex justify-center items-center"
          >
            <i class="text-indigo-600 text-xl fas fa-clipboard-check" />
          </div>
        </div>
        <div class="ml-4 text-gray-700">
          <p class="font-medium">Monthly Booking</p>
          <h4 class="text-xl font-bold">
            <span>{{ monthlySummery.total }}</span>
          </h4>
        </div>
      </div>
      <div class="flex bg-white items-center rounded-2xl p-3 shadow-md">
        <div class="flex items-center">
          <div
            class="rounded-full bg-indigo-100 size-10 flex justify-center items-center"
          >
            <i class="text-indigo-600 text-xl fas fa-chart-simple" />
          </div>
        </div>
        <div class="ml-4 text-gray-700">
          <p class="font-medium">Monthly Earning</p>
          <h4 class="text-xl font-bold">
            <span>{{ $taka }}{{ monthlySummery.earning | currency }}</span>
          </h4>
        </div>
      </div>
    </div>
    <DashboardMonthlySalesChart />
  </div>
</template>

<script>
import { endDate, startDate } from "~/utils";

export default {
  name: "DashboardOwner",
  data() {
    return {
      todaySummery: { total: 0, earning: 0 },
      monthlySummery: { total: 0, earning: 0 },
    };
  },
  computed: {
    todayDate() {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
        .format(new Date())
        .replace(/(\w{3}) (\w{3}) (\d{2}) (\d{4})/, "$1 $3, $2 $4");
    },
  },
  mounted() {
    this.fetchDashboard();
  },
  methods: {
    async fetchDashboard() {
      try {
        const body = {
          today: { start: startDate(), end: endDate() },
          monthly: {
            start: startDate(
              new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            ),
            end: endDate(
              new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            ),
          },
        };
        const { monthlySummery, todaySummery } =
          await this.$ownerApi.fetchDashboard(body);

        if (monthlySummery) this.monthlySummery = monthlySummery;
        if (todaySummery) this.todaySummery = todaySummery;
      } catch (error) {}
    },
  },
};
</script>
