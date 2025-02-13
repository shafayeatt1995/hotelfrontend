<template>
  <header
    class="flex items-center justify-end h-20 px-4 lg:px-6 bg-white sticky top-0 z-20 shadow-md"
  >
    <div class="flex items-center">
      <div class="relative" v-click-outside="() => (dropdownOpen = false)">
        <button
          class="transition-colors duration-300 rounded-lg p-2 focus:outline-none hover:bg-gray-100"
          @click="dropdownOpen = !dropdownOpen"
        >
          <span class="sr-only">User Menu</span>
          <div class="flex items-center md:-mx-2">
            <div
              class="hidden md:mx-2 md:flex md:flex-col md:items-end md:leading-tight"
            >
              <span
                v-if="manager || owner"
                class="font-semibold text-sm text-gray-700"
                >{{ $auth.user?.hotel?.name || "" }}</span
              >
              <span v-else class="font-semibold text-sm text-gray-700">{{
                $auth.user?.name || ""
              }}</span>
              <span class="capitalize text-sm text-gray-700">
                <RoleName />
              </span>
            </div>

            <img
              loading="lazy"
              class="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-full md:mx-2"
              :src="
                manager || owner
                  ? $auth.user?.hotel?.logo || ''
                  : $auth.user?.avatar || ''
              "
              alt="user profile image"
            />
          </div>
        </button>

        <div
          class="absolute right-0 z-50 w-56 p-2 bg-white border rounded-lg"
          v-if="dropdownOpen"
        >
          <div
            class="px-4 py-2 text-gray-700 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <nuxt-link :to="{ name: 'settings' }">
              <i class="text-xl fas fa-gear" />
              <span class="mx-4 font-medium">Settings</span>
            </nuxt-link>
          </div>
          <div
            class="px-4 py-2 text-rose-500 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100 flex items-center"
            @click="logOut()"
          >
            <i class="text-xl fas fa-arrow-right-from-bracket" />
            <span class="mx-4 font-medium">Logout</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";
export default {
  name: "TopBar",
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      dropdownOpen: false,
      currentDate: new Date(),
      timerInterval: null,
    };
  },
  computed: {
    ...mapGetters(["manager", "owner"]),
  },
  watch: {
    $route(val) {
      this.dropdownOpen = false;
    },
  },
  methods: {
    async logOut() {
      try {
        await this.$auth.logout("laravelJWT");
        this.$router.push({ name: "dashboard-login" });
      } catch (error) {}
    },
  },
};
</script>
