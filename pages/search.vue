<template>
  <section class="content-wrapper flex flex-col items-center justify-center">
    <div class="px-2 md:px-0 pt-2 w-full md:w-1/2">
      <BaseTextField
        :value="searchQuery"
        :placeholder="searchInputPlaceholder"
        input-id="search-input"
        class="w-full"
        clearable
        @input="onSearchQueryInput"
        @click:clear="onSearchInputClear"
      />
    </div>

    <h2 v-if="showNoResultsMessage" class="py-3 text-center text-xl">
      No results found
    </h2>

    <div class="pb-8 flex flex-col items-center justify-center">
      <h2
        v-if="videoSearchResults && videoSearchResults.length"
        class="py-3 text-center text-xl"
      >
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
        v-if="
          videoSearchResultsPaginationCursor &&
          videoSearchResults &&
          videoSearchResults.length
        "
        class="pagination-wrapper"
      >
        <BaseButton block @click="fetchNextVideoSearchResultsPage">
          Load more
        </BaseButton>
      </div>
    </div>

    <div class="pb-8 narrow-page-wrapper w-full flex flex-col">
      <h2
        v-if="articleSearchResults && articleSearchResults.length"
        class="py-3 text-center text-xl"
      >
        Articles
      </h2>
      <Article
        v-for="article in articleSearchResults"
        :key="article.id"
        :title="article.Title"
        :image="article.ThumbnailURL"
        :excerpt="article.Excerpt"
        :url="article.URL"
        :published-at="article.PublishedAtHumanized"
        :source="article.Source"
      />
      <div
        v-if="
          articleSearchResultsPaginationCursor &&
          articleSearchResults &&
          articleSearchResults.length
        "
        class="pagination-wrapper mx-auto"
      >
        <BaseButton block @click="fetchNextArticleVideoSearchResultsPage">
          Load more
        </BaseButton>
      </div>
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
      placeholderIntervalId: null,
      searchInputPlaceholder: '',
    };
  },

  computed: {
    ...mapState('search', [
      'searchQuery',
      'articleSearchResultsPaginationCursor',
      'videoSearchResultsPaginationCursor',
    ]),
    ...mapState('settings', ['enableSpoilers']),
    ...mapGetters('search', ['videoSearchResults', 'articleSearchResults']),
    ...mapGetters('progress', ['loading']),

    showNoResultsMessage() {
      if (this.articleSearchResults?.length) {
        return false;
      }
      if (this.videoSearchResults?.length) {
        return false;
      }
      if (!this.searchQuery) {
        return false;
      }
      return !(this.loading['get:/videos'] || this.loading['get:/articles']);
    },
  },

  mounted() {
    this.setSearchInputPlaceholderInterval();
    setTimeout(() => {
      // for some reason doesn't work without setTimeout.
      // also doesn't bring keyboard in iOS but I haven't found a workaround
      document.getElementById('search-input')?.focus();
    });
  },

  beforeDestroy() {
    clearInterval(this.placeholderIntervalId);
  },

  methods: {
    ...mapMutations('search', ['SET_SEARCH_QUERY']),
    ...mapActions('search', [
      'fetchSearchResults',
      'fetchNextArticleVideoSearchResultsPage',
      'fetchNextVideoSearchResultsPage',
      'storeLastOpenedVideo',
    ]),

    setSearchInputPlaceholderInterval() {
      clearInterval(this.placeholderIntervalId);
      this.setSearchInputPlaceholder();
      this.placeholderIntervalId = setInterval(
        this.setSearchInputPlaceholder,
        5000,
      );
    },

    setSearchInputPlaceholder() {
      const placeholders = [
        'GSL Super Tournament',
        'IEM Katowice',
        'SC2 Masters Summer',
        'GSL Finals',
        'Trap',
        'Serral vs Reynor',
        'Maru vs TY',
        'Serral',
        'DreamHack Final',
      ].filter((p) => p !== this.searchInputPlaceholder);
      const randomIndex = Math.floor(Math.random() * placeholders.length);
      this.searchInputPlaceholder = `e.g. ${placeholders[randomIndex]}`;
    },

    onSearchQueryInput(value) {
      clearTimeout(this.debounceTimerId);
      this.debounceTimerId = setTimeout(() => {
        this.SET_SEARCH_QUERY(value);
        this.setSearchInputPlaceholderInterval();
        this.fetchSearchResults({ query: value });
      }, 500);
    },

    onSearchInputClear() {
      this.setSearchInputPlaceholderInterval();
      this.SET_SEARCH_QUERY('');
    },
  },
};
</script>

<style scoped></style>
