<template>
  <div class="py-10 bg-gray-50">
    <div class="container relative mx-auto">
      <div class="my-8 px-2 md:px-0 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div
          class="flex flex-col justify-center text-gray-800 items-center gap-4 rounded-xl p-4"
          :class="service.bg"
          v-for="(service, key) in services"
          :key="key"
        >
          <i :class="service.icon" class="text-4xl"></i>
          <div class="">
            <h3 class="text-2xl font-bold text-center">{{ service.title }}</h3>
            <p class="text-gray-700 text-center">{{ service.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeService",
  data() {
    return {
      services: [
        {
          icon: "fas fa-headset text-orange-600",
          title: "24x7 Help",
          subtitle:
            "We are available anytime you need us. Our support team is here for you around the clock.",
          bg: "bg-orange-100",
        },
        {
          icon: "far fa-credit-card text-green-600",
          title: "Payment Trust",
          subtitle:
            "Your payments are always safe with us. We use secure and reliable payment methods.",
          bg: "bg-green-100",
        },
        {
          icon: "far fa-newspaper text-cyan-600",
          title: "Easy Booking",
          subtitle:
            "Booking process made simple for you. Our system is designed to make booking as simple as possible.",
          bg: "bg-cyan-100",
        },
        {
          icon: "fas fa-percent text-indigo-600",
          title: "Exclusive Offers",
          subtitle:
            "Take advantage of our exclusive offers. Enjoy special discounts and promotions.",
          bg: "bg-indigo-100",
        },
      ],
    };
  },
};
</script>
