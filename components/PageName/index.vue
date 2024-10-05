<template>
  <div
    class="bg-gradient-to-b from-indigo-300 to-indigo-500 py-16 md:py-28 -mt-[90px] mb-10 -mx-2 md:mx-0"
  >
    <div class="mt-[81px]"></div>
    <h1
      class="text-white text-center text-2xl md:text-5xl font-semibold capitalize"
    >
      <slot>
        visiting place in
        <span class="font-bold">"{{ $route.params.name }}"</span>
        {{ $route.name.split("-")[0] }}
      </slot>
    </h1>
  </div>
</template>

<script>
export default {};
</script>
