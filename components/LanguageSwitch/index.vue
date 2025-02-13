<template>
  <div class="flex gap-2 my-3">
    <nuxt-link
      class="border border-gray-300 rounded-lg py-2 px-3 md:px-5 flex items-center hover:bg-indigo-600 hover:text-white transition-all duration-200 w-full md:w-auto justify-center"
      :class="
        $route.name === 'location-slug'
          ? ' bg-indigo-600 text-white'
          : 'dark:text-white'
      "
      :to="{ name: 'location-slug', params: { slug: $route.params.slug } }"
      title="Read in English"
      >Read in English
      <i
        :class="$route.name === 'location-slug' ? ' fas' : 'far'"
        class="fa-circle-check pl-1"
      ></i>
    </nuxt-link>
    <nuxt-link
      class="border border-gray-300 rounded-lg py-2 px-3 md:px-5 flex items-center hover:bg-indigo-600 hover:text-white transition-all duration-200 w-full md:w-auto justify-center"
      :class="
        $route.name === 'location-slug-bn'
          ? ' bg-indigo-600 text-white'
          : 'dark:text-white'
      "
      :to="{ name: 'location-slug-bn', params: { slug: $route.params.slug } }"
      title="বাংলায় পড়ুন"
      >বাংলায় পড়ুন
      <i
        :class="$route.name === 'location-slug-bn' ? ' fas' : 'far'"
        class="fa-circle-check pl-1"
      ></i>
    </nuxt-link>
  </div>
</template>

<script>
export default {};
</script>
