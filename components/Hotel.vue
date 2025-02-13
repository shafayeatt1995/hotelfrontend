<template>
  <div
    class="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200"
  >
    <div class="flex flex-col h-full">
      <ClientOnly>
        <Carousel :nav="false" :dots="false" :items="1" class="relative group">
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
              class="absolute top-[50%] right-0 opacity-0 z-[1] bg-indigo-100 text-indigo-600 size-10 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200 flex justify-center items-center -mt-5 group-hover:opacity-100 group-hover:right-4"
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
            v-for="(image, key) in images"
            :key="key"
          >
            <nuxt-img
              :src="image"
              :alt="hotel.name"
              width="540"
              height="420"
              format="webp"
              class="h-72 w-full object-cover rounded-t-2xl cursor-pointer"
              loading="lazy"
              decode="async"
            />
          </nuxt-link>
        </Carousel>
      </ClientOnly>
      <div class="backdrop-blur-2xl relative z-10 -mt-6 rounded-2xl p-3 flex-1">
        <div class="absolute right-7 -top-4">
          <Rating :rating="hotel.rating" />
        </div>
        <div class="flex flex-col justify-between">
          <div>
            <nuxt-link
              class="text-2xl font-bold inline-block pt-4 text-gray-800"
              :to="{
                name: 'hotel-slug',
                params: { slug: hotel.slug },
                query: { ...$route.query },
              }"
            >
              {{ hotel.name }}
            </nuxt-link>
            <p class="text-gray-700 mb-2 text-sm">
              <i class="fa-solid fa-location-dot"></i> {{ hotel.address }}
            </p>
          </div>
          <div class="flex items-end text-gray-700 text-center gap-1">
            <p class="text-2xl font-black">
              <del
                class="text-red-500 mr-1"
                v-if="hotel?.minPriceDiscount && hotel.minPriceDiscount > 0"
              >
                {{ $taka
                }}{{ hotel.minPrice + hotel.minPriceDiscount || 0 | currency }}
              </del>

              {{ $taka }}{{ hotel.minPrice || 0 | currency }}
            </p>
            <p>Per night</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-end px-4 pb-4 mt-6">
        <div class="flex gap-3">
          <Wishlist :hotelID="hotel._id" />
          <ShareButton :shareData="hotel" />
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { arrayConverter } from "@/utils";
export default {
  name: "Hotel",
  props: { hotel: Object },
  data() {
    return { showItems: 6 };
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
    getFacility(id) {
      return this.facilities.find(({ _id }) => _id === id);
    },
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
      this.showItems = this.showItems === 999 ? 6 : 999;
    },
  },
};
</script>
