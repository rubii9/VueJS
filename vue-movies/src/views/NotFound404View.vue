<template>
  <div>
    <h1>404 Página no encontrada</h1>
    <router-link :to="{name: 'popular'}">
      <m-button>Ir a la página principal</m-button>
    </router-link>
  </div>
</template>

<script>
import MButton from "@/components/MButton";

export default {
  name: "NotFound404View",
  components: {MButton}
}
</script>

<style scoped>

</style>