import axios from "axios"

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

const defaultArgs = {
  language: 'es',
  api_key: process.env.VUE_APP_MOVIEDB_API_KEY,
}

const defaultConfig = {
  params: defaultArgs
}

const SESSION_KEY = 'session_id'

const mdb = {
  getPopular: function () {
    return instance.get('movie/popular', defaultConfig)
        .then(response => {
          return response.data.results;
        })
  },

  searchMovies: function ({query, year}) {
    let params = {...defaultArgs};
    if (query) {
      params.query = query
    }
    if (year) {
      params.primary_release_year = year
    }

    return instance.get('search/movie', {params})
        .then(response => {
          return response.data.results;
        })
        .catch(error => {
          console.log(error)
        })
  },

  asyncSearchMovies: async (query) => {
    try {
      const response = await instance.get('/search/movie', {
        params: {
          ...defaultArgs,
          query: query,
        }
      })
      return response.data.results
    } catch(error) {
        console.log(error)
    }
  },

  getMovieDetails: (movieID) => {
    return instance.get(`/movie/${movieID}`, defaultConfig)
        .then(response => response.data)
        .catch(error => console.log(error))
  },

  asyncGetMovieDetails: async (movieID) => {
    try {
      const response = await instance.get(`/movie/${movieID}`, defaultConfig)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  // utils
  getImagePath: (path) => {
    return `https://image.tmdb.org/t/p/w342/${path}`
  },

  // authentication
  requestToken: function () {
    return instance.get('/authentication/token/new', defaultConfig)
        .then(response => {
          if (response.data.success) {
            return `https://www.themoviedb.org/authenticate/${response.data.request_token}`
              + `?redirect_to=${process.env.VUE_APP_REDIRECT_URL}`
          } else {
            throw Error('Unnowkn error')
          }
        })
        .catch(error => console.log(error))
  },
  createSession: function (requestToken) {
    const data = {
      request_token: requestToken,
    }
    return instance.post('/authentication/session/new', data, defaultConfig)
        .then(response => {
          if (response.data.success) {
            localStorage.setItem(SESSION_KEY, response.data.session_id)
            return response.data.session_id
          } else {
            throw Error('Unnowkn error')
          }
        })
  },
  hasSessionId() {
    const session_id = localStorage.getItem(SESSION_KEY)
    return session_id !== null
  },
  getAccount: function () {
    return instance.get('/account', {params: {
        ...defaultArgs,
        session_id: localStorage.getItem(SESSION_KEY),
      }})
        .then(response => {
          return response.data
        })
  },

  // authenticated views
  getFavourites(userId) {
    const params = {
      ...defaultArgs,
      session_id: localStorage.getItem(SESSION_KEY),
    }
    return instance.get(`/account/${userId}/favorite/movies`, {params})
        .then(response => {
          return response.data.results
        })
  },
}

export default mdb