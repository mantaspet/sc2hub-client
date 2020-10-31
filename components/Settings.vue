<template>
  <div>
    <h2 class="mb-4">Settings</h2>
    <div class="flex justify-between items-center">
      <div>Enable spoilers?</div>
      <BaseSwitch :checked="enableSpoilers" @change="onSpoilersToggle" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import BaseSwitch from '@/components/base/BaseSwitch';

export default {
  name: 'Settings',

  components: { BaseSwitch },

  computed: {
    ...mapState('settings', ['enableSpoilers']),
  },

  methods: {
    ...mapMutations('settings', ['SET_SETTING']),
    ...mapActions('players', ['loadPlayerIds']),

    onSpoilersToggle(value) {
      this.SET_SETTING({ key: 'enableSpoilers', value });
      if (!value) {
        this.loadPlayerIds();
      }
    },
  },
};
</script>

<style scoped></style>
