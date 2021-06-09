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
        <div class="w-full">
          <BaseTextField
            :value="clientEventsSearch"
            placeholder="Search..."
            clearable
            @input="onSearchInput"
            @click:clear="SET_CLIENT_EVENTS_SEARCH('')"
          />
        </div>
      </div>
    </div>
    <div
      class="
        grid grid-cols-1
        md:grid-cols-7
        border-l
        md:text-xs
        md:font-semibold
      "
    >
      <div
        v-for="weekday in weekdays"
        :key="weekday"
        class="
          hidden
          md:block
          text-center text-neutral-500
          border-t border-b border-r
          uppercase
          bg-neutral-100
          sticky
        "
        style="top: 56px"
      >
        {{ weekday }}
      </div>
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
          'hidden md:block': !eventsByDate[date] || !isInCurrentMonth(date),
        }"
        class="border-r border-b px-1 pb-1"
      >
        <div class="text-center text-neutral-500 text-sm mt-1">
          <span class="p-1 hidden md:inline">
            {{ date.slice(8) }}
          </span>
          <span class="p-1 md:hidden">
            {{ date }}
          </span>
        </div>
        <div
          v-for="event in eventsByDate[date]"
          :id="`event-${event.id}`"
          :key="event.id"
          :class="[
            {
              'bg-primary-700':
                event.eventCategoryId && event.id !== selectedEvent.id,
            },
            {
              'bg-primary-900':
                event.eventCategoryId && event.id === selectedEvent.id,
            },
            {
              'bg-neutral-200':
                !event.eventCategoryId && event.id === selectedEvent.id,
            },
            {
              'hover:bg-primary-900 text-neutral-100 rounded':
                event.eventCategoryId,
            },
            {
              'hover:bg-neutral-200': !event.eventCategoryId,
            },
            {
              'event-chip-with-hover': !isUsingTouch,
            },
          ]"
          class="flex justify-between px-1 mt-1 cursor-pointer"
          @click="openEventDetails(event)"
        >
          <span class="whitespace-no-wrap truncate event-title">{{
            event.title
          }}</span>
          <span class="whitespace-no-wrap truncate event-stage">{{
            event.stage || event.title
          }}</span>
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
      v-if="daysWithEvents > 10"
      :title="title"
      class="mt-4 md:hidden"
      @previousMonth="previousMonth"
      @nextMonth="nextMonth"
    />
    <p v-if="daysWithEvents === 0" class="md:hidden py-3 px-4 text-center">
      No events found for this month.
    </p>

    <BaseBottomSheet
      :is-open="!!selectedEvent.id"
      :position-x="eventMenuPositionX"
      :position-y="eventMenuPositionY"
      :nudge-top="20"
      @close="selectedEvent = {}"
    >
      <EventDetails :event="selectedEvent" />
    </BaseBottomSheet>
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
import { sleep } from '@/util/sleep';
import detectTouchDeviceMixin from '@/mixins/detect-touch-device-mixin';

export default {
  name: 'Calendar',

  mixins: [detectTouchDeviceMixin],

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
      selectedEvent: {},
      eventMenuPositionX: -1,
      eventMenuPositionY: -1,
      searchTimerId: null,
    };
  },

  computed: {
    ...mapState('events', [
      'eventFilterParams',
      'clientEventsSearch',
      'eventVideosMap',
    ]),
    ...mapState('eventCategoryChannels', ['eventCategoryChannelsMap']),
    ...mapGetters('events', ['eventsByDate']),

    displayedDates() {
      return eachDayOfInterval({
        start: new Date(this.eventFilterParams.date_from),
        end: new Date(this.eventFilterParams.date_to),
      }).map((date) => format(date, 'yyyy-MM-dd'));
    },

    middleDate() {
      // eslint-disable-next-line camelcase
      const { date_from, date_to } = this.eventFilterParams;
      const timeFrom = new Date(date_from).getTime();
      const timeTo = new Date(date_to).getTime();

      const timeMiddle = (timeTo - timeFrom) / 2 + timeFrom;
      return new Date(timeMiddle);
    },

    currentMonth() {
      return this.middleDate.getMonth();
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

    daysWithEvents() {
      let count = 0;
      for (let i = 0; i < this.displayedDates.length; i++) {
        const date = this.displayedDates[i];
        if (this.isInCurrentMonth(date) && this.eventsByDate[date]?.length) {
          count += 1;
        }
      }
      return count;
    },
  },

  async beforeRouteUpdate(to, from, next) {
    await this.fetchEvents(to.query);
    next();
  },

  methods: {
    ...mapActions('events', ['fetchEvents', 'fetchEventBroadcasts']),
    ...mapActions('eventCategoryChannels', ['fetchEventCategoryChannels']),
    ...mapMutations('events', ['SET_CLIENT_EVENTS_SEARCH']),
    format,

    isInCurrentMonth(date) {
      return new Date(date).getMonth() === this.currentMonth;
    },

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

    async openEventDetails(event) {
      if (this.selectedEvent.id === event.id) {
        this.selectedEvent = {};
        return;
      }

      const requests = [];

      if (!this.eventVideosMap[event.id]) {
        requests.push(this.fetchEventBroadcasts(event));
      }

      if (
        event.eventCategoryId &&
        !this.eventCategoryChannelsMap[event.eventCategoryId]
      ) {
        requests.push(this.fetchEventCategoryChannels(event.eventCategoryId));
      }

      await Promise.allSettled(requests);
      await sleep(); // to give time for window click listener to close an open menu

      const element = document.getElementById(`event-${event.id}`);
      this.eventMenuPositionX = element.offsetLeft;
      this.eventMenuPositionY = element.offsetTop;
      this.selectedEvent = event;
    },

    onSearchInput(value) {
      clearTimeout(this.searchTimerId);
      this.searchTimerId = setTimeout(() => {
        this.SET_CLIENT_EVENTS_SEARCH(value);
      }, 500);
    },
  },
};
</script>

<style scoped>
.event-stage {
  display: none;
}

.event-chip-with-hover:hover .event-stage {
  display: inline;
}

.event-chip-with-hover:hover .event-title {
  display: none;
}
</style>
