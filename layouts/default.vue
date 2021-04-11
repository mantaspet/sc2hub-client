<template>
  <div class="h-full">
    <PopupMessages />

    <NavigationDesktop />
    <NavigationMobile />
    <div class="pb-20 md:pb-4 t-0 md:pt-20 px-0 sm:px-4">
      <BaseLoadingSpinner
        v-show="!isClientMounted"
        class="mx-auto mt-4 mt-md-0"
      />

      <Nuxt v-show="isClientMounted" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import breakpointMixin from '@/mixins/breakpoint-mixin';
import { showSpoilerHintMessage } from '@/util/popup-messages';
import NavigationDesktop from '../components/DesktopNavigation';
import NavigationMobile from '../components/MobileNavigation';

export default {
  name: 'DefaultLayout',

  components: { NavigationMobile, NavigationDesktop },

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
  },
};
</script>

<style></style>
