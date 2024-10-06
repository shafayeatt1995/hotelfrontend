<template>
  <div class="dark:bg-gray-800 bg-white py-20">
    <div class="px-2 md:px-0">
      <section
        class="container mx-auto bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden md:px-8 md:py-14 px-4 py-4 text-gray-800 relative"
      >
        <Dot class="absolute top-0 left-0 hidden md:block text-indigo-400" />
        <Bg class="absolute right-0 bottom-0 hidden md:block" />
        <div class="relative z-10">
          <h1
            class="text-center font-bold lg:text-6xl md:text-4xl text-[26px] text-gray-800 dark:text-white"
          >
            Subscribe & Get Special
            <p>
              Discount at
              <span class="font-kaushan text-indigo-900 dark:text-indigo-500"
                >Cholozai!</span
              >
            </p>
          </h1>
          <p
            class="text-center text-gray-700 md:mt-4 my-1 lg:px-0 md:px-32 dark:text-white"
          >
            Join Cholozai mailing list today to receive exclusive offers,
            discounts, updates & our latest deals!
          </p>
          <div class="flex justify-center md:mt-16 mt-8 mb-8 w-full">
            <form
              class="bg-white flex gap-4 items-center p-2 rounded-md lg:w-1/2 md:w-2/3 w-full"
              @submit.prevent="submit"
            >
              <input
                type="email"
                class="h-10 focus:outline-none flex-1"
                placeholder="Type your email"
              />
              <Button rounded type="submit" :loading="loading"
                ><i class="fas fa-chevron-right"></i
              ></Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Dot from "@/static/icons/newsletter-dot.svg";
import Bg from "@/static/icons/newsletter-bg.svg";
export default {
  name: "Newsletter",
  components: { Dot, Bg },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$nuxt.$emit(
            "success",
            "Email are successfully added to the list"
          );
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
