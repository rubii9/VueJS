<template>
  <div id="search-component">
    <h2 id="search">Busca tu película</h2>
    <m-select
        id="select"
        label="Selecciona el año"
        :options="options"
        v-model="year"
    />
    <br>
    <m-input
        id="search-1"
        label="Buscar película"
        v-model="searchTerm"
    >
      <span v-if="isSearching">
        <i class="fas fa-circle-notch fa-spin"></i>
      </span>
    </m-input>

    <p v-if="movieDetail">Seleccionada: {{ movieDetail.title }}</p>

    <movie-deck
        :movies="searchedMovies"
        @click="$emit('click', $event, year, searchTerm)"
    />
  </div>
</template>

<script>
import MSelect from "@/components/MSelect";
import MInput from "@/components/MInput";
import MovieDeck from "@/components/movies/MovieDeck";
import mdb from "@/api/api";

const optionsGenerator = () => {
  let array = []
  let actualYear = new Date()
  actualYear = actualYear.getFullYear()
  let lowLimit = actualYear - 40
  for (let i = actualYear; i >= lowLimit; i--) {
    array.push(i)
  }
  return array
}

export default {
  name: "SearchMovies",
  components: {MovieDeck, MInput, MSelect},
  props: {
    initYear: {
      type: String,
      default: ''
    },
    initSearchTerm: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      searchedMovies: [],
      searchTerm: this.initSearchTerm,
      isSearching: false,
      debounce: null,
      movieDetail: null,
      year: this.initYear,
      options: optionsGenerator(),
    }
  },
  watch: {
    searchTerm() {
      this.searchMovies()
    },
    year() {
      this.searchMovies()
    }
  },
  created() {
    this.searchMovies()
  },
  methods: {
    searchMovies() {
      clearInterval(this.debounce)
      if (this.searchTerm === '') {
        this.searchedMovies = []
        this.isSearching = false
      } else {
        const params = {query: this.searchTerm}
        if (this.year !== '') {
          params.year = this.year
        }
        this.isSearching = true
        this.debounce = setTimeout(() => {
          mdb.searchMovies(params)
              .then(movies => {
                this.searchedMovies = movies
                this.isSearching = false
              })
        }, 500)
      }
    }
  },
}
</script>

<style scoped>

</style>