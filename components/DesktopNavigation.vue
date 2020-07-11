<template>
  <nav
    class="hidden md:flex fixed top-0 align-middle justify-between w-full z-10 transition-shadow duration-300"
    :class="`${scrollY > 0 ? 'shadow-md' : 'border-b'}`"
  >
    <div class="flex justify-between flex-1">
      <div></div>
      <div class="flex">
        <nuxt-link
          v-for="page in leftLinks"
          :key="page.text"
          :to="page.route"
          class="hover:bg-neutral-100 transition-all duration-150 flex items-center px-3"
          exact-active-class="active-link"
        >
          {{ page.text }}
        </nuxt-link>
      </div>
    </div>
    <div class="flex items-center py-1">
      <router-link to="/">
        <img
          src="~/assets/logo.png"
          class="site-logo h-12 transition-all duration-200"
          alt="site-logo"
        />
      </router-link>
    </div>
    <div class="flex justify-between flex-1">
      <div class="flex">
        <nuxt-link
          v-for="page in rightLinks"
          :key="page.text"
          :to="page.route"
          class="hover:bg-neutral-100 transition-all duration-150 flex items-center px-3"
          exact-active-class="active-link"
        >
          {{ page.text }}
        </nuxt-link>
      </div>

      <div></div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import scrollPositionMixin from '../mixins/scroll-position-mixin';

export default {
  name: 'NavigationDesktop',

  mixins: [scrollPositionMixin],

  computed: {
    ...mapState('events', ['eventFilterParams']),

    leftLinks() {
      return [
        {
          text: 'Calendar',
          route: { name: 'calendar', query: this.eventFilterParams },
        },
        { text: 'News', route: { name: 'news' } },
      ];
    },

    rightLinks() {
      return [
        { text: 'Videos', route: { name: 'videos' } },
        { text: 'Livestreams', route: { name: 'livestreams' } },
      ];
    },
  },
};
</script>

<style scoped>
nav {
  background-color: var(--panel-background-color);
}

.active-link {
  color: var(--color-primary-700);
  box-shadow: inset 0 -2px var(--color-primary-700);
}

.site-logo:hover {
  filter: brightness(1.375);
}
</style>
