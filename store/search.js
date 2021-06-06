import { decorateVideos, processVideos } from '@/store/videos';
import { processArticles } from '@/store/articles';

const SEARCH_RESULTS_PAGE_SIZE = 12;

export const state = () => ({
  articleSearchResults: [],
  articleSearchResultsPaginationCursor: 0,
  searchQuery: '',
  videoSearchResults: [],
  videoSearchResultsPaginationCursor: 0,
});

export const getters = {
  articleSearchResults(state, getters, rootState, rootGetters) {
    return processArticles(
      state.articleSearchResults,
      getters,
      rootState,
      rootGetters,
    );
  },

  videoSearchResults(state, getters, rootState, rootGetters) {
    return processVideos(
      state.videoSearchResults,
      rootState.settings.enableSpoilers,
      rootGetters['players/playerIdRegexes'],
      rootGetters['matchups/matchupRegexes'],
      rootGetters['races/raceRegexes'],
    );
  },
};

export const mutations = {
  SET_SEARCH_QUERY(state, value) {
    state.searchQuery = value;
  },

  SET_ARTICLE_SEARCH_RESULTS(state, payload) {
    state.articleSearchResultsPaginationCursor = payload.Cursor;
    state.articleSearchResults = payload.Items;
  },

  STORE_ARTICLE_SEARCH_RESULTS_PAGE(state, payload) {
    state.articleSearchResultsPaginationCursor = payload.Cursor;
    state.articleSearchResults.push(...payload.Items);
  },

  SET_VIDEO_SEARCH_RESULTS(state, payload) {
    state.videoSearchResultsPaginationCursor = payload.Cursor;
    state.videoSearchResults = decorateVideos(payload.Items);
  },

  STORE_VIDEO_SEARCH_RESULTS_PAGE(state, payload) {
    state.videoSearchResultsPaginationCursor = payload.Cursor;
    state.videoSearchResults.push(...decorateVideos(payload.Items));
  },
};

export const actions = {
  async fetchSearchResults({ commit }, { query }) {
    const requests = [];
    const params = {
      page_size: SEARCH_RESULTS_PAGE_SIZE,
      query,
    };
    let videosResponse = null;
    let articlesResponse = null;

    requests.push(
      this.$axios.$get('/videos', { params }).then((res) => {
        videosResponse = res;
      }),
    );
    requests.push(
      this.$axios.$get('/articles', { params }).then((res) => {
        articlesResponse = res;
      }),
    );

    await Promise.allSettled(requests);

    if (videosResponse) {
      commit('SET_VIDEO_SEARCH_RESULTS', videosResponse);
    }

    if (articlesResponse) {
      commit('SET_ARTICLE_SEARCH_RESULTS', articlesResponse);
    }
  },

  async fetchNextArticleVideoSearchResultsPage({ state, commit }) {
    const params = {
      page_size: SEARCH_RESULTS_PAGE_SIZE,
      query: state.searchQuery,
      from: state.articleSearchResultsPaginationCursor,
    };
    const response = await this.$axios.$get('/articles', { params });
    commit('STORE_ARTICLE_SEARCH_RESULTS_PAGE', response);
  },

  async fetchNextVideoSearchResultsPage({ state, commit }) {
    const params = {
      page_size: SEARCH_RESULTS_PAGE_SIZE,
      query: state.searchQuery,
      from: state.videoSearchResultsPaginationCursor,
    };
    const response = await this.$axios.$get('/videos', { params });
    commit('STORE_VIDEO_SEARCH_RESULTS_PAGE', response);
  },

  storeLastOpenedVideo({ rootState, state, commit }, { event, video }) {
    const videoWithSpoilers = !rootState.settings.enableSpoilers
      ? state.videoSearchResults.find((v) => v.ID === video.ID)
      : video;
    commit('videos/STORE_LAST_OPENED_VIDEO', videoWithSpoilers, { root: true });
    localStorage.setItem(
      'lastOpenedVideos',
      JSON.stringify(rootState.videos.lastOpenedVideos),
    );
  },
};
