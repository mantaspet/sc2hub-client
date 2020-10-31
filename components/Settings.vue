<template>
  <div>
    <h2 class="mb-4">Settings</h2>
    <div class="flex justify-between items-center">
      <div>Enable spoilers?</div>
      <BaseSwitch :checked="enableSpoilers" @change="toggleSpoilers" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BaseSwitch from '@/components/base/BaseSwitch';

export default {
  name: 'Settings',

  components: { BaseSwitch },

  computed: {
    ...mapState('settings', ['enableSpoilers']),
  },

  methods: {
    ...mapActions('players', ['loadPlayerIds']),
    ...mapActions('settings', ['toggleSpoilers']),
  },
};
</script>

<style scoped></style>
