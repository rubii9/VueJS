<template>
  <loading-component :is-loading="movie === null">
    <div>
      <img v-if="movie" class="mr-1 movie-image" :src="movie.poster_path | apiImage">
      <h1>{{ movie.title }}</h1>
      <movie-rating :rate="movie.vote_average"/>

      <p>
        {{ movie.overview }}
      </p>
      <br><br>
      <p>Recaudación: {{ movie.revenue | money }}</p>
    </div>
  </loading-component>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent";
import mdb from "@/api/api";
import MovieRating from "@/components/MovieRating";

export default {
  name: "MovieView",
  components: {MovieRating, LoadingComponent},
  filters: {
    money: function (value) {
      return `$ ${value.toFixed(2)}`
    }
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      movie: null,
    }
  },
  watch: {
    $route() {
      this.getMovieDetails()
    }
  },
  created() {
    this.getMovieDetails()
  },
  methods: {
    getMovieDetails() {
      mdb.getMovieDetails(this.id)
          .then(movie => {
            this.movie = movie
          })
    },
    getPath(path) {
      return mdb.getImagePath(path)
    }
  },
}
</script>

<style scoped>
.movie-image {
  float: left;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.description {
  padding: 1rem;
}
</style>