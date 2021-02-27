<template>
  <section class="narrow-page-wrapper w-full flex flex-col">
    <Article
      v-for="article in articles"
      :key="article.id"
      :title="article.Title"
      :image="article.ThumbnailURL"
      :excerpt="article.Excerpt"
      :url="article.URL"
      :published-at="article.PublishedAtHumanized"
      :source="article.Source"
    />

    <div
      v-if="articlePaginationCursor && articles"
      class="pagination-wrapper mx-auto"
    >
      <BaseButton block @click="fetchNextArticlesPage"> Load more </BaseButton>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Article from '@/components/Article';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'News',

  components: { BaseButton, Article },

  async fetch({ store, error }) {
    if (store.state.articles.articles) {
      return;
    }
    try {
      await store.dispatch('articles/fetchArticles');
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch videos at this time. Please try again later.',
      });
    }
  },

  computed: {
    ...mapState('articles', ['articlePaginationCursor']),
    ...mapGetters('articles', ['articles']),
  },

  methods: mapActions('articles', ['fetchNextArticlesPage']),
};
</script>
