<template>
  <div>
    <img class="mr-1 movie-image" :src="movie.poster_path | apiImage">

    <movie-rating :rate="movie.vote_average"/>
    <p>
      {{ movie.overview }}
    </p>
    <m-pill v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</m-pill>
    <br><br>
    <p>Recaudación: {{ movie.revenue | money }}</p>

    <div v-if="isAuthenticated && isFavourite !== null">
      <m-button
          v-if="!isFavourite"
          @click="markFavourite"
      >
        Añadir a favoritas
      </m-button>
      <m-button
          v-else
          type="danger"
          @click="unmarkFavourite"
      >
        Borrar de favoritas
      </m-button>
    </div>
  </div>
</template>

<script>
import MButton from "@/components/MButton";
import MovieRating from "@/components/MovieRating";
import {mapActions, mapGetters, mapState} from "vuex";
import MPill from "@/components/MPill";

export default {
  name: "MovieDetail",
  components: {MPill, MovieRating, MButton},
  filters: {
    money: function (value) {
      return `$ ${value.toFixed(2)}`
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('movie', ['selectedMovie']),
    ...mapGetters('user', ['isAuthenticated']),
    isFavourite() {
      if (!this.isAuthenticated) {
        return null
      }
      return this.movie.userData.favorite
    },
    movie() {
      return this.selectedMovie
    },
  },
  methods: {
    ...mapActions('movie', ['markFavourite', 'unmarkFavourite']),
  },
}
</script>

<style scoped>
.movie-image {
  float: left;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin-bottom: 2rem;
}
.description {
  padding: 1rem;
}
</style>