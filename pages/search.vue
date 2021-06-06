<template>
  <section class="content-wrapper flex flex-col items-center justify-center">
    <div class="py-4 w-full md:w-1/2">
      <BaseTextField
        :value="searchQuery"
        input-id="search-input"
        class="w-full"
        @input="onSearchQueryInput"
      />
    </div>

    <h2 v-if="videoSearchResults.length" class="py-3 text-center text-xl">
      Videos
    </h2>
    <div class="video-grid">
      <MediaCard
        v-for="video in videoSearchResults"
        :key="video.ID"
        :url="video.VideoURL"
        :image-url="video.ThumbnailURL"
        :fallback-image-url="
          video.PlatformID === 1
            ? '/twitch-placeholder.jpg'
            : '/youtube-placeholder.png'
        "
        :title="video.Title"
        :top-left="enableSpoilers ? video.Duration : ''"
        :bottom-left="video.ViewCount"
        :bottom-right="video.CreatedAtHumanized"
        @click="storeLastOpenedVideo(video)"
      />
    </div>
    <div
      v-if="videoSearchResultsPaginationCursor && videoSearchResults.length"
      class="pagination-wrapper"
    >
      <BaseButton block @click="fetchNextVideoSearchResultsPage">
        Load more
      </BaseButton>
    </div>
  </section>
</template>

<script>
// only meant to be loaded on small screens
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Search',

  data() {
    return {
      debounceTimerId: null,
    };
  },

  computed: {
    ...mapState('search', [
      'searchQuery',
      'videoSearchResultsPaginationCursor',
    ]),
    ...mapState('settings', ['enableSpoilers']),
    ...mapGetters('search', ['videoSearchResults']),
  },

  mounted() {
    document.getElementById('search-input')?.focus();
  },

  methods: {
    ...mapMutations('search', ['SET_SEARCH_QUERY']),
    ...mapActions('search', [
      'fetchVideoSearchResults',
      'fetchNextVideoSearchResultsPage',
      'storeLastOpenedVideo',
    ]),

    onSearchQueryInput(value) {
      clearTimeout(this.debounceTimerId);
      this.debounceTimerId = setTimeout(() => {
        this.SET_SEARCH_QUERY(value);
        this.fetchVideoSearchResults({ query: value });
      }, 500);
    },
  },
};
</script>

<style scoped></style>
