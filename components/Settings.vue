<template>
  <div>
    <h2 class="mb-4">Settings</h2>
    <div class="flex justify-between items-center">
      <div>Enable spoilers?</div>
      <BaseSwitch :checked="enableSpoilers" @change="onSpoilersToggle" />
    </div>
    <p class="mt-2 text-sm text-neutral-500">
      When spoilers are disabled video thumbnails, player names and matchups are
      hidden in video, livestream and news titles.
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BaseSwitch from '@/components/base/BaseSwitch';
import { hideMessage } from '@/util/popup-messages';

export default {
  name: 'Settings',

  components: { BaseSwitch },

  computed: {
    ...mapState('settings', ['enableSpoilers']),
  },

  methods: {
    ...mapActions('players', ['loadPlayerIds']),
    ...mapActions('settings', ['toggleSpoilers']),

    onSpoilersToggle(value) {
      hideMessage('spoilers-are-enabled-by-default');
      this.toggleSpoilers(value);
    },
  },
};
</script>

<style scoped></style>
