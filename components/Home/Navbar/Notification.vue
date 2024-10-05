<template>
  <div
    class="absolute z-10 bg-white right-0 mt-1 w-96 rounded-xl border overflow-hidden"
  >
    <div class="flex justify-between items-center p-4">
      <p class="text-lg font-semibold">Notification</p>
      <p class="text-indigo-600 text-sm cursor-pointer">Clear all</p>
    </div>
    <hr />
    <div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
      <div
        class="p-4 cursor-pointer hover:bg-gray-100 transition-all duration-200"
      >
        <p class="text-base font-bold mb-2">
          New! Booking flights from New York ✈️
        </p>
        <p>
          Find the flexible ticket on flights around the world. Start searching
          today
        </p>
        <p class="text-xs">- 05 Feb 2024</p>
      </div>
      <div
        class="p-4 cursor-pointer hover:bg-gray-100 transition-all duration-200"
      >
        <p class="text-base font-bold mb-2">
          Sunshine saving are here 🌞 save 30% or more on a stay
        </p>
        <p>
          Find the flexible ticket on flights around the world. Start searching
          today
        </p>
        <p class="text-xs">- 24 Aug 2024</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
};
</script>
