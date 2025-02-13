<template>
  <div
    v-if="multiple"
    @click="$emit('action')"
    class="border rounded-lg mt-3 h-60 cursor-pointer flex-1"
  >
    <template v-if="image.length">
      <slot name="image">
        <div class="flex flex-wrap h-full overflow-y-auto">
          <img
            v-for="(data, i) in image"
            :key="i"
            loading="lazy"
            :src="data"
            :alt="data"
            class="object-cover size-40 p-3"
          />
        </div>
      </slot>
    </template>

    <template v-else>
      <slot name="placeholder">
        <div class="flex flex-col items-center justify-center size-full">
          <i class="far fa-image text-8xl text-indigo-600" />
          <p class="text-lg px-10 text-gray-700">{{ placeholder }}</p>
        </div>
      </slot>
    </template>
  </div>
  <div
    v-else
    @click="$emit('action')"
    class="border rounded-lg flex flex-col items-center justify-center mt-3 h-60 cursor-pointer flex-1"
  >
    <template v-if="image">
      <slot name="image">
        <img
          loading="lazy"
          :src="image"
          :alt="image"
          class="object-contain w-full h-full p-3"
        />
      </slot>
    </template>
    <template v-else>
      <slot name="placeholder">
        <i class="far fa-image text-8xl text-indigo-600" />
        <p class="text-lg px-10 text-gray-700">{{ placeholder }}</p>
      </slot>
    </template>
  </div>
</template>

<script>
export default {
  props: { image: [String, Array], placeholder: String, multiple: Boolean },
};
</script>
