<template>
  <nav
    class="border-t w-full z-10 flex align-center justify-between md:hidden bottom-0 fixed h-16"
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
import BaseIcon from './base/BaseIcon.vue';

export default {
  name: 'NavigationMobile',

  components: { BaseIcon },

  data: () => ({
    pages: [
      { name: 'Home', url: '/', icon: 'home' },
      { name: 'Videos', url: '/videos', icon: 'videocam' },
      { name: 'News', url: '/news', icon: 'news' },
      { name: 'Livestreams', url: '/livestreams', icon: 'play' },
      { name: 'More', url: '/more', icon: 'dots-horizontal' },
    ],
    isHidden: false,
  }),
};
</script>

<style scoped>
nav {
  background-color: var(--panel-background-color);
}
</style>
