<template>
  <div id="app">
    <the-header
        @login="login"
        :user="user"
    />

    <router-view
        :user="user"
    />
  </div>
</template>

<script>
import data from "@/data/data.json";
import mdb from "@/api/api";
import TheHeader from "@/components/header/TheHeader";
import PopularMovies from "@/components/movies/PopularMovies";
import FavouriteMovies from "@/components/movies/FavouriteMovies";
import SearchMovies from "@/components/movies/SearchMovies";

let counter = data.data.length;

export default {
  name: 'App',
  components: {TheHeader},
  data() {
    return {
      movies: data.data,
      showDeleted: false,
      selectedTab: 0,
      components: [
        PopularMovies,
        SearchMovies,
        FavouriteMovies,
      ],
      useDynamicComponents: false,
      user: null,
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    const requestToken = urlParams.get('request_token')
    if (requestToken !== null) {
      this.createSession(requestToken)
    }
    if (mdb.hasSessionId()) {
      this.getAccount()
    }
  },
  methods: {
    addMovie(newMovie) {
      counter += 1;
      this.movies.push({
        title: newMovie,
        deleted: false,
        favourite: false,
        id: counter
      })
    },
    deleteMovie(movieId) {
      const movie = this.movies.find(movie => movie.id === movieId)
      if (movie !== undefined) {
        movie.deleted = true
      }
    },
    addFavourite(movieId) {
      const movie = this.movies.find(movie => movie.id === movieId)
      if (movie !== undefined) {
        movie.favourite = true
      }
    },
    // this can be use instead of watcher to search movies in api
    async asyncSearchMovies() {
      this.searchedMovies = await mdb.asyncSearchMovies(this.searchTerm)
    },
    login() {
      mdb.requestToken()
        .then(url => {
          // console.log(url)
          location.replace(url)
        })
    },
    createSession(requestToken) {
      mdb.createSession(requestToken)
        .then(sessionID => {
          console.log(sessionID)
          location.replace('/')
        })
    },
    getAccount() {
      mdb.getAccount()
        .then(user => this.user = user)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}

.container {
  border: solid;
  display: block;
  padding: 1rem;
  margin: 1rem auto;
  width: 50%;
  min-width: 25rem;
  max-width: 40rem;
}

.mr-1 {
  margin-right: 1rem;
}

.ml-1 {
  margin-left: 1rem;
}

.box {
  margin: 1rem;
  width: 5rem;
  height: 5rem;
  display: inline-block;
  background-color: lightgray;
}

.grey {
  background-color: #ddd;
  color: black;
}

.red {
  background-color: indianred;
  color: white;
}

.blue {
  background-color: cornflowerblue;
  color: white;
}

.border {
  border: solid black 2px;
}

.logo {
  vertical-align: baseline;
  height: 1.65rem;
  margin-bottom: -0.1rem;
}

.logo-text {
  margin-left: -0.1rem;
}
</style>
