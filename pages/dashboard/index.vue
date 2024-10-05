<template>
  <DashboardOwner v-if="owner" />
  <DashboardManager v-else-if="manager" />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "IndexPage",
  layout: "dashboard",
  head() {
    return { title: `Dashboard - ${this.$pageTitle}` };
  },
  computed: {
    ...mapGetters(["superAdmin", "admin", "manager", "owner", "user"]),
  },
  mounted() {
    if (this.superAdmin) {
      this.fetchActiveUsers();
    }
  },
  methods: {
    async fetchActiveUsers() {
      try {
        // const data = await this.$adminApi.fetchActiveUsers();
      } catch (error) {}
    },
  },
};
</script>
