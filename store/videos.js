import { getHumanizedDate } from '@/util/date';
import { getHumanizedDuration, getHumanizedNumber } from '@/util/number';

function decorateVideos(videos) {
  for (let i = 0; i < videos.length; i++) {
    const v = videos[i];
    if (v.PlatformID === 1 && v.ThumbnailURL) {
      v.ThumbnailURL = v.ThumbnailURL.replace('%{width}', '640').replace(
        '%{height}',
        '360',
      );
    }
    if (!v.ThumbnailURL) {
      v.ThumbnailURL = v.PlatformID
        ? '/twitch-placeholder.jpg'
        : '/youtube-placeholder.png';
    }
    v.ViewCount = getHumanizedNumber(v.ViewCount, 'view', 'views');
    v.Duration = getHumanizedDuration(v.Duration);
    if (v.PlatformID === 1) {
      // twitch video
      v.VideoURL = `https://www.twitch.tv/videos/${v.ID}`;
    } else {
      // youtube video
      v.VideoURL = `https://www.youtube.com/watch?v=${v.ID}?autoplay=1`;
    }
  }
  return videos;
}

function processVideos(videos, getters, rootState, rootGetters) {
  const playerIdRegexes = rootGetters['players/playerIdRegexes'];
  const matchupRegexes = rootGetters['matchups/matchupRegexes'];
  const raceRegexes = rootGetters['races/raceRegexes'];
  const now = new Date();

  if (!videos) {
    return null;
  }

  // spoilers are disabled but playerIds are not loaded yet
  if (!playerIdRegexes && !rootState.settings.enableSpoilers) {
    return null;
  }

  if (rootState.settings.enableSpoilers) {
    return videos.map((v) => ({
      ...v,
      CreatedAtHumanized: getHumanizedDate(v.CreatedAt, now),
    }));
  }

  // remove spoilers from videos
  const processedVideos = [];
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    let videoTitle = video.Title;
    for (let j = 0; j < playerIdRegexes.length; j++) {
      videoTitle = videoTitle.replace(playerIdRegexes[j], '<player>');
    }
    for (let j = 0; j < matchupRegexes.length; j++) {
      videoTitle = videoTitle.replace(matchupRegexes[j], '<matchup>');
    }
    for (let j = 0; j < raceRegexes.length; j++) {
      videoTitle = videoTitle.replace(raceRegexes[j], '<race>');
    }
    processedVideos.push({
      ...video,
      Title: videoTitle,
      ThumbnailURL:
        video.PlatformID === 1
          ? '/twitch-placeholder.jpg'
          : '/youtube-placeholder.png',
    });
  }
  return processedVideos.map((v) => ({
    ...v,
    CreatedAtHumanized: getHumanizedDate(v.CreatedAt, now),
  }));
}

export const state = () => ({
  lastOpenedVideos: null,
  videos: null,
  recentVideos: null,
  videoPaginationCursor: 0,
});

export const getters = {
  videos(state, getters, rootState, rootGetters) {
    return processVideos(state.videos, getters, rootState, rootGetters);
  },

  lastOpenedVideos(state, getters, rootState, rootGetters) {
    return processVideos(
      state.lastOpenedVideos,
      getters,
      rootState,
      rootGetters,
    );
  },

  recentVideos(state, getters, rootState, rootGetters) {
    return processVideos(state.recentVideos, getters, rootState, rootGetters);
  },
};

export const mutations = {
  SET_LAST_OPENED_VIDEOS(state, videos) {
    state.lastOpenedVideos = videos;
  },

  STORE_LAST_OPENED_VIDEO(state, video) {
    // last 4
    state.lastOpenedVideos = state.lastOpenedVideos?.filter(
      (v) => v.ID !== video.ID,
    );
    state.lastOpenedVideos = [
      video,
      ...(state.lastOpenedVideos?.slice(0, 3) || []),
    ];
  },

  REMOVE_LAST_OPENED_VIDEO(state, video) {
    state.lastOpenedVideos = state.lastOpenedVideos.filter(
      (v) => v.ID !== video.ID,
    );
  },

  SET_VIDEOS(state, payload) {
    state.videoPaginationCursor = payload.Cursor;
    state.videos = decorateVideos(payload.Items);
  },

  SET_RECENT_VIDEOS(state, payload) {
    state.recentVideos = decorateVideos(payload.Items);
  },

  STORE_VIDEOS_PAGE(state, payload) {
    state.videoPaginationCursor = payload.Cursor;
    state.videos.push(...decorateVideos(payload.Items));
  },
};

export const actions = {
  async fetchVideos({ commit }, params) {
    const response = await this.$axios.$get('/videos', { params });
    commit('SET_VIDEOS', response);
  },

  async fetchNextVideosPage({ state, commit }, params) {
    const response = await this.$axios.$get('/videos', {
      params: { ...params, from: state.videoPaginationCursor },
    });
    commit('STORE_VIDEOS_PAGE', response);
  },

  async fetchRecentVideos({ commit }, params) {
    const response = await this.$axios.$get('/videos?recent=true', { params });
    commit('SET_RECENT_VIDEOS', response);
  },

  loadLastOpenedVideos({ state, commit }) {
    if (state.lastOpenedVideos) {
      return;
    }
    try {
      let videos = localStorage.getItem('lastOpenedVideos');
      if (videos) {
        videos = JSON.parse(videos);
        if (videos.length) {
          commit('SET_LAST_OPENED_VIDEOS', videos);
        }
      }
    } catch (e) {
      localStorage.removeItem('lastOpenedVideos');
    }
  },

  storeLastOpenedVideo({ rootState, state, commit }, video) {
    const videoWithSpoilers = !rootState.settings.enableSpoilers
      ? state.videos.find((v) => v.ID === video.ID)
      : video;
    commit('STORE_LAST_OPENED_VIDEO', videoWithSpoilers);
    localStorage.setItem(
      'lastOpenedVideos',
      JSON.stringify(state.lastOpenedVideos),
    );
  },

  removeLastOpenedVideo({ commit }, video) {
    commit('REMOVE_LAST_OPENED_VIDEO', video);
    localStorage.setItem(
      'lastOpenedVideos',
      JSON.stringify(state.lastOpenedVideos),
    );
  },
};
