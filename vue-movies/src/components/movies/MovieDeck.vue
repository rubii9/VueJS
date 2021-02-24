<template>
  <div class="cards">
    <movie-card
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @click="$emit('click', movie)"
    />
  </div>
</template>

<script>
import MovieCard from "@/components/movies/MovieCard";

export default {
  name: "MovieDeck",
  components: {MovieCard},
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>