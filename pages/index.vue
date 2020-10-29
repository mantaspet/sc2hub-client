<template>
  <section class="content-wrapper">
    <template v-if="lastOpenedVideos && lastOpenedVideos.length">
      <h2 class="py-3 text-center">Continue watching</h2>
      <div class="video-grid">
        <MediaCard
          v-for="video in lastOpenedVideos"
          :key="video.ID"
          :url="video.VideoURL"
          :image-url="video.ThumbnailURL"
          :title="video.Title"
          :top-left="video.Duration"
          :bottom-left="video.ViewCount"
          :bottom-right="video.CreatedAt"
        >
          <template #top-right>
            <BaseIconButton
              classes="text-white bg-black rounded-full h-6 hover:text-neutral-200 active:text-neutral-300"
              icon="close"
              @click.prevent="removeLastOpenedVideo(video)"
            />
          </template>
        </MediaCard>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MediaCard from '@/components/MediaCard';
import BaseIconButton from '@/components/base/BaseIconButton';

export default {
  name: 'Home',

  components: { BaseIconButton, MediaCard },

  computed: {
    ...mapState('videos', ['lastOpenedVideos']),
  },

  methods: {
    ...mapActions('videos', ['removeLastOpenedVideo']),
  },
};
</script>
