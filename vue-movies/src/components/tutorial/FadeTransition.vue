<template>
  <transition name="fade-1" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "FadeTransition",
  props: {
    show: {
      type: Boolean,
    },
  },
}
</script>

<style scoped>
.fade-1-enter, .fade-1-leave-to {
  opacity: 0;
}

.fade-1-enter-active,
.fade-1-leave-active {
  transition: opacity 0.3s;
}
</style>