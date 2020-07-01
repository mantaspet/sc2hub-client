import { getHumanizedDate } from '../util/date';
import { getHumanizedDuration, getHumanizedNumber } from '../util/number';

function decorateVideos(videos) {
  const now = new Date();
  for (let i = 0; i < videos.length; i++) {
    const v = videos[i];
    if (v.PlatformID === 1 && v.ThumbnailURL) {
      v.ThumbnailURL = v.ThumbnailURL.replace('%{width}', '640').replace(
        '%{height}',
        '360',
      );
    }
    // if (!v.ThumbnailURL) {
    //   v.ThumbnailURL = 'assets/placeholder-thumbnail.png';
    // }
    v.CreatedAt = getHumanizedDate(v.CreatedAt, now);
    v.ViewCount = getHumanizedNumber(v.ViewCount, 'views');
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

export const state = () => ({
  videos: null,
  videoPaginationCursor: 0,
});

export const mutations = {
  SET_VIDEOS(state, payload) {
    state.videoPaginationCursor = payload.Cursor;
    state.videos = decorateVideos(payload.Items);
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
};
