<template>
  <transition-group appear class="cards" tag="div" name="deck-cards">
    <movie-card
        v-for="(movie, index) in displayedMovies"
        :key="movie.id"
        :movie="movie"
        :index="index"
        @click="$emit('click', movie)"
    />
  </transition-group>
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
  data() {
    return {
      innerMovies: []
    }
  },
  computed: {
    displayedMovies() {
      return this.movies
    }
  },
  watch: {
    // movies(newValue) {
    //   this.transitionMovies(newValue)
    // }
  },
  created() {
    // this.transitionMovies(this.movies)
  },
  methods: {
    // transitionMovies(newValue) {
    //   this.innerMovies = []
    //   setTimeout(() => {
    //     this.innerMovies = newValue.splice(3, 100)
    //   }, 100)
    // }
  },
}
</script>

<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.deck-cards-enter, .deck-cards-leave-to {
  opacity: 0;
}

.deck-cards-enter-active {
  transition: opacity 1s;
}

</style>