<template>
  <section class="content-wrapper flex flex-col items-center justify-center">
    <div class="video-grid">
      <MediaCard
        v-for="video in videos"
        :key="video.ID"
        :url="video.VideoURL"
        :image-url="video.ThumbnailURL"
        :title="video.Title"
        :top-left="video.Duration"
        :bottom-left="video.ViewCount"
        :bottom-right="video.CreatedAt"
        @click="storeLastOpenedVideo(video)"
      />
    </div>
    <div v-if="videoPaginationCursor && videos" class="pagination-wrapper">
      <BaseButton block @click="fetchNextVideosPage"> Load more </BaseButton>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import MediaCard from '@/components/MediaCard.vue';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'Videos',

  components: { BaseButton, MediaCard },

  async fetch({ store, error }) {
    if (store.state.videos.videos) {
      return;
    }
    try {
      await store.dispatch('videos/fetchVideos');
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch videos at this time. Please try again later.',
      });
    }
  },

  computed: {
    ...mapState('videos', ['videoPaginationCursor']),
    ...mapGetters('videos', ['videos']),
  },

  methods: {
    ...mapActions('videos', ['fetchNextVideosPage', 'storeLastOpenedVideo']),
  },
};
</script>
