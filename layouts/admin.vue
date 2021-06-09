<template>
  <div class="h-full">
    <PopupMessages />

    <div class="py-4 mx-2">
      <nuxt-link
        v-for="page in adminLinks"
        :key="page.text"
        :to="page.route"
        class="hover:bg-primary-200 transition-all duration-150 rounded p-3 m-2"
        exact-active-class="bg-primary-200"
      >
        {{ page.text }}
      </nuxt-link>
      <span
        class="
          hover:bg-primary-200
          transition-all
          duration-150
          rounded
          p-3
          m-2
          cursor-pointer
        "
        @click="logout"
      >
        Logout
      </span>
    </div>
    <hr />
    <div class="sm:px-4 sm:pt-4">
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
import { showSpoilerHintMessage } from '@/util/popup-messages';
import breakpointMixin from '@/mixins/breakpoint-mixin';

export default {
  name: 'AdminLayout',

  mixins: [breakpointMixin],

  data() {
    return {
      adminLinks: [
        { text: 'Dashboard', route: '/admin/dashboard' },
        { text: 'Event categories', route: '/admin/event-categories' },
        // { text: 'Content creators', route: '/admin/content-creators' },
        { text: 'Main site', route: '/' },
      ],
    };
  },

  computed: {
    ...mapState('auth', ['accessToken']),
  },

  mounted() {
    if (!this.accessToken) {
      const token = localStorage.sc2hubAccessToken;
      if (!token) {
        this.$router.replace('/');
        return;
      } else {
        this.SET_ACCESS_TOKEN(token);
      }
    }
    if (!localStorage.settings) {
      showSpoilerHintMessage();
    } else {
      this.loadSettings();
    }
  },

  methods: {
    ...mapActions('settings', ['loadSettings']),
    ...mapActions('auth', ['logout']),
    ...mapMutations('auth', ['SET_ACCESS_TOKEN']),
  },
};
</script>

<style></style>
