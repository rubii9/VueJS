<template>
  <search-movies
      :init-year="year"
      :init-search-term="searchTerm"
      @click="movieClicked"
  />
</template>

<script>
import SearchMovies from "@/components/movies/SearchMovies"

export default {
  name: "SearchView",
  components: {SearchMovies},
  props: {
    year: {
      type: String,
      default: '',
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
  methods: {
    movieClicked(movie, year, searchTerm) {
      if (this.year === year && this.searchTerm === searchTerm) {
        this.goToMovie(movie)
      } else {
        this.$router.push({name: 'search', query: {year: year, search: searchTerm}})
            .then(() => {
              this.goToMovie(movie)
            })
      }
    },
    goToMovie(movie) {
      this.$router.push({name: 'movie', params: {id: movie.id}})
    }
  },
}
</script>

<style scoped>

</style>