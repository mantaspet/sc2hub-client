<template>
  <div>
    <p>{{ event.stage }}</p>
    <p class="text-sm">{{ eventTimeString }}</p>
    <div v-if="eventVideos.length" class="pt-4">
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
        @click="storeLastOpenedVideo(video)"
      />
    </div>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
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
    ...mapGetters('players', ['playerIdRegexes']),
    ...mapGetters('matchups', ['matchupRegexes']),
    ...mapGetters('races', ['raceRegexes']),

    eventVideos() {
      if (!this.event.videos?.length) {
        return [];
      }

      return processVideos(
        this.event.videos,
        this.enableSpoilers,
        this.playerIdRegexes,
        this.matchupRegexes,
        this.raceRegexes,
      );
    },
  },

  created() {
    this.fetchEventBroadcasts(this.event);
    this.setEventTimeString();
    this.intervalId = setInterval(this.setEventTimeString, 1000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  methods: {
    ...mapActions('events', ['fetchEventBroadcasts']),
    ...mapActions('videos', ['storeLastOpenedVideo']),

    setEventTimeString() {
      let string = '';
      const now = new Date();
      const eventDate = new Date(`${this.event.date} ${this.event.time}`);
      string += now > eventDate ? 'Happened ' : 'Starts in ';
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
