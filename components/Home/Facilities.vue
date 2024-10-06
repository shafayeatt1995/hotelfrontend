<template>
  <div class="py-20 bg-white dark:bg-gray-800">
    <div class="container relative mx-auto">
      <h3
        class="md:mb-4 mb-2 md:text-5xl text-3xl font-bold text-center text-gray-800 dark:text-white"
      >
        Find hotels by facilities at
        <span class="font-kaushan text-indigo-900 dark:text-indigo-500">
          Cholozai
        </span>
      </h3>

      <p
        class="text-grey-600 dark:text-white text-center mb-6 text-sm md:text-base"
      >
        Find the perfect hotel with the facilities you desire!
      </p>

      <div class="my-8 px-2 md:px-0">
        <client-only v-if="sortFacilities.length">
          <Carousel
            class="relative group"
            :margin="25"
            :nav="false"
            :dots="false"
            :autoplay="true"
            :autoplayTimeout="2000"
            :autoplayHoverPause="true"
            :responsive="{
              0: { items: 2 },
              768: { items: 4 },
              1280: { items: 6 },
            }"
          >
            <template #prev>
              <button
                ref="prevButton"
                class="absolute top-[50%] left-0 opacity-0 z-[2] bg-indigo-100 text-indigo-600 size-12 text-xl rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200 flex justify-center items-center -mt-5 group-hover:opacity-100 group-hover:left-1"
                aria-label="Submit"
              >
                <i class="fa-solid fa-chevron-left"></i>
              </button>
            </template>
            <template #next>
              <button
                ref="nextButton"
                class="absolute top-[50%] right-0 opacity-0 z-[1] bg-indigo-100 text-indigo-600 size-12 text-xl rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200 flex justify-center items-center -mt-5 group-hover:opacity-100 group-hover:right-1"
                aria-label="Submit"
              >
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </template>
            <nuxt-link
              v-for="(facility, key) in sortFacilities"
              :key="key"
              class="bg-gray-100 min-h-full rounded-xl py-5 block"
              :to="{
                name: 'search-hotels',
                query: { facilities: [facility._id] },
              }"
            >
              <div class="flex justify-center">
                <div
                  v-html="facility.icon"
                  class="facility-icon size-24 bg-white text-gray-800 flex justify-center items-center rounded-full"
                ></div>
              </div>
              <p class="text-center mt-3 capitalize font-semibold text-xl">
                {{ facility.name }}
              </p>
            </nuxt-link>
          </Carousel>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeFacilities",
  computed: {
    ...mapGetters(["facilities"]),
    sortFacilities() {
      const facility = [...this.facilities];
      return facility
        .filter(
          (facility) => facility.icon !== '<i class="fa-solid fa-check"></i>'
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  mounted() {
    this.fetchAllFacilitiesOnce();
  },
  methods: {
    ...mapActions(["fetchAllFacilitiesOnce"]),
  },
};
</script>

<style lang="scss">
.facility-icon {
  i,
  svg {
    height: 50px;
    width: 50px;
    font-size: 40px;
    text-align: center;
  }
}
</style>
