<template>
  <div class="col-span-3 sm:col-span-2 mb-4">
    <label class="block">
      {{ label }}
      <input
        v-if="!textarea"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="w-full rounded border p-2 border-gray-300"
        @input="$emit('input', $event.target.value)"
      />
      <textarea
        v-else
        :value="value"
        :rows="rows"
        :placeholder="placeholder"
        class="w-full rounded border p-2 border-gray-300"
        @input="$emit('input', $event.target.value)"
      />
    </label>
    <div class="text-sm text-negative-500">
      {{ errors }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTextField',

  props: {
    value: {
      type: String,
      default: '',
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

    errors: {
      type: String,
      default: '',
    },

    textarea: {
      type: Boolean,
      default: false,
    },

    rows: {
      type: Number,
      default: 4,
    },
  },
};
</script>

<style scoped></style>
