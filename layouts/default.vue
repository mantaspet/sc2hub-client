<template>
  <div class="h-full">
    <NavigationDesktop />
    <NavigationMobile />
    <div class="h-full pb-20 md:pb-0 t-0 md:pt-20 px-0 sm:px-4">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NavigationDesktop from '../components/DesktopNavigation';
import NavigationMobile from '../components/MobileNavigation';

export default {
  components: { NavigationMobile, NavigationDesktop },

  computed: {
    ...mapState('settings', ['enableSpoilers']),
  },

  mounted() {
    this.loadLastOpenedVideos();
    this.loadSettings();
    if (!this.enableSpoilers) {
      this.loadPlayerIds();
    }
  },

  methods: {
    ...mapActions('videos', ['loadLastOpenedVideos']),
    ...mapActions('settings', ['loadSettings']),
    ...mapActions('players', ['loadPlayerIds']),
  },
};
</script>

<style></style>
