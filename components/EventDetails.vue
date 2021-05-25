<template>
  <div>
    <p>{{ event.stage }}</p>
    <p class="text-sm">{{ eventTimeString }}</p>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';

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

  created() {
    this.setEventTimeString();
    this.intervalId = setInterval(this.setEventTimeString, 1000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  methods: {
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
