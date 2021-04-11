<template>
  <svg
    viewBox="0 0 24 24"
    :class="classes"
    class="icon"
    @click="$emit('click', $event)"
    v-html="getInnerIconElements(icon)"
  />
</template>

<script>
/* eslint-disable vue/no-v-html */
import icons from '../../assets/icons.js';

export default {
  name: 'BaseIcon',

  props: {
    icon: {
      type: String,
      required: true,
    },
    classes: {
      type: [String, Array, Object],
      default: '',
    },
  },
  methods: {
    getInnerIconElements(icon) {
      return icons[icon];
    },
  },
};
</script>

<style>
svg .primary {
  opacity: 0.5;
  fill: currentColor;
}

svg .secondary {
  fill: currentColor;
}
</style>
