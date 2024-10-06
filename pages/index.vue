<template>
  <div class="">
    <HomeHero />
    <HomeSearch class="-mt-16" />
    <HomeDestination :locations="locations" />
    <HomeHotel :hotels="hotels" />
    <HomeService />
    <HomeFacilities />
    <HomeDeals />
    <HomeNewsletter />
    <a
      href="#"
      onclick="topFunction()"
      id="back-to-top"
      class="back-to-top fixed hidden text-lg rounded-md z-10 bottom-5 end-5 size-8 text-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white justify-center items-center"
      ><i class="mdi mdi-arrow-up"></i
    ></a>
  </div>
</template>

<script>
import { meta } from "@/utils";
import axios from "axios";

export default {
  name: "IndexPage",
  auth: false,
  head() {
    return {
      title: `All tours and travel tips and information - ${this.$pageTitle}`,
      meta: meta(),
    };
  },
  data() {
    return {
      locations: [],
      hotels: [],
    };
  },
  async asyncData({ error, store }) {
    try {
      const res = await axios.get(
        `${store.getters.apiUrl}/api/fetch/home-data`
      );
      if (res.data) {
        const { locations, hotels } = res.data;
        return { locations, hotels };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      console.error("Error fetching home data:", err.message);
      console.error("Error details:", err);
      error({
        statusCode: 500,
        message: "Something went wrong. Please try again",
      });
    }
  },
};
</script>
