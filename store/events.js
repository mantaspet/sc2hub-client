function decorateEvents(events) {
  return events.map((e) => ({
    id: e.ID,
    stage: e.Stage,
    title: e.Title,
    eventCategoryId: e.EventCategoryID,
    date: e.StartsAt.slice(0, 10),
    time: e.StartsAt.slice(11, 16),
  }));
}

export const state = () => ({
  events: null,
  eventFilterParams: {},
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
    state.events = state.events
      ? [...state.events, ...decorateEvents(events)]
      : decorateEvents(events);
  },

  SET_EVENT_FILTER_PARAMS(state, params) {
    state.eventFilterParams = params;
  },
};

export const actions = {
  async fetchEvents({ state, commit }, params) {
    commit('SET_EVENT_FILTER_PARAMS', params);
    const events = await this.$axios.$get('/events', {
      params: state.eventFilterParams,
    });
    commit('STORE_EVENTS', events);
  },
};
