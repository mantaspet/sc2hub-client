<template>
  <div class="flex flex-col">
    <div class="pb-4 pt-2 border-b">
      <div v-for="page in pages" :key="page.name">
        <nuxt-link
          :to="page.route"
          class="
            hover:bg-neutral-200
            flex
            transition-all
            duration-150
            py-2
            px-4
            whitespace-no-wrap
          "
        >
          <BaseIcon v-if="page.icon" :icon="page.icon" classes="h-6 mr-4" />
          {{ page.text }}
        </nuxt-link>
      </div>
    </div>
    <Settings class="w-full p-4" />
  </div>
</template>

<script>
// only meant to be loaded on small screens
import { mapState } from 'vuex';
import Settings from '@/components/Settings';
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'More',

  components: { BaseIcon, Settings },

  computed: {
    ...mapState('auth', ['accessToken']),

    pages() {
      const pages = [
        {
          text: 'News',
          route: { name: 'news' },
        },
        {
          text: 'Search',
          route: { name: 'search' },
        },
        // { text: 'Content creators', route: { name: 'content-creators' } },
        { text: 'About SC2Hub', route: { name: 'about' } },
        {
          text: 'Planned features',
          route: { name: 'about', hash: '#planned-features' },
        },
      ];
      if (this.accessToken) {
        pages.unshift({
          text: 'Admin dashboard',
          route: { name: 'admin-dashboard' },
        });
      }
      return pages;
    },
  },
};
</script>

<style scoped></style>
