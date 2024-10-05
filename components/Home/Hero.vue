<template>
  <section class="h-dvh bg-cover bg-center relative">
    <div class="w-screen h-dvh absolute top-0 left-0">
      <nuxt-img
        src="/images/bg/11.webp"
        alt="Hero bg"
        format="webp"
        class="object-cover inset-0 w-full h-full"
        loading="lazy"
        decode="async"
      />
    </div>
    <div class="absolute bg-gray-900/20 h-full w-full top-0 left-0"></div>
    <div class="container mx-auto relative z-10 h-full">
      <div
        class="flex lg:justify-between items-center h-full flex-col lg:flex-row"
      >
        <div
          class="flex-1 flex flex-col md:justify-end justify-center px-2 md:px-0"
        >
          <h1
            class="font-black lg:text-6xl xl:text-7xl md:text-8xl text-[42px] leading-10 text-white font-kaushan mt-5"
          >
            Find Your Hotel at
            <span class="relative">
              Affordable Price!
              <span
                class="absolute lg:top-16 xl:top-20 left-0 mt-4 text-indigo-600 hidden-in-firefox"
              >
                <LineIcon class="lg:w-96 xl:w-[450px]" />
              </span>
            </span>
          </h1>
          <h2 class="md:text-xl text-sm text-white font-semibold md:mt-8 mt-4">
            With CholoZai, find premium accommodations at affordable prices.
            Enjoy an exceptional stay without compromising on quality. Discover
            luxury within your budget.
          </h2>
        </div>
        <div
          class="flex-1 justify-center items-center hidden md:flex md:-mt-16 lg:mt-0"
        >
          <button
            class="text-6xl border-[6px] border-white text-white size-32 rounded-full justify-center items-center flex hidden"
            aria-label="Submit"
          >
            <i class="fas fa-play"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="video" v-if="show">
      <div
        class="fixed inset-0 z-50 bg-black/80 flex justify-center items-center"
      >
        <div>
          <div class="flex justify-end text-2xl text-white">
            <button class="p-2" @click="show = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/O_xFSe4fZuA?si=x8ON5sa6dOXaUaYN"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LineIcon from "@/static/icons/line.svg";
export default {
  name: "hero",
  components: { LineIcon },
  data() {
    return {
      show: false,
    };
  },
};
</script>
