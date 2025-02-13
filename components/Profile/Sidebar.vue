<template>
  <div
    class="xl:w-[300px] lg:w-64 lg:sticky top-24 max-h-[calc(100vh_-_120px)] overflow-y-auto"
  >
    <div
      class="w-full bg-white shadow-lg border border-gray-300 rounded-xl md:p-4 p-2"
    >
      <div class="flex flex-col items-center">
        <nuxt-img
          v-if="$auth?.user?.avatar"
          :src="$auth.user.avatar || ''"
          :alt="$auth.user.name"
          width="80"
          height="80"
          class="size-20 rounded-full"
          format="webp"
          loading="lazy"
          decode="async"
        />
        <h3 class="font-bold text-gray-800 text-2xl">
          {{ $auth?.user?.name }}
        </h3>
        <p
          class="text-sm text-gray-800"
          v-if="$auth.user.provider === 'google'"
        >
          {{ $auth?.user?.email }}
        </p>
      </div>
      <hr class="mt-5 mb-3" />
      <div class="flex lg:flex-col overflow-x-auto whitespace-nowrap">
        <MenuItem
          :icon="icon"
          :title="title"
          :to="to"
          v-for="({ icon = null, title, to, component }, key) in menus"
          :key="key"
          :active="checkActive(to)"
          class="flex-1"
        >
          <template #body v-if="component">
            <component :is="component" />
          </template>
        </MenuItem>
        <MenuItem
          class="text-sm !py-2"
          variant="red"
          icon="fas fa-power-off"
          title="Sign Out"
          @click.native.prevent="signOut"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Settings from "@/static/icons/setting.svg";
export default {
  name: "Sidebar",
  components: { Settings },
  computed: {
    menus() {
      return [
        { icon: "far fa-user", title: "My Profile", to: { name: "profile" } },
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
    checkActive(to) {
      return to ? to.name === this.$route.name : false;
    },
  },
};
</script>
