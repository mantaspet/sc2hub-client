<template>
  <div class="relative" @click.stop="isOpen = !isOpen">
    <div :class="{ 'text-primary-700': isOpen }" class="h-full">
      <slot name="activator" :is-open="isOpen" />
    </div>
    <transition name="fade">
      <div
        v-if="isOpen"
        :class="`${right ? 'left' : 'right'}-0 p-${padding}`"
        class="absolute bg-white rounded border shadow-md z-30"
        :style="`top: ${nudgeTop}px`"
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
    nudgeTop: {
      type: [Number, String],
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
  },

  data() {
    return {
      isOpen: false,
    };
  },

  mounted() {
    window.addEventListener('click', this.onWindowClick);
  },

  beforeDestroy() {
    window.removeEventListener('click', this.onWindowClick);
  },

  methods: {
    onWindowClick() {
      // When clicking on content or on activator - propagation is stopped
      this.isOpen = false;
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
