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
      const response = await this.$axios.$post('/auth/token', payload);
      commit('SET_ACCESS_TOKEN', response);
      this.$router.push('/admin/dashboard');
      localStorage.setItem('sc2hubAccessToken', response);
    } catch (e) {
      alert('Wrong username or password');
    }
  },
};
