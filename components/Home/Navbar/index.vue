<template>
  <div class="fixed top-0 left-0 right-0 z-20">
    <div
      class="w-full backdrop-blur-md bg-white/30 dark:bg-black/30 lg:h-20 h-16 absolute left-0 top-0 right-0 z-10 shadow-lg"
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
            <DarkMode />
            <i
              class="fa-solid fa-bars text-3xl"
              @click="showMenu = !showMenu"
            ></i>
          </div>
          <div
            class="lg:items-center gap-3 flex flex-col lg:flex-row absolute lg:relative max-h-96 top-[64px] lg:top-auto bg-white/30 dark:bg-black/30 backdrop-blur-md lg:backdrop-blur-none lg:bg-transparent lg:dark:bg-transparent pb-5 lg:pb-0 transition-all duration-300"
            :class="
              showMenu
                ? 'left-0 right-0'
                : 'left-full -right-full lg:left-auto lg:right-auto'
            "
          >
            <nuxt-link
              :to="{ name: 'index' }"
              title="cholozai"
              class="px-3 py-2 text-sm font-medium dark:text-white text-indigo-900 hover:text-indigo-700"
              >Home</nuxt-link
            >
            <div class="relative text-left">
              <button
                class="flex px-3 py-2 text-sm font-medium hover:text-indigo-700 gap-2 items-center"
                type="button"
                :class="
                  show === 'travel'
                    ? 'text-indigo-600'
                    : 'dark:text-white text-indigo-900'
                "
                @click="show = show === 'travel' ? '' : 'travel'"
              >
                <span>Divisions</span>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <transition name="fade" mode="out-in">
                <div
                  class="z-20 origin-top-left rounded-md focus:outline-none absolute left-0 right-0 top-11 md:top-[58px] w-full lg:w-48 shadow-lg dark:bg-gray-800 bg-white"
                  v-if="show === 'travel'"
                  v-click-outside="() => (show = '')"
                >
                  <div
                    class="px-2 py-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1"
                  >
                    <div v-for="division in divisions" :key="division.name">
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
            <div class="relative text-left">
              <button
                class="flex px-3 py-2 text-sm font-medium hover:text-indigo-700 gap-2 items-center"
                type="button"
                :class="
                  show === 'district'
                    ? 'text-indigo-600'
                    : 'dark:text-white text-indigo-900'
                "
                @click="show = show === 'district' ? '' : 'district'"
              >
                <span>Districts</span>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <transition name="fade" mode="out-in">
                <div
                  class="z-20 origin-top-left rounded-md focus:outline-none absolute left-0 right-0 lg:left-auto top-11 md:top-[58px] w-full lg:w-[600px] shadow-lg dark:bg-gray-800 bg-white"
                  v-if="show === 'district'"
                  v-click-outside="() => (show = '')"
                >
                  <div
                    class="px-2 py-1 grid md:grid-cols-4 grid-cols-2 max-h-[450px] md:max-h-max overflow-y-auto md:overflow-y-clip"
                  >
                    <div v-for="district in districts" :key="district.name">
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
            </div>
            <nuxt-link
              class="px-3 py-2 text-sm font-medium text-indigo-900 dark:text-white hover:text-indigo-700"
              :to="{ name: 'tour-guide' }"
              title="Tour guide page"
            >
              Tour Guide
            </nuxt-link>
            <nuxt-link
              class="px-3 py-2 text-sm font-medium text-indigo-900 dark:text-white hover:text-indigo-700"
              :to="{ name: 'location-page-page', params: { page: 1 } }"
              title="location page"
            >
              Locations
            </nuxt-link>
            <div class="relative" v-if="$auth.loggedIn">
              <div
                class="size-10 cursor-pointer"
                @click="popup = popup === 'profile' ? '' : 'profile'"
              >
                <nuxt-img
                  :src="$auth.user.avatar"
                  :alt="$auth.user.name"
                  class="object-cover rounded-lg w-full h-full"
                  width="80"
                  height="80"
                  format="webp"
                  loading="lazy"
                  decode="async"
                />
              </div>
              <transition name="fade-scale" mode="out-in">
                <HomeNavbarProfile
                  v-if="popup === 'profile'"
                  v-click-outside="() => (popup = '')"
                />
              </transition>
            </div>
            <div class="flex justify-center" v-else>
              <Button @click.native.prevent="$nuxt.$emit('signInPopup')">
                Sign in
              </Button>
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
      popup: "",
      show: "",
      showMenu: false,
    };
  },
  computed: {
    ...mapGetters(["divisions", "districts"]),
  },

  watch: {
    $route() {
      this.popup = "";
      this.show = "";
      this.showMenu = false;
    },
  },
};
</script>
