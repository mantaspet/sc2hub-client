<template>
  <section class="content-wrapper flex flex-col items-center justify-center">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <MediaCard
        v-for="channel in liveChannels"
        :key="channel.userName"
        :url="`https://twitch.tv/${channel.userName}`"
        :title="channel.title"
        :image-url="channel.thumbnailUrl"
        :bottom-left="channel.viewerCount"
        :bottom-right="channel.userName"
      />
    </div>

    <div v-if="liveChannelsPaginationCursor" class="pagination-wrapper">
      <BaseButton
        v-if="liveChannelsPaginationCursor"
        block
        @click="fetchNextLiveChannelsPage"
      >
        Load more
      </BaseButton>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MediaCard from '@/components/MediaCard';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'LiveChannels',

  components: { BaseButton, MediaCard },

  async fetch({ store, error }) {
    if (store.state.channels.liveChannels) {
      return;
    }
    try {
      await store.dispatch('channels/fetchLiveChannels');
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Unable to fetch live channels at this time. Please try again later.',
      });
    }
  },

  computed: {
    ...mapState('channels', ['liveChannels', 'liveChannelsPaginationCursor']),
  },

  methods: {
    ...mapActions('channels', ['fetchNextLiveChannelsPage']),
  },
};
</script>
