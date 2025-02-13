<template>
  <div class="fixed top-0 left-0 right-0 z-20">
    <div
      class="w-full backdrop-blur-md bg-white/30 dark:bg-black/70 lg:h-20 h-16 absolute left-0 top-0 right-0 z-10 shadow-lg"
    ></div>
    <div
      class="container mx-auto absolute top-0 left-0 right-0 z-20 lg:px-5 xl:px-0 px-2 lg:h-20 h-16"
    >
      <div class="flex justify-between items-center h-full">
        <nuxt-link
          :to="{ name: 'index' }"
          class="font-kaushan text-4xl text-indigo-900 flex items-center"
        >
          <img src="/full-logo-tr.webp" class="h-10" alt="logo" />
        </nuxt-link>
        <div class="flex items-center gap-4">
          <div class="flex lg:hidden items-center gap-4">
            <HomeNavbarLogin />
            <template>
              <svg
                @click="showMenu = !showMenu"
                width="30"
                height="34"
                viewBox="0 0 30 34"
                xmlns="http://www.w3.org/2000/svg"
                class="cursor-pointer"
              >
                <path
                  d="M0 6.375C0 5.19961 0.957589 4.25 2.14286 4.25H27.8571C29.0424 4.25 30 5.19961 30 6.375C30 7.55039 29.0424 8.5 27.8571 8.5H2.14286C0.957589 8.5 0 7.55039 0 6.375ZM0 17C0 15.8246 0.957589 14.875 2.14286 14.875H27.8571C29.0424 14.875 30 15.8246 30 17C30 18.1754 29.0424 19.125 27.8571 19.125H2.14286C0.957589 19.125 0 18.1754 0 17ZM30 27.625C30 28.8004 29.0424 29.75 27.8571 29.75H2.14286C0.957589 29.75 0 28.8004 0 27.625C0 26.4496 0.957589 25.5 2.14286 25.5H27.8571C29.0424 25.5 30 26.4496 30 27.625Z"
                  fill="black"
                />
              </svg>
            </template>
          </div>
          <div
            class="lg:items-center gap-3 flex flex-col lg:flex-row absolute lg:relative max-h-96 top-[64px] lg:top-auto bg-white/30 dark:bg-black/30 backdrop-blur-md lg:backdrop-blur-none lg:bg-transparent lg:dark:bg-transparent pb-5 lg:pb-0 transition-all duration-300"
            :class="
              showMenu
                ? 'left-0 right-0'
                : 'left-[200%] -right-[200%] lg:left-auto lg:right-auto'
            "
          >
            <nuxt-link
              :to="{ name: 'index' }"
              title="cholozai"
              class="px-3 py-2 text-sm font-medium dark:text-white text-indigo-900 hover:text-indigo-700"
              >Home</nuxt-link
            >
            <!-- <div
              class="relative text-left"
              v-click-outside="
                () => (showDivision ? (showDivision = false) : '')
              "
            >
              <button
                class="flex px-3 py-2 text-sm font-medium hover:text-indigo-700 gap-2 items-center"
                type="button"
                :class="
                  showDivision
                    ? 'text-indigo-600'
                    : 'dark:text-white text-indigo-900'
                "
                @click="showDivision = !showDivision"
              >
                <span>Divisions</span>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <transition name="fade" mode="out-in">
                <div
                  class="z-20 origin-top-left rounded-md focus:outline-none absolute left-0 right-0 top-11 md:top-[58px] w-full lg:w-48 shadow-lg dark:bg-gray-800 bg-white"
                  v-show="showDivision"
                >
                  <div
                    class="px-2 py-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1"
                  >
                    <div
                      v-for="(division, i) in divisions"
                      :key="i + division.name"
                    >
                      <nuxt-link
                        class="flex items-center space-x-2 px-3 py-2 text-sm lg:space-x-4 text-gray-700 hover:text-indigo-500 focus:text-indigo-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-all duration-200"
                        :to="{
                          name: 'division-name-page',
                          params: { name: division.slug, page: 1 },
                        }"
                        :title="division.name"
                        ><span> {{ division.name }}</span></nuxt-link
                      >
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div
              class="relative text-left"
              v-click-outside="
                () => (showDistrict ? (showDistrict = false) : '')
              "
            >
              <button
                class="flex px-3 py-2 text-sm font-medium hover:text-indigo-700 gap-2 items-center"
                type="button"
                :class="
                  showDistrict
                    ? 'text-indigo-600'
                    : 'dark:text-white text-indigo-900'
                "
                @click="showDistrict = !showDistrict"
              >
                <span>Districts</span>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <transition name="fade" mode="out-in">
                <div
                  class="z-20 origin-top-left rounded-md focus:outline-none absolute left-0 right-0 lg:left-auto top-11 md:top-[58px] w-full lg:w-[600px] shadow-lg dark:bg-gray-800 bg-white"
                  v-show="showDistrict"
                >
                  <div
                    class="px-2 py-1 grid md:grid-cols-4 grid-cols-2 max-h-[450px] md:max-h-max overflow-y-auto md:overflow-y-clip"
                  >
                    <div
                      v-for="(district, i) in districts"
                      :key="i + district.name"
                    >
                      <nuxt-link
                        class="flex items-center space-x-2 px-3 py-2 text-sm lg:space-x-4 text-gray-700 hover:text-indigo-500 focus:text-indigo-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-all duration-200"
                        :to="{
                          name: 'district-name-page',
                          params: { name: district.name, page: 1 },
                        }"
                        :title="district.name"
                        ><span> {{ district.name }}</span></nuxt-link
                      >
                    </div>
                  </div>
                </div>
              </transition>
            </div> -->
            <nuxt-link
              class="px-3 py-2 text-sm font-medium text-indigo-900 dark:text-white hover:text-indigo-700"
              :to="{ name: 'tour-guide' }"
              title="Tour guide page"
            >
              Tour Guide
            </nuxt-link>
            <div class="hidden lg:block h-10">
              <HomeNavbarLogin />
            </div>
            <div class="hidden lg:block h-8">
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vClickOutside from "v-click-outside";
export default {
  name: "HeadTop",
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      showDivision: false,
      showDistrict: false,
      showMenu: false,
    };
  },
  computed: {
    //...mapGetters(["divisions", "districts"]),
  },

  watch: {
    $route() {
      this.show = "";
      this.showMenu = false;
      this.showDivision = false;
      this.showDistrict = false;
    },
  },
};
</script>
