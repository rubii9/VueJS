<template>
  <button class="btn" :class="type" @click="$emit('click', $event)">
    <slot>{{ title }}</slot>
  </button>
</template>

<script>
export default {
  name: "MButton",
  props: {
    type: {
      type: String,
      default: "default",
      validator: function(value) {
        return ["default", "danger"].indexOf(value) !== -1;
      },
    },
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.btn {
  border: none;
  color: white;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 0.2rem;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.default {
  background-color: #409dd3;
}
.default:hover {
  background-color: #0b7dda;
}
.danger {
  background-color: #ce3c3c;
}
.danger:hover {
  background-color: #d63a2f;
}

.trans {
  background: transparent;
  font-size: 1.25rem;
}
</style>
