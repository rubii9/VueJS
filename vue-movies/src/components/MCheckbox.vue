<template>
  <div>
    <label v-if="label" :for="id">{{ label }}:</label>
    <input
        :id="id"
        type="checkbox"
        :checked="value"
        @input="$emit('input', $event.target.checked)"
    >
  </div>
</template>

<script>
export default {
  name: "MCheckbox",
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
    }
  },
}
</script>

<style scoped>

</style>