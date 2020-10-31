<template>
  <div>
    <h2 class="mb-4">Settings</h2>
    <div class="flex justify-between items-center">
      <div>Enable spoilers?</div>
      <BaseSwitch v-model="enableSpoilers" />
    </div>
  </div>
</template>

<script>
import BaseSwitch from '@/components/base/BaseSwitch';

export default {
  name: 'Settings',

  components: { BaseSwitch },

  data() {
    return {
      enableSpoilers: true,
    };
  },
};
</script>

<style scoped></style>
