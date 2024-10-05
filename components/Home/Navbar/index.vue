<template>
  <div class="fixed top-0 left-0 right-0 z-20">
    <div
      class="w-full backdrop-blur-md bg-white/30 lg:h-20 h-16 absolute left-0 top-0 right-0 z-10 shadow-lg"
    ></div>
    <div
      class="container mx-auto lg:py-5 py-3 absolute top-0 left-0 right-0 z-20 lg:px-5 xl:px-0 px-2"
    >
      <div class="flex justify-between items-center">
        <nuxt-link
          :to="{ name: 'index' }"
          class="font-kaushan text-4xl text-indigo-900 flex items-center"
        >
          <img src="/images/deep-logo.svg" class="size-10" alt="logo" />
          Cholozai
        </nuxt-link>
        <div class="flex items-center gap-3" v-if="$auth.loggedIn">
          <div class="relative">
            <!-- <div
              class="bg-gray-100 size-10 flex justify-center items-center rounded-lg text-lg cursor-pointer"
              @click="popup = popup === 'notification' ? '' : 'notification'"
            >
              <i class="fa-regular fa-bell"></i>
            </div>
            <transition name="fade-scale" mode="out-in">
              <HomeNavbarNotification
                v-if="popup === 'notification'"
                v-click-outside="() => (popup = '')"
              />
            </transition> -->
          </div>
          <div class="relative">
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
        </div>
        <Button v-else @click.native.prevent="$nuxt.$emit('signInPopup')"
          >Sign in</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
  name: "HeadTop",
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      popup: "",
    };
  },

  watch: {
    $route() {
      this.popup = "";
    },
  },
};
</script>
