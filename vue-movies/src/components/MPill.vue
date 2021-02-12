<template>
  <span class="pill" :class="color">
    <slot>{{ title }}</slot>
  </span>
</template>

<script>
export default {
  name: "MPill",
  data() {
    return {
      title: {
        type: String,
      },
      color: {
        type: String,
        default: "#ddd",
      },
    };
  },
};
</script>

<style scoped>
.pill {
  font-size: 0.7rem;
  background-color: #ddd;
  border: none;
  color: black;
  padding: 0.3rem 0.5rem;
  margin: 0.3rem 0.25rem;
  border-radius: 16px;
}
</style>
