<template>
  <transition name="fade">
    <div
      v-if="isDisplayed"
      :class="classes"
      class="fixed z-10 top-0 left-0 h-full w-full bg-opacity-50 bg-black"
      @click="$emit('click')"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseOverlay',

  props: {
    isDisplayed: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: [String, Array, Object],
      default: '',
    },
  },
};
</script>
