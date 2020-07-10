import { getHumanizedNumber } from '../util/number';

function decorateChannels(channels) {
  return channels.map((channel) => ({
    userName: channel.user_name,
    viewerCount: getHumanizedNumber(channel.viewer_count, 'viewer', 'viewers'),
    thumbnailUrl: channel.thumbnail_url
      .replace('{width}', '640')
      .replace('{height}', '360'),
    title: channel.title,
  }));
}

export const state = () => ({
  liveChannels: null,
  liveChannelsPaginationCursor: '',
  // liveRegisteredChannels: null,
});

export const mutations = {
  SET_LIVE_CHANNELS(state, { Items, Cursor }) {
    state.liveChannels = decorateChannels(Items);
    state.liveChannelsPaginationCursor = Cursor;
  },

  STORE_LIVE_CHANNELS_PAGE(state, { Items, Cursor }) {
    const uniqueChannelsMap = {};
    state.liveChannels.forEach((channel) => {
      uniqueChannelsMap[channel.userName] = channel;
    });
    decorateChannels(Items).forEach((channel) => {
      uniqueChannelsMap[channel.userName] = channel;
    });
    state.liveChannels = Object.values(uniqueChannelsMap);
    state.liveChannelsPaginationCursor = Cursor;
  },
};

export const actions = {
  async fetchLiveChannels({ commit }, params) {
    const response = await this.$axios.$get('/channels/live', {
      params,
    });
    commit('SET_LIVE_CHANNELS', response);
  },

  async fetchNextLiveChannelsPage({ state, commit }, params) {
    const response = await this.$axios.$get('/channels/live', {
      params: {
        ...params,
        from: state.liveChannelsPaginationCursor,
      },
    });
    commit('STORE_LIVE_CHANNELS_PAGE', response);
  },
};
