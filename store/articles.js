import { formatDistance } from 'date-fns';

export function processArticles(articles, getters, rootState, rootGetters) {
  const playerIdRegexes = rootGetters['players/playerIdRegexes'];
  const matchupRegexes = rootGetters['matchups/matchupRegexes'];
  const raceRegexes = rootGetters['races/raceRegexes'];
  const now = new Date();

  if (!articles) {
    return null;
  }

  // spoilers are disabled but playerIds are not loaded yet
  if (!playerIdRegexes && !rootState.settings.enableSpoilers) {
    return null;
  }

  if (rootState.settings.enableSpoilers || !articles) {
    return articles.map((a) => ({
      ...a,
      PublishedAtHumanized: formatDistance(new Date(a.PublishedAt), now, {
        addSuffix: true,
      }),
    }));
  }

  // remove spoilers from videos
  const processedArticles = [];
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
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
    processedArticles.push({
      ...article,
      Title: articleTitle,
    });
  }
  return processedArticles.map((a) => ({
    ...a,
    PublishedAtHumanized: formatDistance(new Date(a.PublishedAt), now, {
      addSuffix: true,
    }),
  }));
}

export const state = () => ({
  articles: null,
  recentArticles: null, // for home page
  articlePaginationCursor: 0,
});

export const getters = {
  articles(state, getters, rootState, rootGetters) {
    return processArticles(state.articles, getters, rootState, rootGetters);
  },

  recentArticles(state, getters, rootState, rootGetters) {
    return processArticles(
      state.recentArticles,
      getters,
      rootState,
      rootGetters,
    );
  },
};

export const mutations = {
  SET_ARTICLES(state, { Cursor, Items }) {
    state.articlePaginationCursor = Cursor;
    state.articles = Items;
  },

  SET_RECENT_ARTICLES(state, { Items }) {
    state.recentArticles = Items;
  },

  STORE_ARTICLES_PAGE(state, { Cursor, Items }) {
    state.articlePaginationCursor = Cursor;
    state.articles.push(...Items);
  },
};

export const actions = {
  async fetchArticles({ commit }, params) {
    const response = await this.$axios.$get('/articles', { params });
    commit('SET_ARTICLES', response);
  },

  async fetchRecentArticles({ commit }, params) {
    const response = await this.$axios.$get('/articles?recent=true', {
      params,
    });
    commit('SET_RECENT_ARTICLES', response);
  },

  async fetchNextArticlesPage({ state, commit }, params) {
    const response = await this.$axios.$get('/articles', {
      params: { ...params, from: state.articlePaginationCursor },
    });
    commit('STORE_ARTICLES_PAGE', response);
  },
};
