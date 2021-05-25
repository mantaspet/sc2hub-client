<template>
  <div>
    <div
      v-show="!isClientMounted"
      class="w-full flex items-center justify-center"
      style="height: 100vh"
    >
      <BaseLoadingSpinner />
    </div>

    <div v-show="isClientMounted" class="h-full">
      <PopupMessages />

      <DesktopNavigation />
      <MobileNavigation />
      <div class="pb-20 md:pb-4 t-0 md:pt-20 px-0 sm:px-4">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import breakpointMixin from '@/mixins/breakpoint-mixin';
import { showSpoilerHintMessage } from '@/util/popup-messages';
import DesktopNavigation from '@/components/DesktopNavigation';
import MobileNavigation from '@/components/MobileNavigation';
import { preloadImage } from '@/util/preload-image';

export default {
  name: 'DefaultLayout',

  components: { MobileNavigation, DesktopNavigation },

  mixins: [breakpointMixin],

  computed: {
    ...mapState('settings', ['enableSpoilers']),
    ...mapState('auth', ['accessToken']),
  },

  mounted() {
    if (!localStorage.settings) {
      showSpoilerHintMessage();
    } else {
      this.loadSettings();
    }
    this.loadLastOpenedVideos();
    if (!this.enableSpoilers) {
      this.loadPlayerIds();
    }
    this.fetchEventCategories().then((eventCategories) => {
      for (let i = 0; i < eventCategories?.length; i++) {
        preloadImage(eventCategories[i].ImageURL);
      }
    });

    if (!this.accessToken) {
      const token = localStorage.sc2hubAccessToken;
      if (token) {
        this.SET_ACCESS_TOKEN(token);
      }
    }
  },

  methods: {
    ...mapMutations('auth', ['SET_ACCESS_TOKEN']),
    ...mapActions('videos', ['loadLastOpenedVideos']),
    ...mapActions('settings', ['loadSettings']),
    ...mapActions('players', ['loadPlayerIds']),
    ...mapActions('eventCategories', ['fetchEventCategories']),
  },
};
</script>

<style></style>
