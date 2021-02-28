<template>
  <div>
    <BaseButton
      :disabled="loading['get:/events/crawl']"
      :loading="loading['get:/events/crawl']"
      class="mr-4"
      @click="initEventCrawling"
    >
      Crawl events
    </BaseButton>
    <BaseButton
      :disabled="loading['get:/articles/crawl']"
      :loading="loading['get:/articles/crawl']"
      class="mr-4"
      @click="initNewsCrawling"
    >
      Crawl news
    </BaseButton>
    <BaseButton
      :disabled="loading['get:/videos/query-apis']"
      :loading="loading['get:/videos/query-apis']"
      class="mr-4"
      @click="initVideoQueries"
    >
      Query videos
    </BaseButton>
    <BaseButton
      :disabled="loading['get:/players/crawl']"
      :loading="loading['get:/players/crawl']"
      @click="initPlayerCrawling"
    >
      Crawl players
    </BaseButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { showMessage } from '@/util/popup-messages';

export default {
  name: 'Dashboard',

  layout: 'admin',

  computed: {
    ...mapGetters('progress', ['loading']),
  },

  methods: {
    async initEventCrawling() {
      const response = await this.$axios.$get('/events/crawl');
      showMessage(response);
    },

    async initNewsCrawling() {
      const response = await this.$axios.$get('/articles/crawl');
      showMessage(response);
    },

    async initVideoQueries() {
      const response = await this.$axios.$get('/videos/query-apis');
      showMessage(response);
    },

    async initPlayerCrawling() {
      const requests = [
        this.$axios.$get('/players/crawl', { params: { region: 'Korea' } }),
        this.$axios.$get('/players/crawl', { params: { region: 'Europe' } }),
        this.$axios.$get('/players/crawl', { params: { region: 'US' } }),
        this.$axios.$get('/players/crawl', { params: { region: 'Asia' } }),
      ];
      await Promise.all(requests);
      showMessage('Successfully crawled players');
    },
  },
};
</script>

<style scoped></style>
