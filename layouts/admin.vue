<template>
  <div class="h-full">
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
    </div>
    <hr />
    <div class="sm:px-4 sm:pt-4">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      adminLinks: [
        { text: 'Dashboard', route: '/admin/dashboard' },
        { text: 'Event categories', route: '/admin/event-categories' },
        { text: 'Content creators', route: '/admin/content-creators' },
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
    this.loadSettings();
  },

  methods: {
    ...mapActions('settings', ['loadSettings']),
    ...mapMutations('auth', ['SET_ACCESS_TOKEN']),
  },
};
</script>

<style></style>
