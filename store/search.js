import { decorateVideos, processVideos } from '@/store/videos';

export const state = () => ({
  searchQuery: '',
  videoSearchResults: [],
  videoSearchResultsPaginationCursor: 0,
});

export const getters = {
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
  async fetchVideoSearchResults({ commit }, { query }) {
    const params = {
      page_size: 12,
      query,
    };
    const response = await this.$axios.$get('/videos', { params });
    commit('SET_VIDEO_SEARCH_RESULTS', response);
  },

  async fetchNextVideoSearchResultsPage({ state, commit }) {
    const params = {
      page_size: 12,
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
