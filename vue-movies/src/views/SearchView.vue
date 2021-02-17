<template>
  <search-movies
      :init-year="year"
      :init-search-term="searchTerm"
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
    }
  },
}
</script>

<style scoped>

</style>