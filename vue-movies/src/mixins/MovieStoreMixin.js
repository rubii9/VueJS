import InnerMixin from "@/mixins/InnerMixin";

export default {
  mixins: [InnerMixin],
  props: {
    movies: {
      type: Array,
      required: true,
    },
    showDeleted: {
      type: Boolean,
      required: true,
    }
  },
  created() {
    console.log('MovieStoreMixin componente created')
  },
  computed: {
    displayedMovies() {
      if (this.showDeleted) {
        return this.movies
      }
      return this.movies.filter(movie => !movie.deleted)
    },
  }
}