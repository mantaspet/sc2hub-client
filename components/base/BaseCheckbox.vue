<template>
  <div class="flex items-start mb-4">
    <label :class="{ 'cursor-wait': loading }" class="font-medium">
      <input
        :checked="checked"
        :disabled="disabled"
        type="checkbox"
        class="
          focus:ring-indigo-500
          h-4
          w-4
          text-primary-700
          border-neutral-500
          rounded
          mr-2
        "
        @change="$emit('change', $event.target.checked)"
      />
      {{ label }}
    </label>
    <div class="ml-3 text-sm">
      <p v-if="hint" class="text-neutral-400">
        {{ hint }}
      </p>
    </div>
    <div v-if="errors" class="text-sm text-negative-500">
      {{ errors }}
    </div>
  </div>
</template>

<script>
// TODO fix checkbox marking itself after clicking it even though checked prop value remains the same
// e.g. when sending an API request that fails
export default {
  name: 'BaseCheckbox',

  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    errors: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped></style>
