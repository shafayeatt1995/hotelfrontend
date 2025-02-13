<template>
  <section class="h-screen flex items-center justify-center">
    <div class="absolute inset-0">
      <nuxt-img
        src="/images/bg/3.jpg"
        alt="bg"
        width="1920"
        height="1080"
        class="h-full w-full object-cover"
        format="webp"
        loading="lazy"
        decode="async"
      />
    </div>
    <div class="container mx-auto relative z-10">
      <div class="flex justify-center">
        <div
          class="max-w-96 w-full m-auto p-6 bg-white/60 backdrop-blur-sm shadow-md rounded-md"
        >
          <div class="flex justify-center">
            <nuxt-link
              :to="{ name: 'index' }"
              class="mx-auto max-h-32 flex justify-center"
            >
              <img
                src="/images/logo.svg"
                class="object-contain max-h-full px-5"
                alt="logo"
                loading="lazy"
              />
            </nuxt-link>
          </div>
          <h1 class="mt-6 text-4xl font-bold mb-3 text-gray-800">Login</h1>
          <form class="text-start" @submit.prevent="login">
            <div class="grid">
              <Input
                v-for="(field, i) in loginInputFields"
                :key="i"
                v-model="form"
                :field="field"
                :errors="errors"
              />
              <i class="text-red-500 mb-2 text-xs" v-if="errors.message">{{
                errors.message
              }}</i>
              <div class="flex justify-between mt-4">
                <div class="flex items-center mb-0">
                  <input
                    id="remember-me"
                    class="form-checkbox rounded border-gray-100 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-500/20 focus:ring-opacity-50 me-2"
                    type="checkbox"
                  />
                  <label
                    class="form-checkbox-label text-gray-800"
                    for="remember-me"
                    >Remember me</label
                  >
                </div>
              </div>

              <div class="my-4">
                <Button type="submit" class="w-full">Login / Sign in</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginPage",
  auth: "guest",
  layout: "auth",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  head() {
    return { title: `Admin login - ${this.$pageTitle}` };
  },
  computed: {
    loginInputFields() {
      return [
        {
          type: "text",
          placeholder: "Type your ID",
          name: "email",
          label: `Email / Phone / ID`,
        },
        {
          type: "password",
          placeholder: "Type your password",
          name: "password",
          label: "Password",
        },
      ];
    },
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        this.errors = {};
        await this.$auth.loginWith("cookie", { data: this.form });
        this.$router.push({ name: "index" });
      } catch (error) {
        this.errors = error?.response?.data?.errors || error?.response?.data;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
