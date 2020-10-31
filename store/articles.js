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

export const getters = {
  articles(state, getters, rootState, rootGetters) {
    const playerIdRegexes = rootGetters['players/playerIdRegexes'];
    const matchupRegexes = rootGetters['matchups/matchupRegexes'];
    const raceRegexes = rootGetters['races/raceRegexes'];

    if (rootState.settings.enableSpoilers || !state.articles) {
      return state.articles;
    }

    // spoilers are disabled but playerIds are not loaded yet
    if (!playerIdRegexes && !rootState.settings.enableSpoilers) {
      return null;
    }

    const articles = [];
    for (let i = 0; i < state.articles.length; i++) {
      const article = state.articles[i];
      let articleTitle = article.Title;
      for (let j = 0; j < playerIdRegexes.length; j++) {
        articleTitle = articleTitle.replace(playerIdRegexes[j], '<player>');
      }
      for (let j = 0; j < matchupRegexes.length; j++) {
        articleTitle = articleTitle.replace(matchupRegexes[j], '<matchup>');
      }
      for (let j = 0; j < raceRegexes.length; j++) {
        articleTitle = articleTitle.replace(raceRegexes[j], '<race>');
      }
      articles.push({
        ...article,
        Title: articleTitle,
      });
    }
    return articles;
  },
};

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
