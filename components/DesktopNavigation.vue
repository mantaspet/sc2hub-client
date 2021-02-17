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
          exact-active-class="active-primary-link"
        >
          {{ page.text }}
        </nuxt-link>
      </div>
    </div>
    <div class="flex items-center py-1">
      <a href="https://starcraft2.com" target="_blank">
        <img
          src="~/assets/logo.png"
          class="site-logo h-12 transition-all duration-200"
          alt="site-logo"
        />
      </a>
    </div>
    <div class="flex justify-between flex-1">
      <div class="flex">
        <nuxt-link
          v-for="page in rightLinks"
          :key="page.text"
          :to="page.route"
          class="hover:bg-neutral-100 transition-all duration-150 flex items-center px-3"
          exact-active-class="active-primary-link"
        >
          {{ page.text }}
        </nuxt-link>
        <BaseMenu nudge-top="56" close-on-content-click>
          <template #activator>
            <div
              class="hover:bg-neutral-100 transition-all duration-150 flex items-center px-3 h-full cursor-pointer"
            >
              More
            </div>
          </template>
          <div>
            <nuxt-link
              v-for="page in moreMenuLinks"
              :key="page.text"
              :to="page.route"
              class="hover:bg-neutral-100 block transition-all duration-150 py-4 px-4 whitespace-no-wrap text-center"
              exact-active-class="active-secondary-link"
            >
              {{ page.text }}
            </nuxt-link>
          </div>
        </BaseMenu>
      </div>

      <div class="flex items-center pr-4">
        <BaseMenu nudge-top="43" padding="4">
          <template #activator>
            <BaseIconButton icon="cog" no-active-color />
          </template>
          <Settings class="w-64" />
        </BaseMenu>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import BaseIconButton from '@/components/base/BaseIconButton';
import scrollPositionMixin from '@/mixins/scroll-position-mixin';
import BaseMenu from '@/components/base/BaseMenu';
import Settings from '@/components/Settings';

export default {
  name: 'NavigationDesktop',

  components: { Settings, BaseMenu, BaseIconButton },

  mixins: [scrollPositionMixin],

  computed: {
    ...mapState('events', ['eventFilterParams']),
    ...mapState('auth', ['accessToken']),

    leftLinks() {
      return [
        {
          text: 'Home',
          route: { name: 'index' },
        },
        { text: 'Videos', route: { name: 'videos' } },
        { text: 'News', route: { name: 'news' } },
      ];
    },

    rightLinks() {
      return [
        { text: 'Livestreams', route: { name: 'livestreams' } },

        {
          text: 'Calendar',
          route: { name: 'calendar', query: this.eventFilterParams },
        },
      ];
    },

    moreMenuLinks() {
      const links = [
        { text: 'Content creators', route: { name: 'content-creators' } },
        { text: 'About SC2Hub', route: { name: 'information' } },
        {
          text: 'Planned features',
          route: { name: 'information', hash: '#planned-features' },
        },
      ];
      if (this.accessToken) {
        links.unshift({
          text: 'Admin dashboard',
          route: { name: 'admin-dashboard' },
        });
      }
      return links;
    },
  },
};
</script>

<style scoped>
nav {
  background-color: var(--panel-background-color);
}

.active-primary-link {
  color: var(--color-primary-700);
  box-shadow: inset 0 -2px var(--color-primary-700);
}

.active-secondary-link {
  color: var(--color-primary-700);
}

.site-logo:hover {
  filter: brightness(1.375);
}
</style>
