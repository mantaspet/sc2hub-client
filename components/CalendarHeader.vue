<template>
  <h1 class="flex justify-center items-center mb-5">
    <BaseIconButton icon="chevron-left" @click="$emit('previousMonth')" />
    <div class="w-40 text-center">
      {{ title }}
    </div>
    <BaseIconButton icon="chevron-right" @click="$emit('nextMonth')" />
  </h1>
</template>

<script>
import BaseIconButton from './base/BaseIconButton';

export default {
  name: 'CalendarHeader',

  components: { BaseIconButton },

  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
