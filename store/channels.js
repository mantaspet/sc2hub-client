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

function processChannels(channels, getters, rootState, rootGetters) {
  const playerIdRegexes = rootGetters['players/playerIdRegexes'];
  const matchupRegexes = rootGetters['matchups/matchupRegexes'];
  const raceRegexes = rootGetters['races/raceRegexes'];

  if (rootState.settings.enableSpoilers || !channels) {
    return channels;
  }

  // spoilers are disabled but playerIds are not loaded yet
  if (!playerIdRegexes && !rootState.settings.enableSpoilers) {
    return null;
  }

  const processedChannels = [];
  for (let i = 0; i < channels.length; i++) {
    const channel = channels[i];
    let channelTitle = channel.title;
    for (let j = 0; j < playerIdRegexes.length; j++) {
      channelTitle = channelTitle.replace(playerIdRegexes[j], '<player>');
    }
    for (let j = 0; j < matchupRegexes.length; j++) {
      channelTitle = channelTitle.replace(matchupRegexes[j], '<matchup>');
    }
    for (let j = 0; j < raceRegexes.length; j++) {
      channelTitle = channelTitle.replace(raceRegexes[j], '<race>');
    }
    processedChannels.push({
      ...channel,
      title: channelTitle,
      thumbnailUrl: '/twitch-placeholder.jpg',
    });
  }
  return processedChannels;
}

export const state = () => ({
  liveChannels: null,
  liveRegisteredChannels: null,
  liveChannelsPaginationCursor: '',
});

export const getters = {
  liveChannels(state, getters, rootState, rootGetters) {
    return processChannels(state.liveChannels, getters, rootState, rootGetters);
  },

  liveRegisteredChannels(state, getters, rootState, rootGetters) {
    return processChannels(
      state.liveRegisteredChannels,
      getters,
      rootState,
      rootGetters,
    );
  },
};

export const mutations = {
  SET_LIVE_CHANNELS(state, { Items, Cursor }) {
    state.liveChannels = decorateChannels(Items);
    state.liveChannelsPaginationCursor = Cursor;
  },

  SET_LIVE_REGISTERED_CHANNELS(state, Items) {
    state.liveRegisteredChannels = decorateChannels(Items);
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

  async fetchLiveRegisteredChannels({ commit }, params) {
    const response = await this.$axios.$get('/channels/live-registered', {
      params,
    });
    commit('SET_LIVE_REGISTERED_CHANNELS', response);
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
