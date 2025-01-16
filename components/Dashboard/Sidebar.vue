<template>
  <aside
    id="sidebar"
    :class="isOpen ? 'translate-x-0 ease-in' : '-translate-x-full ease-out'"
    class="flex flex-col w-72 h-screen px-4 pt-8 pb-16 lg:pb-8 overflow-y-auto bg-white border-r fixed inset-y-0 left-0 z-30 min-h-screen space-y-6 transition-all duration-200 lg:translate-x-0 lg:relative border-gray-200"
  >
    <nuxt-link :to="{ name: 'index' }" class="mx-auto">
      <img loading="lazy" class="h-20" src="/full-logo-tr.webp" alt="logo" />
    </nuxt-link>

    <div class="flex flex-col items-center mt-6 -mx-2">
      <img
        loading="lazy"
        class="object-cover size-20 mx-2"
        :src="manager || owner ? $auth?.user?.hotel?.logo : $auth.user?.avatar"
        alt="avatar"
      />
      <h4 v-if="manager" class="mx-2 mt-2 font-medium text-gray-800">
        {{ $auth.user?.restaurant?.name || "" }}
      </h4>
      <h4 class="mx-2 mt-2 font-medium text-gray-800">
        {{ $auth.user?.name || "" }}
      </h4>
      <p class="mx-2 mt-1 text-sm font-medium text-gray-800">
        {{ roleName }}
      </p>
    </div>

    <div class="flex flex-col justify-between flex-1 mt-6">
      <nav>
        <template
          v-for="(
            { name, title, icon, show = true, type, subMenus }, i
          ) in navLink"
        >
          <template v-if="show">
            <template v-if="type === 'dropdown'">
              <a
                :key="i + i"
                class="flex items-center px-4 py-3 mt-2 text-gray-700 transition-colors duration-200 transform rounded-lg hover:text-white hover:bg-indigo-600 cursor-pointer"
                :class="activeTab === name ? 'bg-indigo-600 text-white' : ''"
                @click="setActiveTab(name)"
              >
                <div class="flex justify-between items-center flex-1">
                  <div>
                    <i :class="icon" />
                    <span class="mx-4 font-medium">{{ title }}</span>
                  </div>
                  <i
                    class="fa-solid fa-angle-down transition-all duration-200"
                    :class="activeTab === name ? 'rotate-180' : 'rotate-0'"
                  ></i>
                </div>
              </a>
              <slide-up-down
                :active="activeTab === name"
                :duration="300"
                :key="`s${i}`"
                class="ml-3 flex flex-col bg-gray-50/50 rounded-r-lg pt-2"
              >
                <template v-for="(menu, _) in subMenus">
                  <nuxt-link
                    v-if="menu.show"
                    :key="`i-${_}`"
                    :to="{ name: menu.name }"
                    class="!border-l-indigo-600 flex items-center px-4 py-3 transition-colors duration-200 transform rounded-r-lg hover:text-white hover:bg-indigo-600 border-l-2"
                    :class="
                      $route.name === menu.name
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700'
                    "
                  >
                    <span class="mx-4 font-medium">{{ menu.title }}</span>
                  </nuxt-link>
                </template>
              </slide-up-down>
            </template>
            <nuxt-link
              v-else
              :key="i"
              :to="{ name }"
              class="flex items-center px-4 py-3 mt-1 transition-colors duration-200 transform rounded-lg hover:text-white hover:bg-indigo-600"
              :class="check(name)"
            >
              <i :class="icon" />
              <span class="mx-4 font-medium">{{ title }}</span>
            </nuxt-link>
          </template>
        </template>
        <hr />
        <button
          class="flex items-center px-4 py-3 mt-2 text-rose-500 transition-colors duration-200 transform rounded-lg hover:text-rose-600 hover:bg-gray-100 w-full"
          @click="logOut"
        >
          <i class="fas fa-arrow-right-from-bracket text-xl" />
          <span class="mx-4 font-medium">Logout</span>
        </button>
      </nav>
    </div>
  </aside>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  props: { isOpen: Boolean },
  data() {
    return { activeTab: "" };
  },
  computed: {
    ...mapGetters(["manager", "admin", "owner", "user", "superAdmin"]),
    roleName() {
      if (this.superAdmin) {
        return "Super Admin";
      } else if (this.admin) {
        return "Admin";
      } else if (this.manager) {
        return "Manager";
      } else if (this.owner) {
        return "Owner";
      } else if (this.user) {
        return "User";
      }
    },
    navLink() {
      const nav = [
        {
          show: this.manager || this.owner || this.superAdmin,
          name: "dashboard",
          title: "Dashboard",
          icon: "fas fa-cubes",
        },
        {
          show: true,
          name: "dashboard-blog",
          title: "Blog",
          icon: "fas fa-cubes",
        },
        {
          show: this.manager || this.owner,
          name: "dashboard-booking",
          title: "Booking",
          icon: "fas fa-clipboard-check",
        },
        {
          show: this.superAdmin,
          name: "dashboard-user",
          title: "User",
          icon: "fas fa-user",
        },
        {
          show: this.superAdmin,
          name: "dashboard-location",
          title: "Location",
          icon: "fas fa-location-dot",
        },
        {
          show: this.superAdmin,
          name: "dashboard-accommodation-type",
          title: "Accommodation",
          icon: "fas fa-people-roof",
        },
        {
          show: this.superAdmin,
          name: "dashboard-hotel",
          title: "Hotel",
          icon: "fas fa-hotel",
        },
        {
          show: !this.manager,
          type: "dropdown",
          name: "dashboard-manage",
          title: "manage hotel",
          icon: "fas fa-hotel",
          subMenus: [
            {
              show: this.superAdmin,
              name: "dashboard-manage-facility",
              title: "Facility",
            },
            {
              show: this.owner,
              name: "dashboard-manage-complement",
              title: "Complement",
            },
            {
              show: this.superAdmin,
              name: "dashboard-manage-bed-type",
              title: "Bed Type",
            },
            {
              show: this.owner,
              name: "dashboard-manage-extra-service",
              title: "Extra Service",
            },
            {
              show: this.owner,
              name: "dashboard-manage-room-type",
              title: "Room Type",
            },
            {
              show: this.admin,
              name: "dashboard-manage-approve-room-type",
              title: "Approve Room Type",
            },
            {
              show: this.owner,
              name: "dashboard-manage-room",
              title: "Room",
            },
          ],
        },
        {
          show: this.manager || this.admin || this.owner,
          name: "dashboard-settings",
          title: "Settings",
          icon: "fas fa-gear",
        },
      ];
      return nav;
    },
  },
  mounted() {
    this.setActiveTab(this.$route.name.split("-")[0] || "");
  },
  methods: {
    check(name) {
      return this.$route.name === name
        ? "bg-indigo-600 text-white"
        : "text-gray-700";
    },
    async logOut() {
      try {
        await this.$auth.logout("laravelJWT");
        this.$router.push({ name: "dashboard-login" });
      } catch (error) {}
    },
    setActiveTab(name) {
      this.activeTab = this.activeTab === name ? "" : name;
    },
  },
};
</script>
