<template>
  <Profile>
    <div class="border border-gray-300 rounded-xl mb-6">
      <h1 class="text-4xl text-gray-800 p-4 font-bold">My Booking</h1>
      <hr />
      <div class="pt-2">
        <TabTitle
          :tabTitle="tabTitle"
          v-model="active"
          fullWidth
          class="flex-1"
        />
        <div class="md:p-4 p-2">
          <h1 class="text-2xl font-bold text-gray-800 mb-3">
            {{ active }} booking ({{ total }})
          </h1>

          <div class="flex flex-col gap-4">
            <div class="w-full" v-show="loading" ref="fetching"></div>
            <template v-if="items.length">
              <ProfileBooking
                v-for="(item, key) in items"
                :key="key"
                :booking="item"
                @refetch="refetch"
              />
            </template>
            <div class="" v-else>
              <div class="" ref="emptyBooking"></div>
              <h2
                class="text-3xl font-bold text-center text-gray-800 my-4 capitalize"
                v-if="!loading"
              >
                No {{ active }} booking found
              </h2>
            </div>
          </div>
        </div>

        <div class="flex justify-center mb-4" v-if="items.length && !fullLoad">
          <Button :loading="loading" @click.native.prevent="fetchItems"
            >Load More</Button
          >
        </div>
      </div>
    </div>
  </Profile>
</template>

<script>
import { initLottie, paginate, startDate } from "@/utils";

export default {
  name: "BookingPage",
  head() {
    return { title: `Booking - ${this.$pageTitle}` };
  },
  data() {
    return {
      fullLoad: false,
      loading: false,
      items: [],
      total: 0,
      perPage: 5,
      tabTitle: [
        { title: "Upcoming", icon: "fas fa-business-time" },
        { title: "Pending", icon: "far fa-clock" },
        { title: "Complete", icon: "far fa-circle-check" },
        { title: "Cancel", icon: "far fa-circle-xmark" },
        { title: "Refund", icon: "far fa-file-lines" },
      ],
      active: this.$route.query?.tab || "Upcoming",
    };
  },
  computed: {
    status() {
      if (this.active === "Upcoming") return "complete";
      else if (this.active === "Complete") return "complete";
      else if (this.active === "Pending") return "pending";
      else if (this.active === "Refund") return "refund";
      else return "cancel";
    },
  },
  watch: {
    active(tab) {
      this.$router.push({ query: { tab } });
      this.refetch();
    },
  },
  mounted() {
    this.fetchItems();
    initLottie(this.$refs.fetching, "/lottie/fetching.json");
  },
  methods: {
    async fetchItems() {
      try {
        if (!this.fullLoad) {
          this.loading = true;
          let body = {
            ...paginate(this.items, this.perPage),
          };
          if (this.status) {
            body.status = this.status;
          }
          if (this.active === "Upcoming") {
            body.date = startDate();
          }
          const { items, total } = await this.$userApi.fetchBooking(body);
          this.items = this.items.concat(items);
          this.total = total;
          this.fullLoad = items.length !== this.perPage;
          if (items.length === 0) {
            initLottie(this.$refs.emptyBooking, "/lottie/empty.json");
          }
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    refetch() {
      this.fullLoad = false;
      this.items = [];
      this.total = 0;
      this.fetchItems();
    },
  },
};
</script>
