<template>
  <button
    :class="{ 'active:text-primary-900': !noActiveColor }"
    class="hover:text-primary-700"
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

    noActiveColor: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
