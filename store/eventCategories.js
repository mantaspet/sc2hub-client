import Vue from 'vue';
import { removeArrayItem, updateArrayItem } from '@/util/array';

const getDefaultFormItem = () => ({});

export const state = () => ({
  eventCategories: null,
  newEventCategory: getDefaultFormItem(),
  editedEventCategory: {},
  eventCategoryValidationErrors: {},
});

export const getters = {
  eventCategoriesMap(state) {
    const map = {};
    for (let i = 0; i < state.eventCategories?.length; i++) {
      map[state.eventCategories[i].ID] = state.eventCategories[i];
    }
    return map;
  },
};

export const mutations = {
  SET_EVENT_CATEGORIES(state, eventCategories) {
    state.eventCategories = eventCategories;
  },

  SET_EDITED_EVENT_CATEGORY(state, eventCategory) {
    state.eventCategoryValidationErrors = {};
    state.editedEventCategory = JSON.parse(JSON.stringify(eventCategory));
  },

  CLEAR_VALIDATION_ERRORS(state, field) {
    Vue.delete(state.eventCategoryValidationErrors, field);
  },

  STORE_EVENT_CATEGORY(state, eventCategory) {
    state.eventCategories = [...state.eventCategories, eventCategory];
    state.newEventCategory = getDefaultFormItem();
    state.eventCategoryValidationErrors = {};
  },

  UPDATE_EVENT_CATEGORY(state, eventCategory) {
    state.eventCategories = updateArrayItem(
      state.eventCategories,
      eventCategory,
    );
  },

  SET_EVENT_CATEGORY_VALIDATION_ERRORS(state, eventCategoryValidationErrors) {
    state.eventCategoryValidationErrors = eventCategoryValidationErrors;
  },

  REMOVE_EVENT_CATEGORY(state, eventCategory) {
    state.eventCategories = removeArrayItem(
      state.eventCategories,
      eventCategory,
    );
  },
};

export const actions = {
  async fetchEventCategories({ commit }) {
    const eventCategories = await this.$axios.$get('/event-categories');
    commit('SET_EVENT_CATEGORIES', eventCategories);
    return eventCategories;
  },

  async editEventCategory({ state, commit }, eventCategoryId) {
    let eventCategory = state.eventCategories?.find(
      (ec) => ec.ID === eventCategoryId,
    );
    if (eventCategory) {
      commit('SET_EDITED_EVENT_CATEGORY', eventCategory);
      return eventCategory;
    }

    eventCategory = await this.$axios.$get(
      `/event-categories/${eventCategoryId}`,
    );
    commit('SET_EDITED_EVENT_CATEGORY', eventCategory);
    return eventCategory;
  },

  async createEventCategory({ commit }, eventCategory) {
    try {
      const newCategory = await this.$axios.$post(
        '/event-categories',
        eventCategory,
      );
      commit('STORE_EVENT_CATEGORY', newCategory);
      await this.$router.push('/admin/event-categories');
    } catch (e) {
      commit('SET_EVENT_CATEGORY_VALIDATION_ERRORS', e.response?.data || {});
    }
  },

  clearEventCategoryValidationErrors({ commit, state }, field) {
    if (state.eventCategoryValidationErrors[field]) {
      commit('CLEAR_VALIDATION_ERRORS', field);
    }
  },

  async updateEventCategory({ commit }, eventCategory) {
    try {
      const updatedCategory = await this.$axios.$put(
        `/event-categories/${eventCategory.ID}`,
        eventCategory,
      );
      commit('UPDATE_EVENT_CATEGORY', updatedCategory);
      await this.$router.push('/admin/event-categories');
    } catch (e) {
      commit('SET_EVENT_CATEGORY_VALIDATION_ERRORS', e.response?.data || {});
    }
  },

  async deleteEventCategory({ commit }, eventCategory) {
    if (!confirm('Delete event category?')) {
      return;
    }
    await this.$axios.$delete(`/event-categories/${eventCategory.ID}`);
    commit('REMOVE_EVENT_CATEGORY', eventCategory);
  },
};
