<template>
  <loading-component :is-loading="isLoading">
    <template v-slot:default>
      <h1>{{ movie.title }}</h1>

      <div class="tab">
        <router-link
            class="nav-link"
            :class="{active: $route.name === 'movie'}"
            :to="{name: 'movie', params: $route.params}"
        >
          Detalles
        </router-link>
        <router-link
            class="nav-link"
            :class="{active: $route.name === 'cast'}"
            :to="{name: 'cast', params: $route.params}"
        >
          Actores
        </router-link>
      </div>

      <router-view
          class="content"
          :movie="movie"
          :user="user"
          :is-authenticated="isAuthenticated"
      />
    </template>
  </loading-component>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "MovieView",
  components: {LoadingComponent},
  props: {
    id: {
      type: [String, Number],
    },
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('movie', ['selectedMovie']),
    ...mapGetters('user', ['isAuthenticated']),
    movie() {
      return this.selectedMovie
    },
    isLoading() {
      return this.selectedMovie === null
    },
  },
  watch: {
    id() {
      this.getMovieDetails(this.id)
    },
    user() {
      this.getMovieDetails(this.id)
    },
  },
  created() {
    this.getMovieDetails(this.id)
  },
  methods: {
    ...mapActions('movie', ['getMovieDetails']),
  },
}
</script>

<style scoped>
.tab {
  overflow: hidden;
  background-color: #555;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.tab .nav-link {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  color: white;
  text-decoration: none;
}

.tab .nav-link:hover {
  background-color: #000;
}

.tab .nav-link.active {
  background-color: #4CAF50;
  transition: background-color 0.3s;
}

.content {
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
}
</style>