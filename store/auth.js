export const state = () => ({
  accessToken: null,
});

export const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token;
    this.$axios.setToken(token);
  },
};

export const actions = {
  async login({ commit }, payload) {
    try {
      const token = await this.$axios.$post('/auth/token', payload);
      commit('SET_ACCESS_TOKEN', token);
      this.$router.push('/admin/dashboard');
      localStorage.sc2hubAccessToken = token;
    } catch (e) {
      alert('Wrong username or password');
    }
  },

  logout({ commit }) {
    localStorage.removeItem('sc2hubAccessToken');
    commit('SET_ACCESS_TOKEN', null);
    this.$router.push('/login');
  },
};
