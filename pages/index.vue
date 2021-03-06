<template>
  <section class="content-wrapper">
    <template v-if="liveRegisteredChannels && liveRegisteredChannels.length">
      <h2 class="py-3 text-center text-xl">Live tournament channels</h2>

      <div class="video-grid pb-8">
        <MediaCard
          v-for="channel in liveRegisteredChannels"
          :key="channel.userName"
          :url="`https://twitch.tv/${channel.userName}`"
          :title="channel.title"
          :image-url="channel.thumbnailUrl"
          :bottom-left="channel.viewerCount"
          :bottom-right="channel.userName"
        />
      </div>
    </template>
    <template v-if="lastOpenedVideos && lastOpenedVideos.length">
      <h2 class="py-3 text-center text-xl">Continue watching</h2>
      <div class="video-grid pb-8">
        <MediaCard
          v-for="video in lastOpenedVideos"
          :key="video.ID"
          :url="video.VideoURL"
          :image-url="video.ThumbnailURL"
          :title="video.Title"
          :top-left="video.Duration"
          :bottom-left="video.ViewCount"
          :bottom-right="video.CreatedAtHumanized"
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
    <template v-if="recentVideos && recentVideos.length">
      <h2 class="py-3 text-center text-xl">Latest videos</h2>
      <div class="video-grid pb-8">
        <MediaCard
          v-for="video in recentVideos"
          :key="video.ID"
          :url="video.VideoURL"
          :image-url="video.ThumbnailURL"
          :fallback-image-url="
            video.PlatformID === 1
              ? '/twitch-placeholder.jpg'
              : '/youtube-placeholder.jpg'
          "
          :title="video.Title"
          :top-left="enableSpoilers ? video.Duration : ''"
          :bottom-left="video.ViewCount"
          :bottom-right="video.CreatedAtHumanized"
          @click="storeLastOpenedVideo(video)"
        />
      </div>
    </template>
    <template v-if="recentArticles && recentArticles.length">
      <h2 class="py-3 text-center text-xl">Latest news</h2>
      <section class="narrow-page-wrapper w-full flex flex-col">
        <Article
          v-for="article in recentArticles"
          :key="article.id"
          :title="article.Title"
          :image="article.ThumbnailURL"
          :excerpt="article.Excerpt"
          :url="article.URL"
          :published-at="article.PublishedAtHumanized"
          :source="article.Source"
        />
      </section>
    </template>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import MediaCard from '@/components/MediaCard';
import BaseIconButton from '@/components/base/BaseIconButton';

export default {
  name: 'Home',

  components: { BaseIconButton, MediaCard },

  async fetch({ store }) {
    const requests = [];
    if (!store.state.channels.liveRegisteredChannels) {
      requests.push(store.dispatch('channels/fetchLiveRegisteredChannels'));
    }
    if (!store.state.articles.recentArticles) {
      requests.push(store.dispatch('articles/fetchRecentArticles'));
    }
    if (!store.state.videos.recentVideos) {
      requests.push(store.dispatch('videos/fetchRecentVideos'));
    }
    await Promise.all(requests);
  },

  computed: {
    ...mapState('settings', ['enableSpoilers']),
    ...mapGetters('articles', ['recentArticles']),
    ...mapGetters('videos', ['recentVideos', 'lastOpenedVideos']),
    ...mapGetters('channels', ['liveRegisteredChannels']),
  },

  methods: {
    ...mapActions('videos', ['removeLastOpenedVideo', 'storeLastOpenedVideo']),
  },
};
</script>
