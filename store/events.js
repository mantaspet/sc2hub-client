import {
  endOfMonth,
  endOfWeek,
  formatDate,
  formatTime,
  startOfMonth,
  startOfWeek,
} from '@/util/date';

function decorateEvents(events) {
  return events.map((e) => ({
    id: e.ID,
    stage: e.Stage,
    title: e.Title,
    eventCategoryId: e.EventCategoryID,
    date: formatDate(e.StartsAt),
    time: formatTime(e.StartsAt),
  }));
}

function getDefaultEventFilterParams() {
  const dateFrom = startOfWeek(startOfMonth(new Date()));
  const dateTo = endOfWeek(endOfMonth(new Date()));
  return {
    date_from: formatDate(dateFrom),
    date_to: formatDate(dateTo),
  };
}

export const state = () => ({
  events: null,
  eventFilterParams: getDefaultEventFilterParams(),
  loadedEventIntervals: [],
});

export const getters = {
  eventsByDate(state) {
    if (!state.events) {
      return [];
    }
    const eventsByDate = {};
    for (let i = 0; i < state.events.length; i++) {
      const event = state.events[i];
      if (!eventsByDate[event.date]) {
        eventsByDate[event.date] = [event];
      } else {
        eventsByDate[event.date].push(event);
      }
    }
    return eventsByDate;
  },
};

export const mutations = {
  STORE_EVENTS(state, events) {
    if (!state.events) {
      state.events = events;
      return;
    }
    const eventMap = {};
    for (let i = 0; i < state.events.length; i++) {
      const event = state.events[i];
      eventMap[event.id] = event;
    }
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      eventMap[event.id] = event;
    }
    state.events = Object.values(eventMap);
  },

  STORE_LOADED_INTERVAL(state, interval) {
    // events don't change often
    // (only after crawler goes off, which is about every 30 minutes)
    // so there's no need to query API multiple times for same month's data
    state.loadedEventIntervals.push(interval);
  },

  SET_EVENT_FILTER_PARAMS(state, params) {
    state.eventFilterParams = params;
  },
};

export const actions = {
  async fetchEvents({ state, commit }, params) {
    const interval = `${params.date_from}/${params.date_to}`;
    if (state.loadedEventIntervals.includes(interval)) {
      commit('SET_EVENT_FILTER_PARAMS', params);
      return;
    }
    const events = await this.$axios.$get('/events', {
      params,
    });
    commit('SET_EVENT_FILTER_PARAMS', params);
    commit('STORE_LOADED_INTERVAL', interval);
    commit('STORE_EVENTS', decorateEvents(events));
  },
};
