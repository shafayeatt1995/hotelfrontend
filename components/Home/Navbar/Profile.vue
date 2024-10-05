<template>
  <div
    class="absolute z-10 bg-white right-0 mt-1 w-60 rounded-xl border overflow-hidden"
  >
    <div class="p-4 flex justify-between items-center gap-4">
      <nuxt-img
        v-if="$auth?.user?.avatar"
        :src="$auth.user.avatar"
        :alt="$auth.user.name"
        class="max-h-10 max-w-10 object-contain rounded-lg"
        width="80"
        height="80"
        format="webp"
        loading="lazy"
        decode="async"
      />
      <div class="text-left flex-1">
        <p class="font-bold">{{ $auth.user.name }}</p>
        <p
          class="text-xs text-gray-700"
          v-if="$auth.user.provider === 'google'"
        >
          {{ $auth.user.email }}
        </p>
      </div>
    </div>
    <hr />
    <div class="py-2 px-3">
      <template
        v-for="({ icon = null, title, to, component, hide }, key) in menus"
      >
        <MenuItem
          :key="key"
          class="text-sm !py-2"
          :icon="icon"
          :title="title"
          :to="to"
          v-if="!hide"
          ><template #body v-if="component"
            ><component :is="component" /></template
        ></MenuItem>
      </template>
      <MenuItem
        class="text-sm !py-2"
        variant="red"
        icon="fas fa-power-off"
        title="Sign Out"
        @click.native.prevent="signOut"
      />
    </div>
  </div>
</template>

<script>
import Settings from "@/static/icons/setting.svg";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  components: { Settings },
  computed: {
    ...mapGetters(["user"]),
    menus() {
      return [
        {
          hide: this.user,
          icon: "fas fa-cubes",
          title: "Dashboard",
          to: { name: "dashboard" },
        },
        {
          icon: "far fa-user",
          title: "My Profile",
          to: { name: "profile" },
        },
        {
          icon: "far fa-bookmark",
          title: "My Booking",
          to: { name: "profile-booking" },
        },
        {
          icon: "far fa-heart",
          title: "Wishlist",
          to: { name: "profile-wishlist" },
        },
        {
          title: "Settings",
          to: { name: "profile-setting" },
          component: "Settings",
        },
        // {
        //   icon: "far fa-circle-question",
        //   title: "Help Center",
        //   to: { name: "profile" },
        // },
      ];
    },
  },
  methods: {
    async signOut() {
      try {
        const check = this.$route.matched.some(
          (record) => record.components.default.options.auth !== false
        );
        if (check) {
          this.$router.push({ name: "index" });
        }
        await this.$auth.logout("laravelJWT");
      } catch (error) {}
    },
  },
};
</script>
