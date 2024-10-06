<template>
  <div
    class="container mx-auto py-10 px-4 md:px-10 text-gray-800 dark:text-white"
  >
    <h1 class="text-3xl font-bold mb-6">Contact Us</h1>

    <p class="my-4">
      We would love to hear from you! Whether you have questions, feedback, or
      inquiries about travel destinations, feel free to reach out to us. Our
      team at <strong>https://cholozai.com</strong> is here to assist you.
    </p>

    <form
      @submit.prevent="submitForm"
      class="shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Full Name
        </label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          placeholder="Your Full Name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email Address
        </label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="Your Email Address"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
          Message
        </label>
        <textarea
          v-model="form.message"
          id="message"
          placeholder="Your Message"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="5"
          required
        ></textarea>
      </div>

      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send Message
        </button>
      </div>
    </form>

    <p class="text-gray-600 dark:text-white mt-8">
      Alternatively, you can reach us at
      <a href="mailto:support@cholozai.com" class="text-indigo-500 underline"
        >support@cholozai.com</a
      >.
    </p>
  </div>
</template>

<script>
import { meta } from "~/utils";

export default {
  auth: false,
  head() {
    const title = `Contact Us - ${this.$pageTitle}`;
    const description =
      "Have questions or need help? Contact Cholozai, your trusted travel guide. We're here to assist with any inquiries about travel destinations or our services.";
    return {
      title,
      meta: meta({ title, description }),
    };
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    submitForm() {
      alert(`Message sent by ${this.form.name}`);
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
