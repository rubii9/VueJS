<template>
  <div>
    <label :for="id" class="mr-1">{{ label }} </label>
    <input
      :id="id"
      type="text"
      class="mr-1"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @keyup="$emit('keyup', $event)"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MInput",
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  methods: {
    name($event) {
      this.$emit("keyup", $event);
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  width: 20rem;
  padding: 0.5rem 0.5rem;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0.3rem;
}
</style>
