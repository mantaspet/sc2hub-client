import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

function decorateEvents(events) {
  return events.map((e) => ({
    id: e.ID,
    stage: e.Stage,
    title: e.Title,
    eventCategoryId: e.EventCategoryID,
    date: format(new Date(e.StartsAt), 'yyyy-MM-dd'),
    time: format(new Date(e.StartsAt), 'HH:mm'),
  }));
}

function getDefaultEventFilterParams() {
  const dateFrom = format(
    startOfWeek(startOfMonth(new Date()), { weekStartsOn: 1 }),
    'yyyy-MM-dd',
  );
  const dateTo = format(
    endOfWeek(endOfMonth(new Date()), { weekStartsOn: 1 }),
    'yyyy-MM-dd',
  );
  return {
    date_from: dateFrom,
    date_to: dateTo,
  };
}

export const state = () => ({
  events: null,
  eventFilterParams: getDefaultEventFilterParams(),
  clientEventsSearch: '',
  loadedEventIntervals: [],
});

export const getters = {
  eventsByDate(state) {
    if (!state.events) {
      return [];
    }
    const search = state.clientEventsSearch.toLowerCase().trim();
    const events = state.events.filter(
      (e) =>
        e.title.toLowerCase().includes(search) ||
        e.stage.toLowerCase().includes(search),
    );
    const eventsByDate = {};
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
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

  SET_CLIENT_EVENTS_SEARCH(state, search) {
    state.clientEventsSearch = search;
  },
};

export const actions = {
  async fetchEvents({ state, commit }, eventParams) {
    let params = { ...eventParams };
    if (!params.date_from || !params.date_to) {
      params = { ...state.eventFilterParams };
    }
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
