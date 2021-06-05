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
            SC2Hub currently does not collect videos for this event.
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="eventVideos.length"
      class="
        px-4
        mt-1
        bg-white
        overflow-y-auto
        video-grid
        max-2-cols max-h-half-screen
      "
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
  </div>
</template>

<script>
import { formatDistanceToNow, isValid } from 'date-fns';
import { mapActions, mapGetters, mapState } from 'vuex';
import { processVideos } from '@/store/videos';

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
      intervalId: null,
    };
  },

  computed: {
    ...mapState('settings', ['enableSpoilers']),
    ...mapState('events', ['eventVideosMap']),
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

    eventCategory() {
      return this.event.eventCategoryId
        ? this.eventCategoriesMap[this.event.eventCategoryId]
        : null;
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
      if (now > eventDate) {
        string += ' ago';
      }
      this.eventTimeString = string;
    },
  },
};
</script>

<style scoped></style>
