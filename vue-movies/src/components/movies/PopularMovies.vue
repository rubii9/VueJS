<template>
  <div id="popular">

    <p v-for="movie in displayedMovies" :key="movie.id">
      <span class="mr-1">{{ movie.title }}</span>
      <m-pill v-if="movie.deleted">Borrada</m-pill>
      <m-pill v-if="movie.favourite" color="blue">Favorita</m-pill>
      <m-button @click="$emit('favourite', movie.id)">
        <i class="far fa-star"></i>
      </m-button>
      <m-button @click="$emit('delete', movie.id)" type="danger">
        <i class="far fa-trash-alt"></i>
      </m-button>
    </p>

    <div>
      <br>
      <m-input
          id="add-movie"
          v-model.trim="newMovie"
          placeholder="Título de la película"
          @keyup.enter="addMovie"
      >
        <m-button @click="addMovie" title="Añadir película"/>
      </m-input>
      <br>
      <small v-if="showError" style="color: indianred">
        Debe introducir el título de la película para añadirla
      </small>
      <br>

      <m-checkbox
          id="show-deleted-1"
          label="Mostrar películas borradas"
          :value="showDeleted"
          @input="$emit('showdeleted', $event)"
      />
    </div>
  </div>
</template>

<script>
import MPill from "@/components/MPill";
import MButton from "@/components/MButton";
import MInput from "@/components/MInput";
import MCheckbox from "@/components/MCheckbox";
import MovieStoreMixin from "@/mixins/MovieStoreMixin";

export default {
  name: "PopularMovies",
  components: {MCheckbox, MInput, MButton, MPill},
  mixins: [MovieStoreMixin],
  data() {
    return {
      newMovie: '',
      showError: false,
      // movies: [],
    }
  },
  created() {
    console.log('PopularMovies componente created')
  },
  // created() {
  //   mdb.getPopular()
  //       .then(popularMovies => {
  //         setTimeout(() => {
  //           this.movies = popularMovies
  //         }, 5000)
  //       })
  // },
  methods: {
    addMovie() {
      this.showError = false
      if (this.newMovie !== '') {
        this.$emit('add', this.newMovie)
        this.newMovie = ''
      } else {
        this.showError = true
      }
    },
  },
}
</script>

<style scoped>

</style>