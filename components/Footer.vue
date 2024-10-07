<template>
  <div class="bg-indigo-600 text-white md:py-8 py-10 px-2 md:px-0">
    <div class="container mx-auto">
      <div
        class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-10 gap-4 py-3"
      >
        <div>
          <nuxt-link :to="{ name: 'index' }" class="font-kaushan text-4xl flex">
            <img src="/images/white-logo.svg" alt="logo" class="h-10" />
            CholoZai
          </nuxt-link>
          <p class="leading-5 mt-3 text-sm">
            CholoZai is an easier hotel booking platform in Bangladesh, We are
            trying to making travel simple and accessible for everyone. Choose
            CholoZai for a hassle free hotel booking experience.
          </p>
        </div>
        <div>
          <p class="text-xl font-bold mb-1">Our links</p>

          <div class="grid grid-cols-2 gap-x-2">
            <nuxt-link
              :to="link.to"
              class="truncate"
              v-for="(link, key) in links"
              :key="key"
              >{{ link.name }}</nuxt-link
            >
          </div>
        </div>
        <div>
          <p class="text-xl font-bold mb-1">Need Help ?</p>
          <p class="">
            We are Always here for you! Knock us on Whatsapp anytime or Call our
            Hotline (10AM - 10PM).
          </p>
        </div>
        <div>
          <h4 class="text-xl font-bold mb-2">Contact us</h4>
          <div
            class="grid grid-cols-2 lg:grid-cols-1 gap-2 text-sm md:text-base items-center"
          >
            <div class="flex">
              <a href="mailto:info@cholozai.com"
                ><i class="fa-solid fa-at"></i> info@cholozai.com</a
              >
            </div>
            <div class="flex">
              <a href="tel:+8801595106884"
                ><i class="fa-solid fa-phone"></i> 01595-106884</a
              >
            </div>
            <div class="flex">
              <a href="https://wa.me/+8801595106884" target="_blank"
                ><i class="fab fa-whatsapp"></i> Whatsapp us</a
              >
            </div>
            <div class="flex gap-5 mt-3">
              <a
                href="https://www.facebook.com/cholozaiofficial/"
                target="_blank"
                class="size-10 rounded-full bg-indigo-300/50 flex justify-center items-center text-2xl"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCFdMA1LJXQDCIJ1WTYdp2Jg"
                target="_blank"
                class="size-10 rounded-full bg-indigo-300/50 flex justify-center items-center text-2xl"
                aria-label="Youtube"
              >
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      links: [
        { name: "About us", to: { name: "about" } },
        // { name: "FAQ", to: { name: "index" } },
        // { name: "Blog", to: { name: "index" } },
        // { name: "Promotion & offers", to: { name: "index" } },
        // { name: "Support", to: { name: "index" } },
        { name: "Terms & Conditions", to: { name: "terms" } },
        { name: "Refund policy", to: { name: "refund-policy" } },
        { name: "Privacy policy", to: { name: "privacy-policy" } },
        { name: "Contact us", to: { name: "contact" } },
      ],
    };
  },
};
</script>
