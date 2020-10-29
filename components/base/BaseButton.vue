<template>
  <button
    :class="{ 'w-full': block }"
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
  },
};
</script>
