<template>
  <Modal v-model="modal" size="fixed">
    <template #title>
      <div class="absolute right-5 top-5">
        <button
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-all duration-200"
          @click="modal = false"
        >
          <i class="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </template>
    <template #body>
      <div>
        <h2 class="font-kaushan text-2xl text-indigo-900 dark:text-white">
          CholoZai
        </h2>
        <h1 class="text-4xl font-bold mt-4 text-gray-800 dark:text-white">
          Hello there, Welcome!
        </h1>
        <h3 class="text-gray-700 my-2 dark:text-white">
          No password needed. Simply click & sign in. If you have no account, It
          will automatically create an account for you.
        </h3>
        <div class="mt-12 flex flex-col gap-2 mb-4">
          <Button
            variant="lightGray"
            class="w-full"
            @click.native.prevent="signin('google')"
          >
            <GoogleIcon /> {{ createMode ? "Create account" : "Sign in" }} with
            google
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import GoogleIcon from "@/static/icons/google.svg";
import { setItem } from "@/utils";
import { mapGetters } from "vuex";
export default {
  name: "LoginPopup",
  components: { GoogleIcon },
  data() {
    return {
      modal: false,
      createMode: false,
    };
  },
  computed: {
    ...mapGetters(["apiUrl"]),
  },
  mounted() {
    this.$nuxt.$on("signInPopup", () => {
      this.modal = !this.modal;
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("signInPopup");
  },
  methods: {
    signin(provider) {
      const { name, query, params } = this.$route;
      setItem(
        "socialLogin",
        JSON.stringify({ name: name || "index", query, params })
      );
      window.open(`${this.apiUrl}/api/auth/social-login/${provider}`, "_self");
    },
  },
};
</script>
