<template>
  <Modal v-model="adModal" size="fixed">
    <template #title>
      <div class="absolute right-5 top-5">
        <button
          class="text-gray-800 px-4 py-2 rounded-lg transition-all duration-200"
          @click="adModal = false"
        >
          <i class="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </template>
    <template #body>
      <div class="py-5">
        <p class="text-4xl md:text-8xl text-yellow-500 text-center">🇧🇩❤️🤝🇵🇸</p>
        <h2
          class="text-2xl md:text-3xl font-bold mt-4 text-gray-800 dark:text-white text-center"
        >
          <!-- Help Us to serve you better content -->
          আল্লাহ, ফিলিস্তিনবাসীর উপর রহমত ও দয়া বর্ষণ করুন 🤲
        </h2>
        <h3 class="text-gray-700 my-2 dark:text-white text-center">
          <!-- Please disable your AdBlocker or allow ads in this site. It will help
          us serve you better, Thanks. -->
          <span class="font-bold">"হে আল্লাহ!</span>
          <br />
          আপনি ফিলিস্তিনবাসীর সহায় হন।
          <br />
          তাদের মধ্যে সাহস ও শক্তি প্রদান করুন।
          <br />
          তাদের সকল কষ্ট দূর করুন এবং শান্তি প্রদান করুন।
          <br />
          তাদের পরিবারকে হেফাজত করুন।
          <br />
          হে আল্লাহ, আপনি ফিলিস্তিনবাসীর উপর অসীম রহমত ও দয়া বর্ষণ করুন।
          <br />
          <br />
          <span class="font-bold">"হে ন্যায়বিচারক!</span>
          <br />
          আপনি ইসরাইলকে তার অন্যায় ও অত্যাচারের শাস্তি দিন।
          <br />
          তাদের অপরাধের জন্য তাদের কঠিন শাস্তি দিন।
          <br />
          আপনি তাদের কৃতকর্মের ফল সুস্পষ্ট করুন, এবং তাদের অন্যায়ের উপযুক্ত
          শাস্তির বাবস্থা করুণ।
          <br />
          হে আল্লাহ, আপনি সত্য ও ন্যায় প্রতিষ্ঠা করুন এবং পৃথিবীতে শান্তি ও
          ইনসাফ কায়েম করুন।
        </h3>
        <div class="flex justify-center mt-4 items-center">
          <Button class="w-1/2" @click.native.prevent="hideAds">
            <!-- I understand 👍 -->
            আল্লাহ হুমা আমিন 🤲
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AdModal",
  data() {
    return {
      adModal: false,
    };
  },
  computed: {
    ...mapGetters(["isDev"]),
  },
  mounted() {
    // window.adsbygoogle ? (adsbygoogle = window.adsbygoogle || []).push({}) : "";
    // setTimeout(() => {
    //   if (window.adsbygoogle) {
    //     (adsbygoogle = window.adsbygoogle || []).push({});
    //   } else {
    //     this.adModal = this.isDev ? false : true;
    //   }
    // }, 4000);
    setTimeout(() => {
      this.adModal = true;
    }, 5000);
  },
  methods: {
    hideAds() {
      this.adModal = false;
    },
  },
};
</script>
