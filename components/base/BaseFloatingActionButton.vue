<template>
  <button
    :style="buttonStyle"
    class="fixed z-10 p-4 rounded-full bg-white shadow-md"
    @click="$emit('click', $event)"
  >
    <BaseIcon :icon="icon" classes="h-8" />
  </button>
</template>

<script>
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'BaseFloatingActionButton',

  components: { BaseIcon },

  props: {
    icon: {
      type: String,
      required: true,
    },
    top: {
      type: [Number, String],
      default: null,
    },
    right: {
      type: [Number, String],
      default: null,
    },
    bottom: {
      type: [Number, String],
      default: null,
    },
    left: {
      type: [Number, String],
      default: null,
    },
  },

  computed: {
    buttonStyle() {
      const buttonStyles = {};
      if (this.top >= 0 || this.top.length) {
        buttonStyles.top = this.top;
      }
      if (this.right >= 0 || this.right.length) {
        buttonStyles.right = this.right;
      }
      if (this.bottom >= 0 || this.bottom.length) {
        buttonStyles.bottom = this.bottom;
      }
      if (this.left >= 0 || this.left.length) {
        buttonStyles.left = this.left;
      }
      return buttonStyles;
    },
  },
};
</script>

<style scoped></style>
