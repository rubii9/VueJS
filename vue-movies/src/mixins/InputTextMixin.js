export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
    },
  },
  methods: {
    changedValue(event) {
      this.$emit('input', event.target.value)
    }
  },
}