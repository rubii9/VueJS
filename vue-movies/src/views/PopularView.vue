<template>
  <div>
    <loading-component :is-loading="popularMovies.length === 0">
      <template v-slot:default>
        <movie-deck
            :movies="popularMovies"
            @click="$router.push({name: 'movie', params: {id: $event.id}})"
        />
      </template>
    </loading-component>
  </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent";
import MovieDeck from "@/components/movies/MovieDeck";
import {mapActions, mapState} from 'vuex'

export default {
  name: "PopularView",
  components: {MovieDeck, LoadingComponent},
  computed: {
    ...mapState('movie', ['popularMovies', 'isLoading']),
  },
  created() {
    this.getPopular()
  },
  methods: {
    ...mapActions('movie', ['getPopular']),
  },
}
</script>

<style scoped>

</style>