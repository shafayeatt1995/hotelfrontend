<template>
  <div class="bg-white dark:bg-gray-900 py-20">
    <div class="container relative mx-auto">
      <h3
        class="md:mb-4 mb-2 md:text-5xl text-3xl font-bold text-center text-gray-800 dark:text-white"
      >
        Top Destinations at
        <span class="font-kaushan text-indigo-900 dark:text-indigo-500">
          Cholozai
        </span>
      </h3>

      <p
        class="text-grey-600 dark:text-white text-center mb-6 text-sm md:text-base"
      >
        Thinking of traveling? We’ll arrange best hotels within your budget!
      </p>

      <div class="w-full my-8 gap-5 px-2 md:px-0">
        <client-only>
          <Carousel
            :margin="25"
            :nav="false"
            :dots="false"
            :autoplay="true"
            :autoplayTimeout="2000"
            :autoplayHoverPause="true"
            :responsive="{
              0: { items: 1 },
              600: { items: 2 },
              768: { items: 3 },
              1280: { items: 4 },
            }"
          >
            <nuxt-link
              :to="{ name: 'search-hotels', query: { search: location.name } }"
              v-for="(location, key) in locations"
              :key="key"
              class="relative overflow-hidden rounded-xl cursor-pointer block aspect-[10/14]"
            >
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 z-10"
              >
                <p class="text-white font-semibold text-xl pl-4 py-2">
                  {{ location.name }}
                </p>
              </div>
              <nuxt-img
                :src="location.image"
                :alt="`${location.name} image`"
                format="webp"
                class="object-cover w-full h-full scale-100 hover:scale-110 transition-all duration-300"
                loading="lazy"
                decode="async"
              />
            </nuxt-link>
          </Carousel>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopDestination",
  props: { locations: Array },
};
</script>
