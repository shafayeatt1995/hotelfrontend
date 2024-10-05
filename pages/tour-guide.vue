<template>
  <div
    class="w-full h-screen"
    style="
      background-image: url('https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg');
    "
  >
    <div
      class="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8"
    >
      <div class="flex-1 flex flex-col items-center justify-center">
        <h1
          class="text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold mt-12 text-center"
        >
          Coming Soon
        </h1>
        <div class="flex flex-col items-center space-y-4 mt-24">
          <p class="text-gray-300 uppercase text-sm">
            Notify me when it's ready
          </p>
          <form class="w-full flex items-center">
            <input
              type="email"
              name="email"
              id="email"
              class="w-72 p-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-tl rounded-bl text-sm"
              placeholder="Email"
              autocomplete="off"
            />
            <button
              class="bg-indigo-600 hover:bg-indigo-700 py-2 px-6 text-gray-100 border border-indigo-600 rounded-tr rounded-br text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { meta } from "~/utils";

export default {
  auth: false,
  head() {
    const title = `Ultimate Tour Guide - ${this.$pageTitle}`;
    const description =
      "Discover top travel destinations, tips, and guides at Cholozai. Plan your next adventure with expert insights and comprehensive travel information for any location.";
    return {
      title,
      meta: meta({ title, description }),
    };
  },
};
</script>
