<template>
  <div class="container mx-auto flex flex-col lg:flex-row gap-5 px-2 md:px-0">
    <ProfileSidebar />
    <div class="flex-1"><slot /></div>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>
