<template>
  <section class="news-page-wrapper w-full flex flex-col">
    <Article
      v-for="article in articles"
      :key="article.id"
      :title="article.Title"
      :image="article.ThumbnailURL"
      :excerpt="article.Excerpt"
      :url="article.URL"
      :published-at="article.PublishedAt"
      :source="article.Source"
    />
    <button v-if="articlePaginationCursor" @click="fetchNextArticlesPage">
      Load more
    </button>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Article from '../components/Article';

export default {
  name: 'News',

  components: { Article },

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

  computed: mapState('articles', ['articles', 'articlePaginationCursor']),

  methods: mapActions('articles', ['fetchNextArticlesPage']),
};
</script>

<style scoped>
.news-page-wrapper {
  max-width: 48rem;
  margin: 0 auto;
}
</style>
