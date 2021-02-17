<template>
  <div>
    <h1>Favoritas</h1>
    <loading-component :is-loading="isLoading">
      <movie-deck
          :movies="movies"
      />
    </loading-component>
  </div>
</template>

<script>
import mdb from "@/api/api"
import MovieDeck from "@/components/movies/MovieDeck";
import LoadingComponent from "@/components/LoadingComponent";

export default {
  name: "FavouriteView",
  components: {LoadingComponent, MovieDeck},
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      movies: [],
      isLoading: true,
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
    getFavouriteMovies() {
      this.isLoading = true
      console.log(this.user)
      if (this.user !== null) {
        mdb.getFavourites(this.user.id)
            .then(movies => {
              this.isLoading = false
              this.movies = movies
            })
      }
    }
  },
}
</script>

<style scoped>

</style>