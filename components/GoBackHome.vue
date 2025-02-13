<template>
  <div class="flex gap-x-3">
    <Button @click.native.prevent="history.back()" variant="transparent">
      <i class="fas fa-arrow-left-long"></i>
      <span>Go back</span>
    </Button>

    <Button :to="{ name: 'index' }"> Take me home </Button>
  </div>
</template>

<script>
export default {};
</script>
