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
    />
    <p v-for="movie in searchedMovies" :key="'searched-' + movie.id">
      {{ movie.title }}
    </p>
  </div>
</template>

<script>
import data from "@/data/data.json";
import MButton from "./components/MButton.vue";

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
      }
      this.debounce = setTimeout(() => {
        this.searchedMovies = this.movies.filter((movie) =>
          movie.title.includes(newValue)
        );
      }, 2000);
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
</style>
