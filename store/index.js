export const state = () => ({
  user: null,
  transactions: [],
  notifications: [],
  categories: []
})

export const mutations = {
  SET_CATEGORIES: (state, categories) => {
    state.categories = categories
  },

  SET_USER: function (state, user) {
    console.log(user)
    state.user = user
  },

  SET_TRANSACTIONS: (state, transactions) => {
    state.transactions = transactions || []
  },

  ADD_TRANSACTION: (state, transaction) => {
    state.transactions.push(transaction)
  },

  ADD_ALERT_SUCCESS: (state, message) => state.notifications.push({ type: 'success', message }),

  REMOVE_ALERT_SUCCESS: (state, message) => {
    const index = state.notifications.indexOf(message)
    state.notifications.splice(index, 1)
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    commit('SET_CATEGORIES', await this.$axios.$get(`/api/categories`))

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
  },

  async wantIt ({ state, commit }, product) {
    const transaction = {
      status: 'pending',
      product: product._id,
      owner: state.user._id
    }
    commit('ADD_TRANSACTION', await this.$axios.$post('/api/transactions', transaction))
  }
}
