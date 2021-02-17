<template>
  <div id="favourite">
    <h2>Favoritas</h2>
    <p v-for="movie in favouriteMovies" :key="'favorite-' + movie.id">
      {{ movie.title }}
    </p>
  </div>
</template>

<script>
import MovieStoreMixin from "@/mixins/MovieStoreMixin";

export default {
  name: "FavouriteMovies",
  mixins: [MovieStoreMixin],
  computed: {
    favouriteMovies() {
      return this.displayedMovies.filter(movie => movie.favourite)
    },
  },
}
</script>

<style scoped>

</style>