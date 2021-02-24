<template>
  <div>
    <h1>Favoritas</h1>
    <loading-component :is-loading="isLoading">
      <template v-slot:default>
        <movie-deck
            :movies="movies"
            @click="$router.push({name: 'movie', params: {id: $event.id}})"
        />
      </template>
    </loading-component>
  </div>
</template>

<script>
import MovieDeck from "@/components/movies/MovieDeck";
import LoadingComponent from "@/components/LoadingComponent";
import {mapActions, mapState} from "vuex";

export default {
  name: "FavouriteView",
  components: {LoadingComponent, MovieDeck},
  computed: {
    ...mapState('user', ['user']),
    ...mapState('movie', ['favouriteMovies', 'isLoading']),
    movies() {
      return this.favouriteMovies
    }
  },
  watch: {
    user() {
      this.getFavouriteMovies()
    }
  },
  created() {
    this.getFavouriteMovies()
  },
  methods: {
    ...mapActions('movie', ['getFavouriteMovies']),
  },
}
</script>

<style scoped>

</style>