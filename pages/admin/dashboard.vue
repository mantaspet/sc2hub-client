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
      @click="initVideoQueries"
    >
      Query videos
    </BaseButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',

  layout: 'admin',

  computed: {
    ...mapGetters('progress', ['loading']),
  },

  methods: {
    async initEventCrawling() {
      const response = await this.$axios.$get('/events/crawl');
      alert(response);
    },

    async initNewsCrawling() {
      const response = await this.$axios.$get('/articles/crawl');
      alert(response);
    },

    async initVideoQueries() {
      const response = await this.$axios.$get('/videos/query-apis');
      alert(response);
    },
  },
};
</script>

<style scoped></style>
