<template>
  <section class="content-wrapper flex flex-col items-center justify-center">
    <div class="video-grid">
      <MediaCard
        v-for="video in videos"
        :key="video.ID"
        :url="video.VideoURL"
        :image-url="video.ThumbnailURL"
        :fallback-image-url="
          video.PlatformID === 1
            ? '/twitch-placeholder.jpg'
            : '/youtube-placeholder.jpg'
        "
        :title="video.Title"
        :top-left="video.Duration"
        :bottom-left="video.ViewCount"
        :bottom-right="video.CreatedAtHumanized"
        @click="storeLastOpenedVideo(video)"
      />
    </div>
    <div v-if="videoPaginationCursor && videos" class="pagination-wrapper">
      <BaseButton block @click="fetchNextVideosPage"> Load more </BaseButton>
    </div>
    <!--    <BaseFloatingActionButton-->
    <!--      icon="search"-->
    <!--      :top="mdAndUp ? '80px' : null"-->
    <!--      :bottom="mdAndUp ? null : '80px'"-->
    <!--      right="16px"-->
    <!--      @click="isDrawerOpen = true"-->
    <!--    />-->
    <!--    <BaseOverlay :is-displayed="isDrawerOpen" @click="isDrawerOpen = false" />-->
    <!--    <BaseDrawer-->
    <!--      :is-open="isDrawerOpen"-->
    <!--      :top="mdAndUp ? '80px' : null"-->
    <!--      :right="mdAndUp ? 0 : null"-->
    <!--      :bottom="mdAndUp ? null : 0"-->
    <!--      @click:overlay="updateFilters"-->
    <!--    >-->
    <!--      <div class="w-32 h-64">Hello world</div>-->
    <!--    </BaseDrawer>-->
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import MediaCard from '@/components/MediaCard.vue';
import BaseButton from '@/components/base/BaseButton';
// import BaseFloatingActionButton from '@/components/base/BaseFloatingActionButton';
// import BaseDrawer from '@/components/base/BaseDrawer';
// import BaseOverlay from '@/components/base/BaseOverlay';
import breakpointMixin from '@/mixins/breakpoint-mixin';

export default {
  name: 'Videos',

  components: {
    // BaseOverlay,
    // BaseDrawer,
    // BaseFloatingActionButton,
    BaseButton,
    MediaCard,
  },

  mixins: [breakpointMixin],

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

  data() {
    return {
      isDrawerOpen: false,
    };
  },

  computed: {
    ...mapState('videos', ['videoPaginationCursor']),
    ...mapGetters('videos', ['videos']),
  },

  methods: {
    ...mapActions('videos', ['fetchNextVideosPage', 'storeLastOpenedVideo']),

    updateFilters() {
      this.isDrawerOpen = false;
    },
  },
};
</script>
