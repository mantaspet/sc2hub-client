<template>
  <div class="h-full">
    <NavigationDesktop />
    <div class="mb-20 md:mb-0 t-0 md:mt-16 p-0 sm:p-4">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavigationDesktop from '../components/NavigationDesktop';

export default {
  components: { NavigationDesktop },
};
</script>

<style></style>
