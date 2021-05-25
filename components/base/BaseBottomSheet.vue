<template>
  <div>
    <BaseOverlay :is-displayed="isOpen" classes="md:hidden" @click="close" />
    <transition name="slide-y">
      <div
        v-if="isOpen"
        class="
          w-full
          fixed
          bottom-0
          flex
          justify-center
          z-20
          pointer-events-none
        "
      >
        <div
          class="
            bg-white
            shadow-md
            rounded
            border
            overflow-x-hidden
            pointer-events-auto
          "
          @click.stop
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseBottomSheet',

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isOpen(newValue) {
      if (newValue) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener('click', this.close);
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped></style>
