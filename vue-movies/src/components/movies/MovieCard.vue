<template>
  <div class="card" @click="clicked">
    <img :src="movie.poster_path | apiImage" class="image-card">
    <div class="card-content">
      <p>{{ movie.title }}</p>
      <small>{{ movie.release_date }}</small>
      <br>
      <small>{{ movie.vote_average }}</small>
      <br>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clicked(event) {
      this.$emit('click', event)
    }
  },
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 0.3rem;
  margin: 1rem;
  flex: 0 1;
  min-width: 12rem;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 16px 24px 0 rgba(0,0,0,0.2);
}

.card-content {
  padding: 1rem;
  text-align: left;
}

.card-content p {
  margin-bottom: 0.3rem;
  margin-top: 0;
}

.card-content small {
  color: darkgrey;
}

.image-card {
  border-radius: 5px 5px 0 0;
  height: auto;
  max-width: 100%;
  object-fit: cover;
}
</style>