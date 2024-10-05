<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fa-solid fa-hotel"></i>
          Settings
        </h2>
      </div>
    </section>
    <section class="lg:px-4">
      <div class="p-4 bg-white rounded-xl">
        <TabTitle :tabTitle="tabTitle" v-model="activeTab" />
        <div class="mt-4">
          <SettingsProfile v-if="activeTab === 'Profile'" />
          <SettingsPassword v-else-if="activeTab === 'Password'" />
          <SettingsHotel v-else-if="activeTab === 'Hotel'" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SettingsPage",
  layout: "dashboard",
  head() {
    return {
      title: `Hotel - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
      activeTab: this.$route?.query?.tab || "Profile",
    };
  },
  computed: {
    ...mapGetters(["pageTitle", "manager", "owner"]),
    tabTitle() {
      return [
        {
          title: "Profile",
          icon: "fas fa-circle-user",
        },
        {
          title: "Password",
          icon: "fas fa-key",
        },
        { title: "Hotel", icon: "fas fa-hotel", show: this.owner },
        { title: "Notification", icon: "far fa-bell", show: false },
        {
          title: "Domain",
          icon: "fas fa-globe",
          show: this.manager,
        },
      ];
    },
  },
  watch: {
    activeTab(tab) {
      window.history.pushState(
        {},
        "",
        `?${new URLSearchParams({ tab }).toString()}`
      );
    },
  },
};
</script>
