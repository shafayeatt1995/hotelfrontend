<template>
  <div class="container mx-auto py-10 px-4 md:px-10">
    <h1 class="text-3xl font-bold mb-6">Privacy Policy</h1>

    <p class="my-4">
      At <strong>https://cholozai.com</strong>, we are committed to protecting
      and respecting your privacy. This Privacy Policy explains how we collect,
      use, and protect your personal information when you visit our website.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
    <p class="my-4">
      When you visit <strong>https://cholozai.com</strong>, we may collect the
      following types of personal information:
    </p>
    <ul class="list-disc list-inside ml-4">
      <li>
        Your name, email address, and contact information when you voluntarily
        provide it via forms.
      </li>
      <li>
        Information about your use of our website, such as IP address, browser
        type, and operating system, through cookies.
      </li>
      <li>Any other personal data you choose to provide.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-6 mb-4">
      2. How We Use Your Information
    </h2>
    <p class="my-4">
      We use the information we collect for the following purposes:
    </p>
    <ul class="list-disc list-inside ml-4">
      <li>
        To provide and improve our services, including personalizing content and
        suggestions.
      </li>
      <li>
        To respond to inquiries, provide customer support, and communicate with
        you.
      </li>
      <li>
        To analyze and understand how our website is used to enhance user
        experience.
      </li>
      <li>
        To send marketing and promotional communications, if you have opted in.
      </li>
    </ul>

    <h2 class="text-2xl font-semibold mt-6 mb-4">3. Cookies</h2>
    <p class="my-4">
      <strong>https://cholozai.com</strong> uses cookies to enhance your
      browsing experience. Cookies are small data files that are placed on your
      device when you visit our website. You can choose to disable cookies in
      your browser settings, but this may limit some functionalities of our
      website.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">4. Third-Party Services</h2>
    <p class="my-4">
      We may use third-party services, such as analytics tools, to help us
      understand how users interact with our website. These services may collect
      information about your usage of the site and may have their own privacy
      policies governing their use of your information.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">5. Data Security</h2>
    <p class="my-4">
      We take appropriate security measures to protect your personal information
      from unauthorized access, disclosure, or destruction. However, please note
      that no method of transmission over the Internet or method of electronic
      storage is 100% secure.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
    <p class="my-4">
      You have the right to access, update, or delete your personal information.
      If you wish to exercise these rights, please contact us at
      <a href="mailto:support@cholozai.com" class="text-indigo-500 underline"
        >support@cholozai.com</a
      >.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">7. External Links</h2>
    <p class="my-4">
      Our website may contain links to external websites. We are not responsible
      for the content or privacy practices of these external sites. We encourage
      you to review their privacy policies before providing any personal
      information.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">
      8. Changes to This Privacy Policy
    </h2>
    <p class="my-4">
      We reserve the right to update or modify this Privacy Policy at any time.
      Any changes will be posted on this page, and by continuing to use our
      website after such changes, you agree to the updated policy.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
    <p class="my-4">
      If you have any questions or concerns regarding this Privacy Policy,
      please contact us at
      <a href="mailto:support@cholozai.com" class="text-indigo-500 underline"
        >support@cholozai.com</a
      >.
    </p>
  </div>
</template>

<script>
import { meta } from "@/utils";

export default {
  name: "PrivacyPolicy",
  auth: false,
  head() {
    const title = `Privacy Policy - ${this.$pageTitle}`;
    const description =
      "Read the Privacy Policy of Cholozai, your trusted travel guide. Learn how we collect, use, and protect your personal information while you explore travel destinations.";
    return {
      title,
      meta: meta({ title, description }),
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
