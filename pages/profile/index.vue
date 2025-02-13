<template>
  <Profile>
    <div class="border border-gray-300 rounded-xl">
      <h1 class="md:text-4xl text-3xl text-gray-800 md:p-4 p-2 font-bold">
        Personal Information
      </h1>
      <hr />
      <form class="md:p-4 p-2" @submit.prevent="submit">
        <div class="grid md:grid-cols-2 gap-4">
          <Input
            v-for="(field, i) in inputFields"
            :key="i"
            :field="field"
            v-model="form"
            :errors="errors"
          />
        </div>
        <div class="flex justify-end">
          <Button type="submit" :loading="loading">Update Profile</Button>
        </div>
      </form>
    </div>
  </Profile>
</template>

<script>
export default {
  name: "ProfilePage",
  head() {
    return { title: `Profile - ${this.$pageTitle}` };
  },
  data() {
    return {
      loading: false,
      form: {
        name: this.$auth.user.name,
        email: this.$auth.user.email,
      },
      errors: {},
    };
  },
  computed: {
    inputFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Full name",
          name: "name",
          label: "Full name",
        },
        {
          hide: this.$auth.user.provider !== "google",
          type: "text",
          placeholder: "Email",
          name: "email",
          label: "Email",
          disabled: true,
        },
      ];
      return fields;
    },
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        this.errors = {};
        await this.$userApi.updateProfile(this.form);
        await this.$auth.fetchUser();
        this.$nuxt.$emit("success", "User profile updated");
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
