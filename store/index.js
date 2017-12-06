import axios from 'axios'

export const state = () => ({
  user: null,
  notifications: []
})

export const mutations = {
  SET_USER: function (state, user) {
    state.user = user
  },

  ADD_ALERT_SUCCESS: (state, message) => state.notifications.push({ type: 'success', message })
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.user) {
      commit('SET_USER', req.user)
    }
  },

  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }
}
