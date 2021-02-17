<template>
  <span class="pill" :class="color">
    <slot>{{ title }}</slot>
  </span>
</template>

<script>
export default {
  name: "MPill",
  props: {
    title: {
      type: String,
    },
    color: {
      type: String,
      default: 'grey',
      validator: function (value) {
        return ['grey', 'blue', 'red'].indexOf(value) !== -1
      },
    }
  },
}
</script>

<style scoped>
.pill {
  font-size: 0.7rem;
  border: none;
  padding: 0.3rem 0.5rem;
  margin: 0.3rem 0.25rem;
  border-radius: 16px;
}
</style>