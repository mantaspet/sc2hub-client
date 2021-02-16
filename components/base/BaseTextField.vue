<template>
  <div class="col-span-3 sm:col-span-2">
    <label class="block">
      {{ label }}
      <input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="w-full rounded border p-2 border-gray-300"
        @input="$emit('input', $event.target.value)"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseTextField',

  props: {
    value: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped></style>
