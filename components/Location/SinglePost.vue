<template>
  <div class="group">
    <div
      class="overflow-hidden rounded-xl bg-gray-100 transition-all duration-200 hover:scale-105 dark:bg-gray-800"
    >
      <nuxt-link
        class="relative block aspect-video"
        :to="{ name: 'location-slug', params: { slug: post.slug } }"
        :title="post.title"
      >
        <nuxt-img
          loading="lazy"
          decoding="async"
          :src="`/images/location/${post.image}`"
          :alt="post.title"
          :title="post.title"
          class="object-cover transition-all size-full"
          width="400"
          height="225"
          format="webp"
          fit="cover"
        />
      </nuxt-link>
    </div>
    <div>
      <h2>
        <nuxt-link
          :to="{ name: 'location-slug', params: { slug: post.slug } }"
          :title="post.title"
          class="text-xl font-bold text-gray-800 dark:text-white pt-2 inline-block"
        >
          <span
            class="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900 capitalize"
            >{{ post.title }}</span
          >
        </nuxt-link>
      </h2>
      <p class="pb-4 leading-tight mt-2 text-gray-800 dark:text-white">
        {{ post.content[0].content.join(" ").slice(0, 100) }} ...
      </p>
      <div class="mt-1 flex items-center text-gray-700 dark:text-white gap-2">
        <p class="flex items-center gap-1">
          <span class="truncate text-sm">Shafayet Al-Anik</span>
        </p>
        <p class="text-xs text-gray-300 dark:text-gray-600">•</p>
        <p class="truncate text-sm">{{ post.postDate | cDate }}</p>
      </div>

      <div class="flex gap-3 justify-between items-center">
        <nuxt-link
          :to="{
            name: 'district-name-page',
            params: { name: post.district, page: 1 },
          }"
          :title="post.district"
          class="inline-block text-sm font-medium uppercase text-indigo-600"
          >{{ post.district }}</nuxt-link
        >
        <Button
          variant="transparent"
          :to="{ name: 'location-slug', params: { slug: post.slug } }"
          :title="post.title"
          >Read more...</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SinglePost",
  props: { post: Object },
};
</script>
