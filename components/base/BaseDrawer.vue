<template>
  <transition :name="transitionName">
    <div
      v-if="isOpen"
      class="fixed z-10 bg-white shadow-md p-4 z-10"
      :style="contentWrapperStyle"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseDrawer',

  props: {
    isOpen: {
      type: Boolean,
      default: false,
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
    contentWrapperStyle() {
      const contentWrapperStyles = {};
      if (this.top !== null) {
        contentWrapperStyles.top = this.top;
      }
      if (this.right !== null) {
        contentWrapperStyles.right = this.right;
      }
      if (this.bottom !== null) {
        contentWrapperStyles.bottom = this.bottom;
      }
      if (this.left !== null) {
        contentWrapperStyles.left = this.left;
      }
      return contentWrapperStyles;
    },

    transitionName() {
      let name = 'slide-y';
      if (this.right !== null || this.left !== null) {
        name = 'slide-x';
      }
      return name;
    },
  },
};
</script>
