<template>
  <div class="px-3 pb-8">
    <EventCategoryForm
      :form-item="editedEventCategory"
      :errors="eventCategoryValidationErrors"
      :saving="loading['post:/event-categories']"
      @save="updateEventCategory"
      @clear:errors="clearEventCategoryValidationErrors"
    />
    <hr class="my-4" />
    <div class="my-4 flex justify-between">
      <h2>Channels</h2>
      <BaseButton
        :to="`/admin/event-categories/${eventCategoryId}/create-channel`"
        link
      >
        Add channel
      </BaseButton>
    </div>
    <BaseTable
      v-if="eventCategoryChannels.length"
      :headers="channelTableHeaders"
      :items="eventCategoryChannels"
    >
      <template #item.Title="{ item }">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <img
              class="h-10 w-10 rounded-full"
              :src="item.ProfileImageURL"
              alt=""
            />
          </div>
          <div class="ml-4">
            <div class="font-medium text-gray-900">
              {{ item.Title }}
            </div>
            <a :href="item.URL" class="link" target="_blank">
              {{ item.URL }}
            </a>
          </div>
        </div>
      </template>
      <template #item.IsCrawlingEnabled="{ item }">
        <BaseCheckbox
          :checked="item.IsCrawlingEnabled"
          @change="
            updateEventCategoryChannel({
              eventCategoryId,
              channel: { ID: item.ID, IsCrawlingEnabled: $event },
            })
          "
        />
      </template>
      <template #item.Actions="{ item }">
        <div class="flex">
          <a
            href="#"
            class="ml-2 text-red-600 hover:text-red-900"
            @click.prevent="
              deleteEventCategoryChannel({ eventCategoryId, channel: item })
            "
            >Delete</a
          >
        </div>
      </template>
    </BaseTable>
    <p v-else>
      This category has no channels assigned to it. Make sure to
      <nuxt-link
        :to="`/admin/event-categories/${eventCategoryId}/create-channel`"
        class="link"
        >add</nuxt-link
      >
      one otherwise the server won't crawl it's videos.
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { getChannelUrl } from '@/store/eventCategoryChannels';
import { VIDEO_PLATFORM_MAP } from '@/util/platforms';

export default {
  name: 'EventCategory',

  layout: 'admin',

  async fetch({ store, route }) {
    const requests = [];
    const eventCategoryId = +route.params.id;
    requests.push(
      store.dispatch('eventCategories/editEventCategory', eventCategoryId),
    );
    if (
      !store.state.eventCategoryChannels.eventCategoryChannelsMap[
        eventCategoryId
      ]
    ) {
      requests.push(
        store.dispatch(
          'eventCategoryChannels/fetchEventCategoryChannels',
          eventCategoryId,
        ),
      );
    }
    await Promise.all(requests);
  },

  computed: {
    ...mapState('eventCategories', [
      'editedEventCategory',
      'eventCategoryValidationErrors',
    ]),
    ...mapState('eventCategoryChannels', [
      'eventCategoryChannelsMap',
      'newChannel',
    ]),
    ...mapGetters('progress', ['loading']),

    eventCategoryId() {
      return +this.$route.params.id;
    },

    eventCategoryChannels() {
      return this.eventCategoryChannelsMap[this.eventCategoryId].map((c) => ({
        ...c,
        URL: getChannelUrl(c),
        Platform: VIDEO_PLATFORM_MAP[c.PlatformID],
      }));
    },

    channelTableHeaders() {
      return [
        {
          text: 'Channel',
          value: 'Title',
        },
        {
          text: 'Platform',
          value: 'Platform',
        },
        {
          text: 'Crawling enabled',
          value: 'IsCrawlingEnabled',
        },
        {
          text: 'Actions',
          value: 'Actions',
        },
      ];
    },
  },

  methods: {
    ...mapActions('eventCategories', [
      'updateEventCategory',
      'clearEventCategoryValidationErrors',
    ]),
    ...mapActions('eventCategoryChannels', [
      'createEventCategoryChannel',
      'updateEventCategoryChannel',
      'deleteEventCategoryChannel',
    ]),
  },
};
</script>

<style scoped></style>
