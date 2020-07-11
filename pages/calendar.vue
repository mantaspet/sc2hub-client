<template>
  <section>
    <div
      class="grid grid-cols-1 md:grid-cols-7 border-l md:text-xs font-semibold"
    >
      <template v-if="mdAndUp">
        <div
          v-for="weekday in weekdays"
          :key="weekday"
          class="hidden md:block text-center text-neutral-500 border-t border-b border-r uppercase"
        >
          {{ weekday }}
        </div>
      </template>
      <div
        v-for="date in displayedDates"
        :key="date"
        class="border-r border-b p-1"
      >
        <div class="text-center text-neutral-500 text-sm">
          {{ mdAndUp ? date.slice(8) : date }}
        </div>
        <div
          v-for="event in eventsByDate[date]"
          :key="event.id"
          class="flex justify-between pt-2 pt-md-0"
        >
          <span class="whitespace-no-wrap truncate">{{ event.title }}</span>
          <span class="text-neutral-500 ml-1">{{ event.time }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {
  dateRange,
  endOfMonth,
  endOfWeek,
  formatDate,
  startOfMonth,
  startOfWeek,
} from '../util/date';
import breakpointMixin from '../mixins/breakpoint-mixin';

export default {
  name: 'Calendar',

  mixins: [breakpointMixin],

  async fetch({ store, error }) {
    if (store.state.events.events) {
      return;
    }
    try {
      const dateFrom = startOfWeek(startOfMonth(new Date()));
      const dateTo = endOfWeek(endOfMonth(new Date()));
      await store.dispatch('events/fetchEvents', {
        date_from: formatDate(dateFrom),
        date_to: formatDate(dateTo),
      });
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events at this time. Please try again later.',
      });
    }
  },

  data() {
    return {
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    };
  },

  computed: {
    ...mapState('events', ['eventFilterParams']),
    ...mapGetters('events', ['eventsByDate']),

    displayedDates() {
      let dates = dateRange(
        this.eventFilterParams.date_from,
        this.eventFilterParams.date_to,
      ).map((date) => formatDate(date));
      if (!this.mdAndUp) {
        // on calendar mobile view, do not show empty days because they are displayed in one column
        dates = dates.filter((d) => this.eventsByDate[d]);
      }
      return dates;
    },
  },
};
</script>
