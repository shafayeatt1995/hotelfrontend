<template>
  <div>
    <div class="mt-10">
      <h2 class="text-3xl font-bold text-gray-800">Customer Review</h2>
      <hr class="mt-2 mb-4" />
      <div
        class="bg-gray-100 grid grid-cols-5 rounded-xl px-5 py-10 text-gray-800 gap-4"
      >
        <div
          class="flex justify-center items-center md:col-span-2 col-span-full"
        >
          <div>
            <Skeleton v-if="loading" class="w-full h-16 mb-3" />
            <h3 class="text-6xl font-bold mb-3" v-else>
              {{ hotel.rating | decimal }}
            </h3>
            <Skeleton v-if="loading" class="w-full h-5 mb-2" />
            <p v-else>Based on {{ summary?.totalReviews || 0 }} Reviews</p>
            <Skeleton v-if="loading" class="w-full h-5" />
            <div class="flex justify-center" v-else>
              <Rating :rating="hotel.rating" basic star0 />
            </div>
          </div>
        </div>
        <div class="md:col-span-3 col-span-full">
          <div class="grid xl:grid-cols-3 grid-cols-2 gap-y-8">
            <Rating
              :rating="summary?.avgBedRoom || 0"
              basic
              label="Room condition"
              :loading="loading"
              star0
            />
            <Rating
              :rating="summary?.avgWashroom || 0"
              basic
              label="Washrooms & Toilets"
              :loading="loading"
              star0
            />
            <Rating
              :rating="summary?.avgStaff || 0"
              basic
              label="Staff behavior"
              :loading="loading"
              star0
            />
            <Rating
              :rating="summary?.avgFacility || 0"
              basic
              label="Overall facilities"
              :loading="loading"
              star0
            />
            <Rating
              :rating="summary?.avgLocation || 0"
              basic
              label="Location"
              :loading="loading"
              star0
            />
            <Rating
              :rating="summary?.avgValueForMoney || 0"
              basic
              label="Value For Money"
              :loading="loading"
              star0
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <div v-for="(review, key) in items" :key="key">
        <div class="flex gap-3 text-gray-700 mt-6 mb-2">
          <div class="flex w-16">
            <img
              :src="review?.user?.avatar"
              class="size-16 rounded-full"
              :alt="review?.user?.name"
            />
          </div>
          <div class="flex-1">
            <div class="flex justify-between mb-3">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800">
                  {{ review?.user?.name }}
                </h4>
                <p class="text-sm">
                  Review posted on {{ review.created_at | fullDate("/") }}
                </p>
              </div>
              <div class="flex items-start">
                <Rating :rating="review.rating" mode="badge" />
              </div>
            </div>
            <div>{{ review.message }}</div>
          </div>
        </div>
        <hr v-if="items.length !== ++key" />
      </div>
      <div class="flex justify-center mt-5" v-if="showLoadMore">
        <Button
          variant="lightIndigo"
          @click.native.prevent="fetchReview"
          :loading="loading"
          >Load more</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerReview",
  props: { hotel: Object },
  data() {
    return {
      hasScrolled: false,
      showLoadMore: true,
      loading: false,
      items: [],
      perPage: 5,
      summary: {
        totalReviews: 0,
        avgStaff: 0,
        avgFacility: 0,
        avgLocation: 0,
        avgValueForMoney: 0,
        avgBedRoom: 0,
        avgWashroom: 0,
      },
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    async onScroll() {
      if (!this.hasScrolled && window.scrollY >= 400) {
        this.hasScrolled = true;
        await Promise.all([this.fetchReview(), this.fetchReviewSummary()]);
      }
    },
    async fetchReview() {
      try {
        this.loading = true;
        const { _id } = this.hotel;
        const body = {
          hotelID: _id,
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
        };
        if (Number.isInteger(body.page)) {
          const { items } = await this.$commonApi.fetchReview(body);
          this.items = this.items.concat(items);
          if (items.length !== this.perPage) this.showLoadMore = false;
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async fetchReviewSummary() {
      try {
        const { _id: hotelID } = this.hotel;
        const { summary } = await this.$commonApi.fetchReviewSummary({
          hotelID,
        });
        if (summary) this.summary = summary;
      } catch (error) {}
    },
  },
};
</script>
