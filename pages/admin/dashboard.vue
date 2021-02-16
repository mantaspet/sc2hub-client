<template>
  <div>
    <BaseButton
      :disabled="loading['get:/events/crawl']"
      :loading="loading['get:/events/crawl']"
      @click="initEventCrawling"
    >
      Crawl events
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
  },
};
</script>

<style scoped></style>
