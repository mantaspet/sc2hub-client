<template>
  <div
    :class="{ relative: positionX < 0 && positionY < 0 }"
    @click.stop="isOpenInternal = !isOpenInternal"
  >
    <div :class="{ 'text-primary-700': isOpenInternal }" class="h-full">
      <slot name="activator" :is-open="isOpenInternal" />
    </div>
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        :class="[{ 'right-0': left }, { 'left-0': right }, `p-${padding}`]"
        :style="menuStyles"
        class="absolute bg-white rounded border shadow-md z-30"
        @click="onContentClick"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseMenu',

  props: {
    right: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    nudgeTop: {
      type: Number,
      default: 24,
    },
    closeOnContentClick: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: [Number, String],
      default: 0,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    positionX: {
      type: Number,
      default: -1,
    },
    positionY: {
      type: Number,
      default: -1,
    },
  },

  data() {
    return {
      isOpenInternal: false, // when using activator slot instead of the prop
    };
  },

  computed: {
    isMenuOpen() {
      return this.isOpen || this.isOpenInternal;
    },

    menuStyles() {
      let styles = '';
      let top = 0;
      if (this.nudgeTop) {
        top += this.nudgeTop;
      }
      if (this.positionY >= 0) {
        top += this.positionY;
      }

      if (this.nudgeTop || this.positionY >= 0) {
        styles += `top: ${top}px;`;
      }

      if (this.positionX >= 0) {
        styles += `left: ${this.positionX}px;`;
      }
      return styles;
    },
  },

  watch: {
    isMenuOpen(newValue) {
      if (newValue) {
        window.addEventListener('click', this.onWindowClick);
      } else {
        window.removeEventListener('click', this.onWindowClick);
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener('click', this.onWindowClick);
  },

  methods: {
    onWindowClick() {
      // When clicking on content or on activator - propagation is stopped
      this.isOpenInternal = false;
      this.$emit('close');
    },

    onContentClick(event) {
      if (!this.closeOnContentClick) {
        event.stopPropagation();
      }
    },
  },
};
</script>

<style scoped></style>
