<template>
  <Modal v-model="adModal" size="fixed">
    <template #body>
      <div class="py-5">
        <p class="text-8xl text-yellow-500 text-center">🥺</p>
        <h2
          class="text-4xl font-bold mt-4 text-gray-800 dark:text-white text-center"
        >
          Help Us to serve you better content
        </h2>
        <h3 class="text-gray-700 my-2 dark:text-white text-center">
          Please disable your AdBlocker or allow ads in this site. It will help
          us serve you better, Thanks.
        </h3>
        <div class="flex justify-center mt-12 items-center">
          <Button class="w-1/2" @click.native.prevent="hideAds">
            I understand 👍
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
export default {
  name: "AdModal",
  data() {
    return {
      adModal: false,
    };
  },
  mounted() {
    setTimeout(() => {
      if (window.adsbygoogle) {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        this.adModal = true;
      }
    }, 4000);
  },
  methods: {
    hideAds() {
      this.adModal = false;
    },
  },
};
</script>
