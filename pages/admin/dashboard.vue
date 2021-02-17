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
      :disabled="loading['get:/events/crawl']"
      :loading="loading['get:/events/crawl']"
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

    async initVideoQueries() {
      const response = await this.$axios.$get('/videos/query-apis');
      alert(response);
    },
  },
};
</script>

<style scoped></style>
