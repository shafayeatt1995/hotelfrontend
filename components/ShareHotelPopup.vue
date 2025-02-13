<template>
  <Modal v-model="modal" size="fixed">
    <template #title>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold leading-6 text-gray-700 capitalize">
          Share this hotel
        </h1>
        <CloseButton @click.native.prevent="modal = false" />
      </div>
    </template>
    <template #body>
      <div class="text-gray-700">
        <div>
          <div class="border border-indigo-600 p-4 rounded-xl mt-2">
            <div
              class="flex justify-between gap-3 flex-col-reverse md:flex-row"
            >
              <p class="text-2xl font-bold flex-1">
                {{ shareData.name }}
              </p>
              <Rating :rating="shareData.rating" basic />
            </div>
            <p>
              <i class="fa-solid fa-location-dot"></i> {{ shareData.address }}
            </p>
            <div class="flex items-end text-gray-700 text-center gap-1 mt-4">
              <p class="text-2xl font-black">
                <del
                  class="text-red-500 mr-1"
                  v-if="
                    shareData?.minPriceDiscount &&
                    shareData.minPriceDiscount > 0
                  "
                >
                  {{ $taka
                  }}{{
                    shareData.minPrice + shareData.minPriceDiscount ||
                    0 | currency
                  }}
                </del>

                {{ $taka }}{{ shareData.minPrice || 0 | currency }}
              </p>
              <p>Per night</p>
            </div>
          </div>
          <div class="flex my-3 gap-10 ml-1 mt-4">
            <a
              v-for="(share, key) in shareLinks"
              :key="key"
              :href="share.href"
              target="_blank"
              class="flex justify-center items-center"
            >
              <img :src="share.icon" :alt="share.icon" class="size-8" />
            </a>
          </div>
          <p>or copy this link</p>
          <div class="flex shadow-sm mb-1 mt-2">
            <input
              :value="link"
              readonly=""
              class="py-3 indent-2 rounded-s-lg focus:outline-none w-full border border-indigo-600"
              name="text"
              type="text"
            />
            <button
              class="rounded-e-lg text-white bg-indigo-600 flex justify-center items-center w-14"
              @click="copyUrl"
            >
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
export default {
  name: "ShareHotelPopup",
  data() {
    return {
      modal: false,
      shareData: {},
      link: "",
    };
  },
  computed: {
    shareLinks() {
      return [
        {
          href: `https://www.facebook.com/sharer/sharer.php?u=${this.link}`,
          icon: "/icons/facebook.svg",
        },
        {
          href: `https://www.messenger.com/t?link=${this.link}`,
          icon: "/icons/messenger.svg",
        },
        {
          href: `https://twitter.com/intent/tweet?url=$${this.link}`,
          icon: "/icons/twitter.svg",
        },
        {
          href: `whatsapp://send?text=${this.link}`,
          icon: "/icons/whatsapp.svg",
        },
      ];
    },
  },
  watch: {
    modal(val) {
      if (!val) this.reset();
    },
  },
  mounted() {
    this.$nuxt.$on("shareHotelPopup", (data) => {
      this.setData(data);
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("shareHotelPopup");
  },
  methods: {
    setData(data) {
      this.shareData = data;
      const domain = window.location.origin;
      this.link = `${domain}/hotel/${data.slug}`;
      this.modal = true;
    },
    copyUrl() {
      navigator.clipboard.writeText(this.link);
      this.$nuxt.$emit("success", "Link copied");
    },
    reset() {},
  },
};
</script>
