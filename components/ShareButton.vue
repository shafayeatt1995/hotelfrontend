<template>
  <div>
    <slot>
      <Button
        variant="lightGray"
        rounded
        @click.native.prevent="$nuxt.$emit('shareHotelPopup', shareData)"
      >
        <i class="fa-regular fa-share-from-square"></i>
      </Button>
    </slot>
  </div>
</template>
<script>
export default {
  name: "ShareButton",
  props: { shareData: [String, Object] },
};
</script>
