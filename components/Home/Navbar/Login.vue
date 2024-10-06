<template>
  <client-only>
    <div
      class="relative"
      v-if="this.$auth.loggedIn"
      v-click-outside="() => (popup ? (popup = false) : '')"
    >
      <div class="size-10 cursor-pointer" @click="popup = !popup">
        <nuxt-img
          :src="$auth?.user?.avatar"
          :alt="$auth?.user?.name"
          class="object-cover rounded-lg w-full h-full"
          width="80"
          height="80"
          format="webp"
          loading="lazy"
          decode="async"
        />
      </div>
      <transition name="fade-scale" mode="out-in">
        <HomeNavbarProfile v-if="popup" />
      </transition>
    </div>
    <div class="flex justify-center" v-else>
      <Button @click.native.prevent="$nuxt.$emit('signInPopup')">
        Sign in
      </Button>
    </div>
  </client-only>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      popup: false,
    };
  },
  watch: {
    $route() {
      this.popup = false;
    },
  },
};
</script>
