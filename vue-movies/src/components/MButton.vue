<template>
  <button
      class="btn"
      :class="type"
      @click="$emit('click', $event)"
  >
    <slot>{{ title }}</slot>
  </button>
</template>

<script>
export default {
  name: "MButton",
  props: {
    type: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'danger'].indexOf(value) !== -1
      }
    },
    title: {
      type: String
    },
  }
}
</script>

<style scoped>
.btn {
  border: none;
  color: white;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 0.5rem;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.default {
  background-color: #2196F3;
}
.default:hover {
  background-color: #0b7dda;
}
.danger {
  background-color: #e13d31;
}
.danger:hover {
  background-color: #da190b;
}

</style>