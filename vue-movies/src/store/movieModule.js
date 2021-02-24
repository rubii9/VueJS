import mdb from "@/api/api";

export default {
  namespaced: true,
  state: {
    popularMovies: [],
    favouriteMovies: [],
    selectedMovie: null,
    isLoading: false,
  },
  mutations: {
    setPopularMovies(state, movies) {
      state.popularMovies = movies
    },
    setFavouriteMovies(state, movies) {
      state.favouriteMovies = movies
    },
    setMovie(state, movie) {
      state.selectedMovie = movie
    },
    setFavourite(state) {
      if (state.selectedMovie.userData) {
        const newUserData = {...state.selectedMovie.userData}
        state.selectedMovie.userData.favorite = true
        newUserData.favorite = true
        state.selectedMovie.userData = newUserData
      }
    },
    unsetFavourite(state) {
      if (state.selectedMovie.userData) {
        const newUserData = {...state.selectedMovie.userData}
        newUserData.favorite = false
        state.selectedMovie.userData = newUserData
      }
    },
    startLoading(state) {
      state.isLoading = true
    },
    finishLoading(state) {
      state.isLoading = false
    },
  },
  actions: {
    getPopular({commit}) {
      commit('startLoading')
      mdb.getPopular()
          .then(movies => {
            commit('setPopularMovies', movies)
            commit('finishLoading')
          })
          .catch(() => {
            commit('finishLoading')
          })
    },
    markFavourite({state, dispatch, commit, rootState}) {
      if (rootState.user.user !== null && state.selectedMovie !== null) {
        commit('setFavourite')
        mdb.markAsFavourite(rootState.user.user.id, state.selectedMovie.id)
            .then(() => {
              dispatch('updateMovie', state.selectedMovie.id)
              dispatch('getFavouriteMovies')
            })
            .catch(() => {
              commit('unsetFavourite')
            })
      }

    },
    unmarkFavourite({state, dispatch, commit, rootState}) {
      if (rootState.user.user !== null && state.selectedMovie !== null) {
        commit('unsetFavourite')
        mdb.unmarkAsFavourite(rootState.user.user.id, state.selectedMovie.id)
            .then(() => {
              dispatch('updateMovie', state.selectedMovie.id)
              dispatch('getFavouriteMovies')
            })
            .catch(() => {
              commit('setFavourite')
            })
      }
    },
    async getMovieDetails({commit, dispatch}, movieId) {
      commit('setMovie', null)
      commit('startLoading')
      try {
        await dispatch('updateMovie', movieId)
        commit('finishLoading')
      } catch {
        commit('finishLoading')
      }
    },
    async updateMovie({commit, rootState}, movieId) {
      const movie = await mdb.getMovieDetails(movieId)
      if (rootState.user.user !== null) {
        const userMovieData = await mdb.getUserMovieDetail(movieId)
        movie.userData = userMovieData
      }
      commit('setMovie', movie)
    },
    getFavouriteMovies({rootState, commit}) {
      if (rootState.user.user !== null) {
        commit('startLoading')
        mdb.getFavourites(rootState.user.user.id)
            .then(movies => {
              commit('setFavouriteMovies', movies)
              commit('finishLoading')
            })
            .catch(() => {
              commit('finishLoading')
            })
      }
    },
  },
  getters: {
    countFavourites(state, getters, rootState, rootGetters) {
      if (!rootGetters['user/isAuthenticated']) {
        return 0
      }
      return state.favouriteMovies.length
    }
  }
}