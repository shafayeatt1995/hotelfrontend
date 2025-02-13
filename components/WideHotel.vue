<template>
  <div>
    <div
      class="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    >
      <div class="flex">
        <Carousel
          :nav="false"
          :dots="false"
          :items="1"
          class="relative group xl:max-w-96 max-w-80"
        >
          <template #prev>
            <button
              ref="prevButton"
              class="absolute top-[50%] left-0 opacity-0 z-[2] bg-indigo-100 text-indigo-600 size-10 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200 flex justify-center items-center -mt-5 group-hover:opacity-100 group-hover:left-4"
              aria-label="Submit"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>
          </template>
          <template #next>
            <button
              ref="nextButton"
              class="absolute top-[50%] right-5 opacity-0 z-[1] bg-indigo-100 text-indigo-600 size-10 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200 flex justify-center items-center -mt-5 group-hover:opacity-100 group-hover:right-11"
              aria-label="Submit"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </template>
          <nuxt-link
            :to="{
              name: 'hotel-slug',
              params: { slug: hotel.slug },
              query: { ...$route.query },
            }"
            class="flex"
            v-for="(image, key) in images"
            :key="key"
          >
            <nuxt-img
              v-for="(image, key) in images"
              :key="key"
              :src="image"
              :alt="hotel.name"
              width="540"
              height="420"
              format="webp"
              class="h-72 xl:w-96 w-80 object-cover rounded-l-2xl cursor-pointer"
              loading="lazy"
              decode="async"
            />
          </nuxt-link>
        </Carousel>
        <div
          class="backdrop-blur-3xl -ml-7 w-full flex flex-col relative z-[1] rounded-2xl p-4"
        >
          <div class="flex-1">
            <div class="flex flex-col justify-between">
              <div>
                <div class="flex justify-between gap-5">
                  <nuxt-link
                    :to="{
                      name: 'hotel-slug',
                      params: { slug: hotel.slug },
                      query: { ...$route.query },
                    }"
                    class="text-2xl font-bold text-gray-800 flex-1"
                  >
                    {{ hotel.name }}
                  </nuxt-link>

                  <div class="flex gap-3">
                    <Wishlist :hotelID="hotel._id" />
                    <ShareButton :shareData="hotel" />
                  </div>
                </div>
                <p class="text-gray-700 text-sm">
                  <i class="fa-solid fa-location-dot"></i> {{ hotel.address }}
                </p>
                <Rating :rating="hotel.rating" basic class="mt-1" />
                <div class="flex gap-x-4 gap-y-2 flex-wrap mt-4">
                  <template v-for="(facility, _) in getFacilities">
                    <div
                      v-if="_ < showItems"
                      :key="`${_}facility`"
                      class="flex items-center gap-1"
                    >
                      <p v-safe="facility?.icon" class="text-gray-800"></p>
                      <p class="text-gray-800">{{ facility?.name }}</p>
                    </div>
                  </template>
                  <p
                    class="text-indigo-600 cursor-pointer font-semibold"
                    @click="showAll"
                    v-if="getFacilities.length > 9"
                  >
                    <span v-if="showItems === 999"> Show less </span>
                    <span v-else>
                      +{{ getFacilities.length - showItems }} more
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-end text-gray-700 text-center gap-1">
              <p class="text-2xl font-black">
                <del
                  class="text-red-500 mr-1"
                  v-if="hotel?.minPriceDiscount && hotel.minPriceDiscount > 0"
                >
                  {{ $taka
                  }}{{
                    hotel.minPrice + hotel.minPriceDiscount || 0 | currency
                  }}
                </del>

                {{ $taka }}{{ hotel.minPrice || 0 | currency }}
              </p>
              <p>Per night</p>
            </div>
            <Button
              variant="lightIndigo"
              :to="{
                name: 'hotel-slug',
                params: { slug: hotel.slug },
                query: { ...$route.query },
              }"
              >View Details <i class="fa-solid fa-arrow-right-long"></i
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { arrayConverter } from "@/utils";
export default {
  name: "Hotel",
  props: { hotel: Object },
  data() {
    return {
      showItems: 9,
    };
  },
  computed: {
    ...mapGetters(["facilities"]),
    images() {
      return [
        ...arrayConverter(this.hotel.image),
        ...arrayConverter(this.hotel.images),
      ];
    },
    getFacilities() {
      return this.facilities.filter(({ _id }) =>
        (this.hotel.facilities || []).some((id) => _id === id)
      );
    },
  },
  mounted() {
    this.fetchAllFacilitiesOnce();
    this.$nextTick(() => {
      this.showNav();
    });
  },
  methods: {
    ...mapActions(["fetchAllFacilitiesOnce"]),
    showNav() {
      const prevButton = this.$refs.prevButton;
      const nextButton = this.$refs.nextButton;

      if (prevButton) {
        const prevSpan = prevButton.closest("span");
        if (prevSpan) {
          prevSpan.removeAttribute("style");
        }
      }

      if (nextButton) {
        const nextSpan = nextButton.closest("span");
        if (nextSpan) {
          nextSpan.removeAttribute("style");
        }
      }
    },
    showAll() {
      this.showItems = this.showItems === 999 ? 9 : 999;
    },
  },
};
</script>
