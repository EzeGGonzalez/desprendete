export const state = () => ({
  user: null,
  transactions: [],
  notifications: []
})

export const mutations = {
  SET_USER: function (state, user) {
    state.user = user
  },

  SET_TRANSACTIONS: (state, transactions) => {
    state.transactions = transactions || []
  },

  ADD_ALERT_SUCCESS: (state, message) => state.notifications.push({ type: 'success', message })
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    if (req.user) {
      commit('SET_USER', req.user)
      await dispatch('getTransactions')
    }
  },

  async getTransactions ({commit, state}) {
    commit('SET_TRANSACTIONS', await this.$axios.$get(`/api/user/${state.user._id}/transactions`))
  },

  async logout ({ commit }) {
    await this.$axios.$post('/api/logout')
    commit('SET_USER', null)
  }
}
