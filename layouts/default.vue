<template>
  <div class="h-full">
    <NavigationDesktop />
    <NavigationMobile />
    <div class="mb-20 md:mb-0 t-0 md:mt-16 p-0 sm:p-4">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NavigationDesktop from '../components/DesktopNavigation';
import NavigationMobile from '../components/MobileNavigation';

export default {
  components: { NavigationMobile, NavigationDesktop },

  mounted() {
    this.loadLastOpenedVideos();
  },

  methods: {
    ...mapActions('videos', ['loadLastOpenedVideos']),
  },
};
</script>

<style></style>
