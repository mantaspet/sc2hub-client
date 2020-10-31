export const state = () => ({
  enableSpoilers: false,
});

export const mutations = {
  SET_SETTING(state, { key, value }) {
    state[key] = value;
    localStorage.setItem('settings', JSON.stringify(state));
  },

  SET_SETTINGS(state, settings) {
    Object.keys(settings).forEach((key) => {
      state[key] = settings[key];
    });
  },
};

export const actions = {
  loadSettings({ commit }) {
    try {
      let settings = localStorage.getItem('settings');
      if (settings) {
        settings = JSON.parse(settings);
        commit('SET_SETTINGS', settings);
      }
    } catch (e) {
      localStorage.removeItem('settings');
    }
  },
};
