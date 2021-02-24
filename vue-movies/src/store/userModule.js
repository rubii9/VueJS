import mdb from "@/api/api";

export default {
  SESSION_KEY: 'session_id',
  namespaced: true,
  state: {
    user: null,
    sessionId: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId
    },
  },
  actions: {
    createSession({commit, dispatch}, requestToken) {
      mdb.createSession(requestToken)
          .then(sessionId => {
            localStorage.setItem(this.SESSION_KEY, sessionId)
            commit('setSessionId', sessionId)
            dispatch('getAccount')
          })
    },
    getAccount({commit, state, dispatch, rootState}) {
      if (state.sessionId === null) {
        commit('setSessionId', localStorage.getItem(this.SESSION_KEY))
      }
      if (state.sessionId !== null) {
        mdb.getAccount(state.sessionId)
            .then(user => {
              commit('setUser', user)
              if (rootState.movie.favouriteMovies.length === 0) {
                dispatch('movie/getFavouriteMovies', null, {root: true})
              }
            })
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null
    },
  }
}