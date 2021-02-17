<template>
  <div>
    <span
        v-for="i in 10"
        :key="i"
    >
      <i v-if="Math.round(rate) < i" class="far fa-star"></i>
      <i v-else class="fas fa-star"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "MovieRating",
  props: {
    rate: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>