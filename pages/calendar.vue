<template>
  <section>
    <CalendarHeader
      :title="title"
      class="mt-4 md:mt-0"
      @previousMonth="previousMonth"
      @nextMonth="nextMonth"
    />
    <div
      class="grid grid-cols-1 md:grid-cols-7 border-l md:text-xs font-semibold"
    >
      <template v-if="mdAndUp">
        <div
          v-for="weekday in weekdays"
          :key="weekday"
          class="hidden md:block text-center text-neutral-500 border-t border-b border-r uppercase bg-neutral-100 sticky"
          style="top: 56px"
        >
          {{ weekday }}
        </div>
      </template>
      <div v-if="!displayedDates.length" class="text-center my-2">
        No events are registered for this month
      </div>
      <div
        v-for="date in displayedDates"
        :key="date"
        class="border-r border-b px-1 pb-1"
      >
        <div class="text-center text-neutral-500 text-sm mt-1">
          <span
            :class="{ 'bg-primary-700 text-neutral-100': today === date }"
            class="p-1 rounded"
          >
            {{ mdAndUp ? date.slice(8) : date }}
          </span>
        </div>
        <div
          v-for="event in eventsByDate[date]"
          :key="event.id"
          class="flex justify-between pt-2 md:pt-1"
        >
          <span class="whitespace-no-wrap truncate">{{ event.title }}</span>
          <span class="text-neutral-500 ml-1">{{ event.time }}</span>
        </div>
      </div>
    </div>
    <CalendarHeader
      v-if="!mdAndUp && displayedDates.length"
      :title="title"
      class="mt-4"
      @previousMonth="previousMonth"
      @nextMonth="nextMonth"
    />
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import {
  addMonths,
  dateRange,
  endOfMonth,
  endOfWeek,
  formatDate,
  startOfMonth,
  startOfWeek,
} from '../util/date';
import breakpointMixin from '../mixins/breakpoint-mixin';
import CalendarHeader from '../components/CalendarHeader';

export default {
  name: 'Calendar',

  components: { CalendarHeader },

  mixins: [breakpointMixin],

  async fetch({ store, error, route }) {
    if (store.state.events.events) {
      return;
    }
    try {
      await store.dispatch('events/fetchEvents', route.query);
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
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      today: formatDate(new Date()),
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

    middleDate() {
      // eslint-disable-next-line camelcase
      const { date_from, date_to } = this.eventFilterParams;
      const timeFrom = new Date(date_from).getTime();
      const timeTo = new Date(date_to).getTime();

      const timeMiddle = (timeTo - timeFrom) / 2 + timeFrom;
      return new Date(timeMiddle);
    },

    title() {
      return `${this.months[this.middleDate.getMonth()]}, ${formatDate(
        this.middleDate,
      ).slice(0, 4)}`;
    },
  },

  async beforeRouteUpdate(to, from, next) {
    await this.fetchEvents(to.query);
    next();
  },

  methods: {
    ...mapActions('events', ['fetchEvents']),

    previousMonth() {
      const previousMonth = addMonths(this.middleDate, -1);
      const dateFrom = startOfWeek(startOfMonth(previousMonth));
      const dateTo = endOfWeek(endOfMonth(previousMonth));
      this.$router.push({
        name: 'calendar',
        query: {
          date_from: formatDate(dateFrom),
          date_to: formatDate(dateTo),
        },
      });
    },

    nextMonth() {
      const nextMonth = addMonths(this.middleDate, 1);
      const dateFrom = startOfWeek(startOfMonth(nextMonth));
      const dateTo = endOfWeek(endOfMonth(nextMonth));
      this.$router.push({
        name: 'calendar',
        query: {
          date_from: formatDate(dateFrom),
          date_to: formatDate(dateTo),
        },
      });
    },
  },
};
</script>
