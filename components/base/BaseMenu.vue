<template>
  <div class="relative" @click.stop="isOpen = !isOpen">
    <slot name="activator" />
    <transition name="fade">
      <div
        v-if="isOpen"
        :class="`${right ? 'left' : 'right'}-0 mt-${nudgeTop}`"
        class="absolute top-0 bg-white rounded border shadow-md p-4"
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
      default: 8,
    },
    closeOnContentClick: {
      type: Boolean,
      default: false,
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
