<template>
  <section class="content-wrapper flex flex-col items-center justify-center">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <MediaCard v-for="video in videos" :key="video.ID" :video="video" />
      <button v-if="videoPaginationCursor" @click="fetchNextVideosPage">
        Load more
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MediaCard from '../components/MediaCard.vue';

export default {
  name: 'Videos',

  components: { MediaCard },

  async fetch({ store, error }) {
    try {
      if (!store.state.videos.videos) {
        await store.dispatch('videos/fetchVideos');
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch videos at this time. Please try again later.',
      });
    }
  },

  computed: {
    ...mapState('videos', ['videos', 'videoPaginationCursor']),
  },

  methods: {
    ...mapActions('videos', ['fetchVideos', 'fetchNextVideosPage']),
  },
};
</script>
