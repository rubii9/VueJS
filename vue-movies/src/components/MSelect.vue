<template>
  <div class="mr-1">
    <label v-if="label !== ''" :for="id" class="mr-1">{{ label }}</label>
    <select :name="id" :id="id" @input="$emit('input', $event.target.value)">
      <option v-if="optional"></option>
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "MSelect",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    optional: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
select {
  padding: 0.5rem 0.5rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0.3rem;
  cursor: pointer;
}
</style>
