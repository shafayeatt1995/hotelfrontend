<template>
  <Profile>
    <div class="border border-gray-300 rounded-xl mb-6">
      <h1 class="md:text-4xl text-3xl text-gray-800 md:p-4 p-2 font-bold">
        My Wishlist
      </h1>
      <hr />
      <div class="md:p-4 p-2">
        <template v-if="items.length">
          <div class="flex-col gap-6 hidden md:flex">
            <WideHotel
              v-for="(hotel, key) in items"
              :key="`${key}_`"
              :hotel="hotel"
            />
          </div>
          <div class="flex flex-col gap-6 md:hidden">
            <Hotel
              v-for="(hotel, key) in items"
              :key="`${key}_`"
              :hotel="hotel"
            />
          </div>
          <div class="" v-if="items.length && !fullLoad"></div>
        </template>
        <div v-else>
          <div ref="emptyBooking"></div>
          <p class="text-center text-gray-800 text-3xl font-bold">
            No wishlist found
          </p>
        </div>
      </div>
    </div>
  </Profile>
</template>

<script>
import { initLottie, paginate, startDate } from "@/utils";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "WishlistPage",
  head() {
    return { title: `Wishlist - ${this.$pageTitle}` };
  },
  data() {
    return {
      fullLoad: false,
      loading: false,
      items: [],
      perPage: 6,
    };
  },
  computed: {
    ...mapGetters("wishlist", ["wishlists"]),
  },
  async mounted() {
    await this.fetchWishlistOnce();
    await this.fetchItems();
  },
  methods: {
    ...mapActions("wishlist", ["fetchWishlistOnce"]),
    async fetchItems() {
      try {
        if (!this.fullLoad) {
          this.loading = true;
          let body = {
            hotelIDs: this.wishlists.map(({ hotelID }) => hotelID),
            ...paginate(this.items, this.perPage),
          };
          const { items } = await this.$userApi.fetchWishlists(body);
          this.items = this.items.concat(items);
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
