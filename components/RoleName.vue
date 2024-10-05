<template>
  <div>{{ roleName }}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RoleName",
  computed: {
    ...mapGetters(["superAdmin", "admin", "manager", "owner", "user"]),
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
  },
};
</script>
