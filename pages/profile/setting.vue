<template>
  <Profile>
    <div class="border border-gray-300 rounded-xl mb-6">
      <h1 class="md:text-4xl text-3xl text-gray-800 md:p-4 p-2 font-bold">
        My Settings
      </h1>
      <hr />
      <div class="md:p-4 p-2">
        <div class="flex justify-between items-center">
          <p>Send me booking notification</p>
          <i
            class="fa-regular fa-circle-check text-green-600 text-xl"
            v-if="allow"
          ></i>
          <ToggleSwitch
            v-else
            :value="allow"
            @click.native.prevent.stop="requestNotificationPermission"
          />
        </div>
        <!-- <Button @click.native.prevent="testNotification"
          >Test notification</Button
        > -->
      </div>
    </div>
  </Profile>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SettingsPage",
  ssr: false,
  head() {
    return { title: `Setting - ${this.$pageTitle}` };
  },
  data() {
    return {
      allow: false,
    };
  },
  mounted() {
    this.allow = Notification.permission === "granted";
  },
  methods: {
    async requestNotificationPermission() {
      try {
        if (Notification.permission === "default") {
          const permission = await Notification.requestPermission();
          this.allow = permission === "granted";
        } else if (Notification.permission === "denied") {
          alert("Permission denied for notification");
        }
      } catch (error) {}
    },
  },
};
</script>
