<template>
  <div id="app">
    <h1>
      <img src="@/assets/logo.png" class="logo" />
      <span class="logo-text">ue movies</span>
    </h1>

    <p v-for="movie in displayedMovies" :key="movie.id">
      <span class="mr-1" :class="movie.deleted ? 'deleted' : ''">{{
        movie.title
      }}</span>
      <span v-if="movie.deleted" class="pill">Borrada</span>
      <span v-if="movie.favourite" class="pill">Favorita</span>

      <m-button
        title="🗑"
        type="trans"
        @pressed="deleteMovie(movie.id)"
        v-if="!movie.deleted"
      ></m-button>
      <m-button
        title="🌟"
        type="trans"
        @pressed="addFavourite(movie.id)"
        v-if="!movie.favourite"
      ></m-button>
    </p>

    <div>
      <input
        type="text"
        v-model.trim="newMovie"
        class="mr-1"
        placeholder="Título de la película"
        @keyup.enter="addMovie"
      />
      <m-button
        title="Añafdir película"
        type="default"
        @pressed="addMovie"
      ></m-button>

      <br />

      <input id="show-deleted" type="checkbox" v-model="showAll" />
      <label for="show-deleted">Mostrar todas</label>

      <br />
      <small v-if="showError" style="color: indianred">
        Debe introducir el título de la película para añadirla
      </small>
    </div>

    <br />
    <h2>Favoritas</h2>
    <p v-for="movie in favouriteMovies" :key="'favourite-' + movie.id">
      {{ movie.title }}
    </p>

    <br />
    <h2>Busca tu película</h2>
    <label for="search" class="mr-1">Buscar película</label>
    <input
      type="text"
      placeholder="búsqueda..."
      v-model="searchMovie"
      id="search"
      class="mr-1"
    />
    <i v-if="isSearching" class="fas fa-circle-notch fa-spin"></i>

    <p v-for="movie in searchedMovies" :key="'searched-' + movie.id">
      <img
        :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path"
        alt="imagen de la película"
      />
      <br />
      {{ movie.title }}
      <br />
      <m-button
        title="Mostrar detalles"
        type="default"
        @pressed="movieDetails(movie.id)"
      ></m-button>
    </p>
  </div>
</template>

<script>
import data from "@/data/data.json";
import MButton from "./components/MButton.vue";
import mdb from "@/api/api.js";

let counter = data.data.length;

export default {
  name: "App",
  components: { MButton },
  data() {
    return {
      movies: data.data,
      newMovie: "",
      showError: false,
      showAll: false,
      //Búsqueda
      searchMovie: "",
      searchedMovies: [],
      debounce: null,
      isSearching: false,
      details: null,
    };
  },
  computed: {
    displayedMovies() {
      if (!this.showAll) {
        return this.movies.filter((movie) => !movie.deleted);
      } else return this.movies;
    },
    favouriteMovies() {
      if (this.showAll) {
        return this.movies.filter((movie) => movie.favourite);
      }
      return this.movies.filter((movie) => movie.favourite && !movie.deleted);
    },
  },
  watch: {
    searchMovie: function(newValue) {
      clearInterval(this.debounce);

      if (newValue === "") {
        this.searchedMovies = [];
        this.isSearching = false;
      } else {
        this.isSearching = true;
        this.debounce = setTimeout(() => {
          mdb.searchMovies(newValue).then((movies) => {
            this.searchedMovies = movies;
            this.isSearching = false;
          });
        }, 500);
      }
    },
  },
  methods: {
    addMovie() {
      this.showError = false;
      if (this.newMovie !== "") {
        counter += 1;
        this.movies.push({
          title: this.newMovie,
          deleted: false,
          favourite: false,
          id: counter,
        });
        this.newMovie = "";
      } else {
        this.showError = true;
      }
    },
    deleteMovie(movieId) {
      const movie = this.movies.find((movie) => movie.id === movieId);
      if (movie !== undefined) {
        movie.deleted = true;
      }
    },
    addFavourite(movieId) {
      const movie = this.movies.find((movie) => movie.id === movieId);
      if (movie !== undefined) {
        movie.favourite = true;
      }
    },
    movieDetails(movieId) {
      mdb.getMovieDetails(movieId).then((details) => {
        this.details = details;
        console.log(details);
      });
    },
  },
};
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

.red {
  background-color: indianred;
}

.blue {
  background-color: cornflowerblue;
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

.deleted {
  text-decoration: line-through;
}

.pill {
  font-size: 0.7rem;
  background-color: #ddd;
  border: none;
  color: black;
  padding: 0.3rem 0.5rem;
  margin: 0.3rem 0.25rem;
  border-radius: 16px;
}
</style>
