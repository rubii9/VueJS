<template>
  <div>
    <label v-if="label" :for="id" class="mr-1">{{ label }}: </label>
    <input
        :id="id"
        type="text"
        class="mr-1"
        :value="value"
        :placeholder="placeholder"
        @input="changedValue"
        @keyup="$emit('keyup', $event)"
    >
    <slot></slot>
  </div>
</template>

<script>
import InputTextMixin from "@/mixins/InputTextMixin";

export default {
  name: "MInput",
  mixins: [InputTextMixin],
  props: {
    placeholder: {
      type: String,
    }
  },
}
</script>

<style scoped>
input[type=text] {
  width: 20rem;
  padding: 0.5rem 0.5rem;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0.3rem;
}
</style>