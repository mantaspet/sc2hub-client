import Vue from 'vue';
import { removeArrayItem, updateArrayItem } from '@/util/array';
import { showMessage } from '@/util/popup-messages';

export const getChannelUrl = (channel) => {
  let url = '';
  if (channel.PlatformID === 1) {
    url = `https://twitch.tv/${channel.Login}`;
  } else if (channel.PlatformID === 2) {
    url = 'https://youtube.com/';
    url += channel.Login ? `user/${channel.Login}` : `channel/${channel.ID}`;
  }
  return url;
};

export const state = () => ({
  eventCategoryChannelsMap: {},
  newChannel: {},
  channelValidationErrors: {},
});

export const mutations = {
  SET_EVENT_CATEGORY_CHANNELS(state, { channels, eventCategoryId }) {
    Vue.set(state.eventCategoryChannelsMap, eventCategoryId, channels);
  },

  STORE_EVENT_CATEGORY_CHANNEL(state, { channel, eventCategoryId }) {
    if (state.eventCategoryChannelsMap[eventCategoryId]) {
      state.eventCategoryChannelsMap[eventCategoryId].push(channel);
    }
    state.newChannel = {};
    state.channelValidationErrors = {};
  },

  UPDATE_EVENT_CATEGORY_CHANNEL(state, { channel, eventCategoryId }) {
    Vue.set(
      state.eventCategoryChannelsMap,
      eventCategoryId,
      updateArrayItem(state.eventCategoryChannelsMap[eventCategoryId], channel),
    );
  },

  SET_CHANNEL_VALIDATION_ERRORS(state, errors) {
    state.channelValidationErrors = errors;
  },

  CLEAR_CHANNEL_VALIDATION_ERRORS(state, field) {
    Vue.delete(state.channelValidationErrors, field);
  },

  REMOVE_EVENT_CATEGORY_CHANNEL(state, { eventCategoryId, channel }) {
    Vue.set(
      state.eventCategoryChannelsMap,
      eventCategoryId,
      removeArrayItem(state.eventCategoryChannelsMap[eventCategoryId], channel),
    );
  },
};

export const actions = {
  async fetchEventCategoryChannels({ commit }, eventCategoryId) {
    const channels = await this.$axios.$get(
      `/event-categories/${eventCategoryId}/channels`,
    );
    commit('SET_EVENT_CATEGORY_CHANNELS', {
      channels,
      eventCategoryId,
    });
  },

  async createEventCategoryChannel({ commit }, { eventCategoryId, channel }) {
    try {
      const newChannel = await this.$axios.$post(
        `/event-categories/${eventCategoryId}/channels`,
        channel,
      );
      commit('STORE_EVENT_CATEGORY_CHANNEL', {
        channel: newChannel,
        eventCategoryId,
      });
      await this.$router.push(`/admin/event-categories/${eventCategoryId}`);
    } catch (e) {
      commit('SET_CHANNEL_VALIDATION_ERRORS', e.response?.data || {});
    }
  },

  async updateEventCategoryChannel({ commit }, { eventCategoryId, channel }) {
    try {
      const newChannel = await this.$axios.$put(
        `/channels/${channel.ID}`,
        channel,
      );
      commit('UPDATE_EVENT_CATEGORY_CHANNEL', {
        channel: newChannel,
        eventCategoryId,
      });
    } catch (e) {
      showMessage('Channel update failed');
    }
  },

  resetChannelValidationErrors({ commit }) {
    commit('SET_CHANNEL_VALIDATION_ERRORS', {});
  },

  clearChannelValidationErrors({ state, commit }, field) {
    if (state.channelValidationErrors[field]) {
      commit('CLEAR_CHANNEL_VALIDATION_ERRORS', field);
    }
  },

  async deleteEventCategoryChannel({ commit }, { eventCategoryId, channel }) {
    if (!confirm('Delete this channel?')) {
      return;
    }

    await this.$axios.$delete(
      `/event-categories/${eventCategoryId}/channels/${channel.ID}`,
    );
    commit('REMOVE_EVENT_CATEGORY_CHANNEL', {
      eventCategoryId,
      channel,
    });
  },
};
