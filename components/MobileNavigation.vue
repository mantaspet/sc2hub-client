<template>
  <nav
    class="
      border-t
      w-full
      z-10
      flex
      align-center
      justify-between
      md:hidden
      bottom-0
      fixed
      h-16
    "
  >
    <nuxt-link
      v-for="page in pages"
      :key="page.name"
      :to="page.url"
      class="w-1/5 flex flex-col justify-center duration-150 transition-all"
      exact-active-class="text-primary-600"
    >
      <BaseIcon :icon="page.icon" classes="h-6" />
      <div class="text-center text-xs">{{ page.name }}</div>
    </nuxt-link>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import BaseIcon from './base/BaseIcon.vue';

export default {
  name: 'MobileNavigation',

  components: { BaseIcon },

  data: () => ({
    isHidden: false,
  }),

  computed: {
    ...mapState('events', ['eventFilterParams']),

    pages() {
      return [
        { name: 'Home', url: '/', icon: 'home' },
        { name: 'Videos', url: '/videos', icon: 'videocam' },
        {
          name: 'Calendar',
          url: '/calendar',
          icon: 'calendar',
          query: this.eventFilterParams,
        },
        { name: 'Livestreams', url: '/livestreams', icon: 'play' },
        { name: 'More', url: '/more', icon: 'dots-horizontal' },
      ];
    },
  },
};
</script>

<style scoped>
nav {
  background-color: var(--panel-background-color);
}
</style>
