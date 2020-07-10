import { getHumanizedDate } from '../util/date';

function decorateArticles(articles) {
  const now = new Date();
  return articles.map((a) => ({
    ...a,
    PublishedAt: getHumanizedDate(a.PublishedAt, now),
  }));
}

export const state = () => ({
  articles: null,
  articlePaginationCursor: 0,
});

export const mutations = {
  SET_ARTICLES(state, { Cursor, Items }) {
    state.articlePaginationCursor = Cursor;
    state.articles = decorateArticles(Items);
  },

  STORE_ARTICLES_PAGE(state, { Cursor, Items }) {
    state.articlePaginationCursor = Cursor;
    state.articles.push(...decorateArticles(Items));
  },
};

export const actions = {
  async fetchArticles({ commit }, params) {
    const response = await this.$axios.$get('/articles', { params });
    commit('SET_ARTICLES', response);
  },

  async fetchNextArticlesPage({ state, commit }, params) {
    const response = await this.$axios.$get('/articles', {
      params: { ...params, from: state.articlePaginationCursor },
    });
    commit('STORE_ARTICLES_PAGE', response);
  },
};
