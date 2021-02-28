<template>
  <label
    :class="`bg-${checked ? 'primary-500' : 'neutral-300'}`"
    class="flex items-center rounded-full w-12 h-6 transition-all duration-150 cursor-pointer"
  >
    <input
      :checked="checked"
      class="hidden"
      type="checkbox"
      @change="$emit('change', $event.target.checked)"
    />
    <div
      :class="[
        { 'translate-x-6': checked },
        `border-${checked ? 'primary-500' : 'neutral-300'}`,
      ]"
      class="rounded-full h-6 w-6 bg-white border-2 transition-all duration-150 transform"
    />
  </label>
</template>

<script>
export default {
  name: 'BaseSwitch',

  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped></style>
