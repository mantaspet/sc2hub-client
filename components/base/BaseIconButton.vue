<template>
  <button
    class="hover:text-primary-700 active:text-primary-900"
    @click="$emit('click', $event)"
  >
    <BaseIcon :icon="icon" :classes="classes" />
  </button>
</template>

<script>
import BaseIcon from './BaseIcon';

export default {
  name: 'BaseIconButton',

  components: { BaseIcon },

  props: {
    icon: {
      type: String,
      default: '',
    },

    classes: {
      type: String,
      default: 'h-6',
    },
  },
};
</script>
