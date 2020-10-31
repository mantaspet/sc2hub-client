export const state = () => ({
  playerIds: null,
});

export const getters = {
  playerIdRegexes(state) {
    if (!state.playerIds) {
      return null;
    }
    const regexes = [];
    for (let i = 0; i < state.playerIds.length; i++) {
      // if (!state.playerIds[i] === 'Winter') {
      // remove player 'Winter' to not obscure WCS Winter event titles
      regexes.push(new RegExp(`\\b${state.playerIds[i]}\\b`, 'gi'));
    }
    return regexes;
  },
};

export const mutations = {
  SET_PLAYER_IDS(state, playerIds) {
    state.playerIds = playerIds;
  },
};

export const actions = {
  async loadPlayerIds({ state, commit }) {
    if (state.playerIds) {
      return;
    }
    const playerIds = await this.$axios.$get('/players/ids');
    commit('SET_PLAYER_IDS', playerIds);
  },
};
