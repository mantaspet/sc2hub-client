<template>
  <button
    :class="{ 'w-full': block, 'cursor-wait': loading }"
    :disabled="disabled"
    class="py-1 px-2 border-2 border-primary-700 text-primary-700 hover:bg-neutral-200 active:bg-neutral-300 rounded"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    block: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>
