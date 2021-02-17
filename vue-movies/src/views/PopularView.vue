<template>
  <div>
    <loading-component :is-loading="isLoading">
      <movie-deck
          :movies="movies"
      />
    </loading-component>
  </div>
</template>

<script>
import mdb from "@/api/api"
import LoadingComponent from "@/components/LoadingComponent";
import MovieDeck from "@/components/movies/MovieDeck";

export default {
  name: "PopularView",
  components: {MovieDeck, LoadingComponent},
  data() {
    return {
      movies: [],
      isLoading: true,
    }
  },
  created() {
    this.getPopular()
  },
  methods: {
    getPopular() {
      this.isLoading = true
      mdb.getPopular()
          .then(movies => {
            this.movies = movies
            this.isLoading = false
          })
    }
  },
}
</script>

<style scoped>

</style>