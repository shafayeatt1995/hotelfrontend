<template>
  <div class="container mx-auto">
    <HomeSearch class="my-5" />
    <div class="flex xl:gap-8 lg:gap-5 gap-8">
      <div
        class="w-72 fixed lg:relative z-50 lg:z-0 transition-all duration-300 top-0 lg:top-auto lg:left-auto"
        :class="showFilter ? ' left-0' : '-left-full'"
      >
        <SearchFilter @search="fetchSearchHotels" />

        <div
          class="absolute -right-5 top-1/2 size-10 rounded-full bg-white flex justify-center items-center lg:hidden"
          @click="showFilter = false"
        >
          <i class="fas fa-chevron-left"></i>
        </div>
      </div>
      <div class="flex-1 px-2 md:px-0">
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-2 bg-white border border-gray-300 mb-5 rounded-xl md:px-4 px-2"
        >
          <p class="font-semibold text-gray-800 -mb-3 mt-2 md:mb-0 md:mt-0">
            Total {{ total }} hotels found
          </p>
          <div class="flex gap-3 items-center w-full md:w-auto">
            <div class="flex-1">
              <Input
                class="mt-3 w-full"
                v-for="(field, i) in inputFields"
                :key="i"
                :field="field"
                v-model="form"
                :errors="{}"
              />
            </div>
            <div class="my-4 hidden md:flex">
              <i
                class="fas fa-bars text-xl px-3 py-[6px] rounded-l-lg cursor-pointer"
                :class="
                  view === 'line'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                "
                @click="view = 'line'"
              ></i>
              <i
                @click="view = 'grid'"
                class="fas fa-border-all text-xl px-3 py-[6px] rounded-r-lg cursor-pointer"
                :class="
                  view === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                "
              ></i>
            </div>
            <Button
              class="lg:hidden"
              @click.native.prevent="showFilter = !showFilter"
            >
              <i class="fa-solid fa-filter"></i> Filter
            </Button>
          </div>
        </div>
        <template v-if="hotels.length">
          <template v-if="view === 'grid' || isOnlyMobile">
            <div class="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              <Hotel
                v-for="(hotel, key) in hotels"
                :key="`${key}_`"
                :hotel="hotel"
              />
            </div>
          </template>
          <template v-else-if="view === 'line'">
            <div class="flex flex-col gap-6">
              <WideHotel
                v-for="(hotel, key) in hotels"
                :key="`${key}_`"
                :hotel="hotel"
              />
            </div>
          </template>
          <div class="flex justify-center">
            <Button
              class="px-20 my-5"
              :loading="loading"
              @click.native.prevent="fetchSearchHotels"
              v-if="!fullLoad"
              >Load more</Button
            >
          </div>
        </template>
        <div class="flex justify-center py-10 w-full" v-else-if="loading">
          <Loading />
        </div>
        <div v-else-if="!loading">
          <div ref="emptyHotel"></div>
          <h2 class="text-4xl font-bold text-center text-gray-800">
            No hotel found
          </h2>
        </div>
        <div class="w-full" v-if="loading" ref="searchFetching"></div>
      </div>
    </div>
    <Overlay v-model="showFilter" clickable />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { changeRoute, setItem, getItem, timezone, initLottie } from "@/utils";
export default {
  name: "HotelSearch",
  auth: false,
  head() {
    return {
      title: `Search - ${this.$pageTitle}`,
      meta: [
        {
          name: "robots",
          content: "noindex, nofollow",
        },
      ],
    };
  },
  data() {
    return {
      showFilter: false,
      available: true,
      fullLoad: true,
      perPage: 12,
      loading: false,
      hotels: [],
      view: "line",
      form: {
        sort: this.$route.query?.sort
          ? JSON.parse(this.$route.query?.sort)
          : "",
      },
      total: 0,
    };
  },
  computed: {
    ...mapGetters(["isOnlyMobile"]),
    inputFields() {
      return [
        {
          type: "select",
          name: "sort",
          options: [
            {
              label: "Recommended",
              value: "",
            },
            {
              label: "Price: Low->High",
              value: { minPrice: 1 },
            },
            {
              label: "Price: High->Low",
              value: { minPrice: -1 },
            },
            {
              label: "Rating: Low->High",
              value: { rating: 1 },
            },
            {
              label: "Rating: High->Low",
              value: { rating: -1 },
            },
          ],
        },
      ];
    },
  },
  watch: {
    "$route.query": {
      handler(newQuery, oldQuery) {
        this.resetFetch(newQuery);
      },
      immediate: true,
      deep: true,
    },
    form: {
      handler(val) {
        changeRoute.call(this, { sort: JSON.stringify(val.sort) });
      },
      deep: true,
    },
    view(val) {
      setItem("searchView", val);
    },
  },
  mounted() {
    this.fetchSearchHotels();
    this.view = getItem("searchView", "line");
    // initLottie(this.$refs.searchFetching, "/lottie/fetching.json");
  },
  methods: {
    async fetchSearchHotels() {
      if (this.available) {
        try {
          this.available = false;
          this.loading = true;
          const body = {
            ...this.$route.query,
            timezone,
            perPage: this.perPage,
            page: this.hotels.length / this.perPage + 1,
          };
          const { hotels, total } = await this.$commonApi.fetchSearchHotels(
            body
          );
          this.hotels = this.hotels.concat(hotels);
          this.total = total;
          this.fullLoad = hotels.length !== this.perPage;
          if (total === 0) {
            initLottie(this.$refs.emptyHotel, "/lottie/empty.json");
          }
        } catch (error) {
        } finally {
          this.loading = false;
          this.available = true;
        }
      }
    },
    resetFetch() {
      this.loading = true;
      this.hotels = [];
      this.fetchSearchHotels();
    },
  },
};
</script>
