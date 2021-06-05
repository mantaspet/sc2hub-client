<template>
  <div class="event-details-sheet">
    <div class="px-4 pt-4 pb-6 bg-white">
      <div class="flex items-center">
        <img
          v-if="eventCategory && eventCategory.ImageURL"
          :src="eventCategory.ImageURL"
          class="w-24 pr-4"
          alt=""
        />
        <div class="w-full">
          <h3 class="uppercase text-lg font-medium">
            {{ event.title }}
          </h3>
          <p class="text-sm">{{ event.stage }}</p>
          <p class="text-sm">{{ eventTimeString }}</p>
          <p v-if="!event.eventCategoryId" class="mt-4">
            SC2Hub does not currently track this event.
          </p>
        </div>
      </div>
    </div>
    <div class="overflow-y-auto max-h-half-screen">
      <div
        v-if="eventVideos.length && hasAlreadyHappened"
        class="px-4 pb-4 mt-1 video-grid max-2-cols"
      >
        <MediaCard
          v-for="video in eventVideos"
          :key="video.ID"
          :url="video.VideoURL"
          :image-url="video.ThumbnailURL"
          :fallback-image-url="
            video.PlatformID === 1
              ? '/twitch-placeholder.jpg'
              : '/youtube-placeholder.png'
          "
          :title="video.Title"
          :top-left="enableSpoilers ? video.Duration : ''"
          :bottom-left="video.ViewCount"
          :bottom-right="video.CreatedAtHumanized"
          disable-hover-effect
          @click="storeLastOpenedVideo({ event, video })"
        />
      </div>
      <div v-if="eventChannels.length" class="px-4 pb-4">
        <p class="pb-1">
          {{ channelsHeader }}
        </p>
        <div
          v-for="channel in eventChannels"
          :key="channel.id"
          class="flex items-center"
        >
          <img :src="channel.ProfileImageURL" class="my-2 h-10 rounded-full" />
          <div class="pl-4 py-2 flex flex-col justify-center h-full">
            <div>
              {{ channel.Title }}
            </div>
            <a :href="channel.URL" class="link" target="_blank">
              {{ channel.URL }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNow, isValid } from 'date-fns';
import { mapActions, mapGetters, mapState } from 'vuex';
import { processVideos } from '@/store/videos';
import { getChannelUrl } from '@/store/eventCategoryChannels';

export default {
  name: 'EventDetails',

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      eventTimeString: '',
      hasAlreadyHappened: false,
      intervalId: null,
    };
  },

  computed: {
    ...mapState('settings', ['enableSpoilers']),
    ...mapState('events', ['eventVideosMap']),
    ...mapState('eventCategoryChannels', ['eventCategoryChannelsMap']),
    ...mapGetters('players', ['playerIdRegexes']),
    ...mapGetters('matchups', ['matchupRegexes']),
    ...mapGetters('races', ['raceRegexes']),
    ...mapGetters('eventCategories', ['eventCategoriesMap']),

    eventVideos() {
      if (!this.eventVideosMap[this.event.id]?.length) {
        return [];
      }

      return processVideos(
        this.eventVideosMap[this.event.id],
        this.enableSpoilers,
        this.playerIdRegexes,
        this.matchupRegexes,
        this.raceRegexes,
      );
    },

    eventChannels() {
      if (!this.event.eventCategoryId) {
        return [];
      }
      return this.eventCategoryChannelsMap[this.event.eventCategoryId].map(
        (c) => ({
          ...c,
          URL: getChannelUrl(c),
        }),
      );
    },

    eventCategory() {
      return this.event.eventCategoryId
        ? this.eventCategoriesMap[this.event.eventCategoryId]
        : null;
    },

    channelsHeader() {
      const suffix = this.eventChannels.length > 1 ? 'on these channels' : 'on';

      if (!this.hasAlreadyHappened) {
        return `Watch it live ${suffix}:`;
      }

      if (this.eventVideos.length > 0 && this.eventChannels.length > 0) {
        return `You may find more videos of this event ${suffix}:`;
      }

      return `You may find videos of this event ${suffix}:`;
    },
  },

  created() {
    this.setEventTimeString();
    this.intervalId = setInterval(this.setEventTimeString, 1000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  methods: {
    ...mapActions('events', ['fetchEventBroadcasts']),
    ...mapActions('events', ['storeLastOpenedVideo']),

    setEventTimeString() {
      let string = '';
      const eventDate = new Date(`${this.event.date} ${this.event.time}`);
      if (!isValid(eventDate)) {
        this.eventTimeString = '';
        return;
      }
      const now = new Date();
      string += new Date() > eventDate ? 'Happened ' : 'Starts in ';
      string += formatDistanceToNow(eventDate);
      this.hasAlreadyHappened = now > eventDate;
      if (now > eventDate) {
        string += ' ago';
      }
      this.eventTimeString = string;
    },
  },
};
</script>

<style scoped></style>
