<template>
  <div id="app">
    <the-header
      :tabs="['Populares', 'Favoritas', 'Buscar']"
      @select="selected"
    ></the-header>

    <p v-for="movie in displayedMovies" :key="movie.id">
      <span class="mr-1">{{ movie.title }}</span>
      <m-pill v-if="movie.deleted">Borrada</m-pill>
      <m-pill v-if="movie.favourite">Favorita</m-pill>
      <m-button @click="addFavourite(movie.id)" v-if="!movie.favourite">
        <i class="far fa-star"></i>
      </m-button>
      <m-button
        @click="deleteMovie(movie.id)"
        type="danger"
        v-if="!movie.deleted"
      >
        <i class="far fa-trash-alt"></i>
      </m-button>
    </p>

    <div>
      <br />

      <m-input
        id="add-movie"
        type="text"
        placeholder="Título de la película"
        v-model.trim="newMovie"
        @keyup.enter="addMovie"
      >
        <m-button @click="addMovie" title="Añadir película" />
      </m-input>
      <br />
      <small v-if="showError" style="color: indianred">
        Debe introducir el título de la película para añadirla
      </small>
      <br />

      <m-checkbox
        id="show-deleted"
        label="Mostrar películas borradas"
        v-model="showDeleted"
      ></m-checkbox>
    </div>

    <br />
    <h2>Favoritas</h2>
    <p v-for="movie in favouriteMovies" :key="'favorite-' + movie.id">
      {{ movie.title }}
    </p>

    <br />
    <h2>Busca tu película</h2>
    <m-select
      id="select"
      label="Selecciona el año"
      :options="options"
      v-model="year"
    />
    <br />

    <m-input
      id="search-1"
      label="Buscar película:"
      placeholder="Búsqueda..."
      v-model="searchTerm"
    >
      <span v-if="isSearching">
        <i class="fas fa-circle-notch fa-spin"></i>
      </span>
    </m-input>

    <div class="cards">
      <movie-card
        v-for="movie in searchedMovies"
        :movie="movie"
        :key="'searched-' + movie.id"
        @click="getMovieDetail(movie.id)"
      ></movie-card>
    </div>
  </div>
</template>

<script>
import data from "@/data/data.json";
import MButton from "@/components/MButton";
import mdb from "@/api/api";
import MPill from "./components/MPill.vue";
import MovieCard from "./components/MovieCard.vue";
import TheHeader from "./components/TheHeader.vue";
import MInput from "./components/MInput.vue";
import MCheckbox from "./components/MCheckbox.vue";
import MSelect from "@/components/MSelect";

let counter = data.data.length;

const optionsGenerator = () => {
  let array = [];
  let actualYear = new Date();
  actualYear = actualYear.getFullYear();
  let lowLimit = actualYear - 40;
  for (let i = actualYear; i >= lowLimit; i--) {
    array.push(i);
  }
  return array;
};

export default {
  name: "App",
  components: {
    MButton,
    MPill,
    MovieCard,
    TheHeader,
    MInput,
    MCheckbox,
    MSelect,
  },
  data() {
    return {
      movies: data.data,
      newMovie: "",
      showError: false,
      showDeleted: false,
      // búsqueda
      searchedMovies: [],
      searchTerm: "",
      isSearching: false,
      debounce: null,
      movieDetail: null,
      year: "",
      options: optionsGenerator(),
    };
  },
  computed: {
    displayedMovies() {
      if (this.showDeleted) {
        return this.movies;
      }
      return this.movies.filter((movie) => !movie.deleted);
    },
    favouriteMovies() {
      if (this.showDeleted) {
        return this.movies.filter((movie) => movie.favourite);
      }
      return this.movies.filter((movie) => movie.favourite && !movie.deleted);
    },
  },
  watch: {
    searchTerm() {
      this.searchMovies();
    },
    year() {
      this.searchMovies();
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
    // this can be use instead of watcher to search movies in api
    async asyncSearchMovies() {
      this.searchedMovies = await mdb.asyncSearchMovies(this.searchTerm);
    },
    getMovieDetail(movieID) {
      mdb.getMovieDetails(movieID).then((movie) => {
        this.movieDetail = movie;
        console.log(this.movieDetail);
      });
    },
    async asyncGetMovieDetail(movieID) {
      this.movieDetail = await mdb.getMovieDetails(movieID);
    },
    selected(tab) {
      console.log(tab);
    },
    searchMovies() {
      clearInterval(this.debounce);
      if (this.searchTerm === "") {
        this.searchedMovies = [];
        this.isSearching = false;
      } else {
        const params = { query: this.searchTerm };
        if (this.year !== "") {
          params.year = this.year;
        }
        this.isSearching = true;
        this.debounce = setTimeout(() => {
          mdb.searchMovies(params).then((movies) => {
            this.searchedMovies = movies;
            this.isSearching = false;
          });
        }, 500);
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
.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
