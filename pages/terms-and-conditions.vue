<template>
  <div class="container mx-auto py-10 px-4 md:px-10">
    <h1 class="text-3xl font-bold mb-6">Terms and Conditions</h1>

    <p>
      Welcome to
      <a href="https://cholozai.com" class="text-indigo-500 underline"
        >https://cholozai.com</a
      >!
    </p>

    <p class="my-4">
      These terms and conditions outline the rules and regulations for the use
      of the website located at
      <a href="https://cholozai.com" class="text-indigo-500 underline"
        >https://cholozai.com</a
      >.
    </p>

    <p class="my-4">
      By accessing this website, we assume you accept these terms and
      conditions. Do not continue to use
      <strong>https://cholozai.com</strong> if you do not agree to all the terms
      and conditions stated on this page.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">1. General Information</h2>
    <p class="my-4">
      <strong>https://cholozai.com</strong> provides users with information,
      guides, and tips about travel destinations. The information on this site
      is for general information purposes only and is subject to change without
      notice.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">2. Intellectual Property</h2>
    <p class="my-4">
      All content published on this website, including but not limited to text,
      images, logos, and design, is the intellectual property of
      <strong>https://cholozai.com</strong> unless otherwise stated.
      Unauthorized use or reproduction of this content is prohibited.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">3. User Responsibilities</h2>
    <p class="my-4">
      By using this website, you agree to use the site for lawful purposes and
      in a way that does not infringe the rights of, restrict, or inhibit anyone
      else’s use of the site. You are prohibited from using the site in the
      following ways:
    </p>
    <ul class="list-disc list-inside ml-4">
      <li>Engaging in any fraudulent or illegal activity.</li>
      <li>Distributing or transmitting any harmful software or content.</li>
      <li>Violating the security measures of the website.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-6 mb-4">4. Accuracy of Information</h2>
    <p class="my-4">
      We strive to provide accurate and up-to-date information; however, we do
      not guarantee that the information provided on the website is complete,
      accurate, or current. It is your responsibility to verify the information
      provided before making any decisions based on it.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">5. External Links</h2>
    <p class="my-4">
      Our website may contain links to third-party websites or services that are
      not owned or controlled by <strong>https://cholozai.com</strong>. We have
      no control over, and assume no responsibility for, the content, privacy
      policies, or practices of any third-party sites or services.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">6. Limitation of Liability</h2>
    <p class="my-4">
      <strong>https://cholozai.com</strong> will not be held responsible or
      liable for any damages arising out of your use of the website, including
      but not limited to indirect, incidental, or consequential damages.
    </p>
    <p class="my-4">
      We are not responsible for any personal injury, financial loss, or
      inconvenience caused while using the information provided on our website
      or during your travels.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">7. Travel Information</h2>
    <p class="my-4">
      The travel information, recommendations, and tips provided on this website
      are for informational purposes only. Travel conditions and circumstances
      may change without notice (e.g., weather, safety conditions, and
      transportation availability). It is recommended that users independently
      verify details with official sources before making travel plans.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">8. User-Generated Content</h2>
    <p class="my-4">
      Users may be allowed to submit comments, reviews, or other content on the
      website. By submitting content, you grant
      <strong>https://cholozai.com</strong> a non-exclusive, royalty-free,
      perpetual, and worldwide license to use, reproduce, and distribute your
      content. You are responsible for ensuring that any content you submit
      complies with applicable laws and does not infringe on any third-party
      rights.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">9. Privacy Policy</h2>
    <p class="my-4">
      Your privacy is important to us. Please review our
      <a href="/privacy-policy" class="text-indigo-500 underline"
        >Privacy Policy</a
      >
      to understand how we collect, use, and protect your information when you
      use our website.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">10. Changes to Terms</h2>
    <p class="my-4">
      We reserve the right to update or change these terms at any time without
      notice. By continuing to use the website after changes are made, you agree
      to be bound by the updated terms.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">11. Governing Law</h2>
    <p class="my-4">
      These terms and conditions are governed by and construed in accordance
      with the laws of [Your Country], and you irrevocably submit to the
      exclusive jurisdiction of the courts in that location.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-4">12. Contact Information</h2>
    <p class="my-4">
      If you have any questions or concerns about these Terms and Conditions,
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
  auth: false,
  name: "TermsAndConditions",
  head() {
    const title = `Terms and Conditions - ${this.$pageTitle}`;
    const description =
      "Review the Terms and Conditions of using Cholozai. By accessing our travel guide, you agree to our terms for using the website, booking information, and services.";
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
