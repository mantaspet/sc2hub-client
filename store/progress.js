// for tracking http call progress
// this effectively replaces all the pointless loading state booleans

import Vue from 'vue';

export const state = () => ({
  pendingRequests: {},
});

export const getters = {
  // Use this to show progress indicators for API requests
  // e.g.: $store.getters.loading['get:api/users']
  loading(state) {
    return state.pendingRequests;
  },
};

export const mutations = {
  STORE_PENDING_REQUEST(state, url) {
    Vue.set(state.pendingRequests, url, true);
  },

  REMOVE_PENDING_REQUEST(state, url) {
    Vue.delete(state.pendingRequests, url);
  },
};
