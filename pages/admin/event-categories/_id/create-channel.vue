<template>
  <form
    @submit.prevent="
      createEventCategoryChannel({
        eventCategoryId: +$route.params.id,
        channel: newChannel,
      })
    "
  >
    <BaseTextField
      v-model="newChannel.URL"
      :errors="channelValidationErrors.URL"
      label="Twitch or Youtube channel URL"
      placeholder="https://twitch.tv/gsl or https://youtube.com/channel/UCK5eBtuoj_HkdXKHNmBLAXg"
      @input="clearChannelValidationErrors('URL')"
    />
    <BaseButton type="submit"> Save </BaseButton>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CreateChannel',

  layout: 'admin',

  data() {
    return {
      newChannel: {},
    };
  },

  computed: {
    ...mapState('eventCategoryChannels', ['channelValidationErrors']),
  },

  created() {
    this.resetChannelValidationErrors();
  },

  methods: {
    ...mapActions('eventCategoryChannels', [
      'createEventCategoryChannel',
      'clearChannelValidationErrors',
      'resetChannelValidationErrors',
    ]),
  },
};
</script>

<style scoped></style>
