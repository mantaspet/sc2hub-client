<template>
  <div>
    <EventCategoryForm
      :form-item="editedEventCategory"
      :errors="eventCategoryValidationErrors"
      :saving="loading['post:/event-categories']"
      @save="updateEventCategory"
      @clear:errors="CLEAR_VALIDATION_ERRORS"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'EventCategory',

  layout: 'admin',

  async fetch({ store, route }) {
    await store.dispatch('eventCategories/editEventCategory', +route.params.id);
  },

  computed: {
    ...mapState('eventCategories', [
      'editedEventCategory',
      'eventCategoryValidationErrors',
    ]),
    ...mapGetters('progress', ['loading']),
  },

  methods: {
    ...mapMutations('eventCategories', ['CLEAR_VALIDATION_ERRORS']),
    ...mapActions('eventCategories', ['updateEventCategory']),
  },
};
</script>

<style scoped></style>
