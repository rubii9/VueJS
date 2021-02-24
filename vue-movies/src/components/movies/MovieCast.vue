<template>
  <div>
    <p
        v-for="member in cast"
        :key="member.id"
    >
      {{ member.name }} as <strong>{{ member.character }}</strong>
    </p>
  </div>
</template>

<script>
import mdb from "@/api/api";

export default {
  name: "MovieCast",
  props: {
    movie: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      cast: null
    }
  },
  watch: {
    $route() {
      this.getMovieDetails()
    },
  },
  created() {
    this.getMovieCast()
  },
  methods: {
    getMovieCast() {
      mdb.getCastAndCrew(this.movie.id)
        .then(({cast}) => {
          this.cast = cast
        })
    }
  },
}
</script>

<style scoped>

</style>