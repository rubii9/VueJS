<template>
  <div class="loading">
    <div v-if="isLoading">
      <i class="fas fa-circle-notch fa-spin"></i>
      Cargando...
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent",
  props: {
    isLoading: {
      type: Boolean,
      required: true
    },
  },
}
</script>

<style scoped>

</style>