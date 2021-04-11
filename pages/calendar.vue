<template>
  <section>
    <div
      class="flex flex-col-reverse md:flex-row justify-between"
      style="min-height: 60px"
    >
      <div class="md:w-1/4"></div>
      <CalendarHeader
        :title="title"
        class="mt-4 md:mt-0 md:w-1/2"
        @previousMonth="previousMonth"
        @nextMonth="nextMonth"
      />
      <div class="md:w-1/4 flex justify-end px-2 md:px-0 pt-2 md:pt-0">
        <div :style="mdAndUp ? 'max-width: 16rem' : 'width: 100%'">
          <BaseTextField
            :value="clientEventsSearch"
            placeholder="Search..."
            clearable
            @input="SET_CLIENT_EVENTS_SEARCH"
            @click:clear="SET_CLIENT_EVENTS_SEARCH('')"
          />
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-7 border-l md:text-xs md:font-semibold"
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
        {{
          clientEventsSearch
            ? 'No events found'
            : 'No events are registered for this month'
        }}
      </div>
      <div
        v-for="date in displayedDates"
        :key="date"
        :class="{
          'bg-positive-100': today === date,
        }"
        class="border-r border-b px-1 pb-1"
      >
        <div class="text-center text-neutral-500 text-sm mt-1">
          <span class="p-1">
            {{ mdAndUp ? date.slice(8) : date }}
          </span>
        </div>
        <div
          v-for="event in eventsByDate[date]"
          :key="event.id"
          :class="{
            'bg-primary-700 text-neutral-100 rounded': event.eventCategoryId,
          }"
          class="flex justify-between px-1 mt-1"
        >
          <span class="whitespace-no-wrap truncate">{{ event.title }}</span>
          <span
            :class="
              event.eventCategoryId ? 'text-neutral-100' : 'text-neutral-500'
            "
            class="ml-1"
            >{{ event.time }}</span
          >
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import {
  addMonths,
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
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
      today: format(new Date(), 'yyyy-MM-dd'),
    };
  },

  computed: {
    ...mapState('events', ['eventFilterParams', 'clientEventsSearch']),
    ...mapGetters('events', ['eventsByDate']),

    displayedDates() {
      let dates = eachDayOfInterval({
        start: new Date(this.eventFilterParams.date_from),
        end: new Date(this.eventFilterParams.date_to),
      }).map((date) => format(date, 'yyyy-MM-dd'));
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
      return format(this.middleDate, 'MMMM, yyyy');
    },

    weekdays() {
      const weekdays = [];
      for (let i = 0; i < 7; i++) {
        weekdays.push(format(new Date(this.displayedDates[i]), 'E'));
      }
      return weekdays;
    },
  },

  async beforeRouteUpdate(to, from, next) {
    await this.fetchEvents(to.query);
    next();
  },

  methods: {
    ...mapActions('events', ['fetchEvents']),
    ...mapMutations('events', ['SET_CLIENT_EVENTS_SEARCH']),
    format,

    previousMonth() {
      const previousMonth = addMonths(this.middleDate, -1);
      const dateFrom = format(
        startOfWeek(startOfMonth(previousMonth), { weekStartsOn: 1 }),
        'yyyy-MM-dd',
      );
      const dateTo = format(
        endOfWeek(endOfMonth(previousMonth), { weekStartsOn: 1 }),
        'yyyy-MM-dd',
      );
      this.$router.push({
        name: 'calendar',
        query: {
          date_from: dateFrom,
          date_to: dateTo,
        },
      });
    },

    nextMonth() {
      const nextMonth = addMonths(this.middleDate, 1);
      const dateFrom = format(
        startOfWeek(startOfMonth(nextMonth), { weekStartsOn: 1 }),
        'yyyy-MM-dd',
      );
      const dateTo = format(
        endOfWeek(endOfMonth(nextMonth), { weekStartsOn: 1 }),
        'yyyy-MM-dd',
      );
      this.$router.push({
        name: 'calendar',
        query: {
          date_from: dateFrom,
          date_to: dateTo,
        },
      });
    },
  },
};
</script>
