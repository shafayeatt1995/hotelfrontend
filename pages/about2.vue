<template>
  <div class="container mx-auto">
    <div class="flex flex-col lg:flex-row justify-between gap-8">
      <div class="w-full lg:w-1/2 flex flex-col justify-center">
        <h1
          class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4"
        >
          About Us - Cholozai.com: Your Ultimate Guide to Traveling Bangladesh
        </h1>
        <p
          class="font-normal text-base leading-6 text-gray-600 dark:text-white"
        >
          Welcome to Cholozai.com! We're thrilled to have you here, and we'd
          love to tell you a bit about who we are, what we do, and how we can
          help make your travels in Bangladesh unforgettable. Whether you're a
          seasoned traveler or planning your first adventure, Cholozai.com is
          your go-to destination for all things related to Bangladesh tourism.
        </p>
      </div>
      <div class="w-full lg:w-1/2 flex justify-center">
        <nuxt-img
          loading="lazy"
          decoding="async"
          class="w-auto max-h-[500px]"
          src="/images/about.svg"
          alt="cholozai"
          title="cholozai"
          format="webp"
          height="500"
        />
      </div>
    </div>
    <div v-for="(content, key) in contents" :key="key" class="mt-10">
      <h2 class="text-2xl lg:text-3xl font-semibold">{{ content.title }}</h2>
      <p>
        {{ content.body }}
      </p>
      <div
        v-for="(sub, i) in content.subs"
        :key="`sub-${i}`"
        class="mt-5 md:pl-10 pl-5"
      >
        <h3 class="text-xl lg:text-2xl font-semibold">{{ sub.title }}</h3>
        <p>{{ sub.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { meta } from "@/utils";

export default {
  auth: false,
  head() {
    const title = `About us | ${this.$pageTitle}`;
    const description =
      "Welcome to Cholozai.com! We're thrilled to have you here, and we'd love to tell you a bit about who we are, what we do, and how we can help make your travels in Bangladesh unforgettable.";
    return {
      title,
      meta: meta({ title, description }),
    };
  },
  data() {
    return {
      contents: [
        {
          title: `Our Mission`,
          body: `At Cholozai.com, our mission is simple: to showcase the beauty, culture, and diversity of Bangladesh. We believe that Bangladesh is a hidden gem with countless wonders waiting to be discovered, and we are passionate about helping both locals and international travelers explore everything this incredible country has to offer.`,
        },
        {
          title: `Who We Are`,
          body: `We're a team of travel enthusiasts, writers, and photographers who are deeply connected to Bangladesh. Our love for this country drives us to explore every corner, from bustling cities to serene countryside, and share our experiences with you. Whether it's the history, culture, or natural beauty of Bangladesh, our team is committed to providing you with authentic and insightful content.`,
        },
        {
          title: `What We Do`,
          body: `Cholozai.com is a travel dedicated to providing detailed information on Bangladesh's top tourist destinations, hidden gems, cultural festivals, and local cuisine. We cover everything from practical travel tips to in-depth guides on must-see places. Our content is carefully crafted to ensure that you have all the information you need to make the most of your trip to Bangladesh.`,
          subs: [
            {
              title: `Comprehensive Travel Guides`,
              body: `Our travel guides are designed to help you navigate through the diverse landscapes of Bangladesh. From the bustling streets of Dhaka to the tranquil beaches of Cox's Bazar, we provide step-by-step guides on how to get there, what to see, and where to stay.`,
            },
            {
              title: `Local Insights`,
              body: `One of the things that set us apart is our focus on local insights. We collaborate with locals who share their personal experiences and tips, ensuring that you get an authentic experience. Whether it's finding the best street food or uncovering off-the-beaten-path destinations, our local contributors have got you covered.`,
            },
            {
              title: `Cultural Exploration`,
              body: `Bangladesh is rich in culture, and we're here to help you immerse yourself in it. From festivals to traditional crafts, our articles delve into the cultural aspects of Bangladesh, giving you a deeper understanding of the places you visit.`,
            },
            {
              title: `Practical Tips and Advice`,
              body: `Traveling can be overwhelming, especially in a new country. That's why we provide practical tips on everything from transportation to safety. We aim to make your journey as smooth as possible, so you can focus on enjoying your trip.`,
            },
          ],
        },
        {
          title: `Why Choose Us?`,
          body: ``,
          subs: [
            {
              title: `Expertise`,
              body: `Our team has years of experience traveling and writing about Bangladesh. We've been to the places we write about, so you can trust that our recommendations are based on firsthand experiences.`,
            },
            {
              title: `Passion`,
              body: `We are passionate about Bangladesh and want to share that passion with you. Our love for travel and adventure drives us to continually explore new places and bring you fresh content.`,
            },
            {
              title: `Commitment`,
              body: `At Cholozai.com, we are committed to providing high-quality, accurate, and up-to-date information. We understand that travel plans can change, and we strive to keep our content relevant and helpful.`,
            },
          ],
        },
        {
          title: `Our Vision`,
          body: `Our vision is to become the leading travel information website for Bangladesh, helping millions of travelers discover the beauty and culture of this amazing country. We aim to create a community of travel enthusiasts who share our love for Bangladesh and inspire others to explore it.`,
        },
        {
          title: `How You Can Get Involved`,
          body: `We believe that travel is a shared experience, and we'd love for you to be a part of our community. Here are a few ways you can get involved:`,
          subs: [
            {
              title: `Share Your Stories`,
              body: `Have you traveled to Bangladesh? We'd love to hear your stories! Whether it's a favorite destination, a memorable encounter, or a travel tip, your experiences can help others on their journeys.`,
            },
            {
              title: `Join Our Newsletter`,
              body: `Stay updated with the latest travel guides, tips, and stories by joining our newsletter. Be the first to know about new articles and exclusive content.`,
            },
            {
              title: `Follow Us on Social Media`,
              body: `Connect with us on social media to stay in touch and get real-time updates. Follow us on Facebook, Instagram, and Twitter for beautiful photos, travel inspiration, and more.
`,
            },
          ],
        },
      ],
    };
  },
};
</script>
