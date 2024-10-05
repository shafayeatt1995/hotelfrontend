<template>
  <div class="container mx-auto mb-20 mt-32">
    <div class="flex flex-col lg:flex-row justify-between gap-10">
      <div
        class="flex-1 md:pr-10 md:mb-12 px-2 md:px-0 overflow-x-clip md:overflow-x-visible"
      >
        <div class="relative">
          <client-only>
            <ServiceStar
              class="absolute z-10 top-0 left-0 text-amber-400 -translate-x-1/2 -translate-y-1/2 size-20"
            />
            <ServiceDot
              class="absolute h-96 md:-bottom-12 md:-right-10 -bottom-4 -right-12 text-indigo-400"
            />
          </client-only>
          <img
            src="/images/bg/service.webp"
            alt="service-bg"
            class="h-[600px] w-full object-cover rounded-xl relative object-left"
          />
        </div>
      </div>
      <div class="flex-1 px-2">
        <h2
          class="xl:text-6xl md:text-5xl text-3xl font-bold text-gray-800 text-center md:text-left"
        >
          Best Holidays Start at
          <span class="font-kaushan text-indigo-900 block md:inline-block"
            >Cholozai!</span
          >
        </h2>
        <h3 class="text-gray-700 text-sm md:text-base text-center md:text-left">
          Book your hotel with us & Enjoy fantastic deals on your stay. Enjoy
          great savings with our special deals.
        </h3>
        <div class="grid md:grid-cols-2 mt-12 gap-x-6 gap-y-8">
          <div
            class="flex flex-col items-center md:items-start"
            v-for="(service, key) in services"
            :key="key"
          >
            <i
              :class="service.icon"
              class="size-16 rounded-full flex justify-center items-center text-2xl"
            ></i>
            <h3 class="text-2xl font-bold text-gray-800 mt-4">
              {{ service.title }}
            </h3>
            <p class="text-gray-700 text-center md:text-left">
              {{ service.details }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceDot from "@/static/icons/service-dot.svg";
import ServiceStar from "@/static/icons/service-star.svg";
export default {
  name: "homeDeals",
  components: { ServiceDot, ServiceStar },
  data() {
    return {
      services: [
        {
          title: "Quality Food",
          details:
            "Departure defective arranging rapturous did. Conduct denied adding worthy little.",
          icon: "fas fa-utensils text-orange-500 bg-orange-100",
        },
        {
          title: "Quick Services",
          details: "Supposing so be resolving breakfast am or perfectly.",
          icon: "fas fa-stopwatch text-red-500 bg-red-100",
        },
        {
          title: "High Security",
          details: "Arranging rapturous did believe him all had supported.",
          icon: "fa-solid fa-shield-halved text-green-500 bg-green-100",
        },
        {
          title: "24 Hours Alert",
          details: "Rapturous did believe him all had supported.",
          icon: "fa-solid fa-bolt text-cyan-500 bg-cyan-100",
        },
      ],
    };
  },
};
</script>
