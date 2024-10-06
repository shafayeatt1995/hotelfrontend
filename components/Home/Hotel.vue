<template>
  <div class="bg-white dark:bg-gray-800 py-20">
    <div class="container relative mx-auto">
      <h3
        class="md:mb-4 mb-2 md:text-5xl text-3xl font-bold text-center text-gray-800 dark:text-white"
      >
        Top Hotels at
        <span
          class="font-kaushan text-indigo-900 dark:text-indigo-500 block md:inline-block"
          >Cholozai</span
        >
      </h3>

      <p
        class="text-grey-600 dark:text-white text-center mb-6 text-sm md:text-base"
      >
        Thinking of traveling? We’ll arrange best hotels within your budget!
      </p>
      <div class="my-8 px-2 md:px-0">
        <div
          class="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
        >
          <Hotel
            v-for="(hotel, key) in hotels"
            :key="`${key}_`"
            :hotel="hotel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHotel",
  props: { hotels: Array },
};
</script>
