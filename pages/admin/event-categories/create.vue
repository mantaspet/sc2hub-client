<template>
  <div>
    <EventCategoryForm
      :form-item="newEventCategory"
      :errors="eventCategoryValidationErrors"
      :saving="loading['post:/event-categories']"
      @save="storeEventCategory"
      @clear:errors="CLEAR_VALIDATION_ERRORS"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'CreateEventCategory',

  layout: 'admin',

  computed: {
    ...mapState('eventCategories', [
      'newEventCategory',
      'eventCategoryValidationErrors',
    ]),
    ...mapGetters('progress', ['loading']),
  },

  methods: {
    ...mapMutations('eventCategories', ['CLEAR_VALIDATION_ERRORS']),
    ...mapActions('eventCategories', ['storeEventCategory']),
  },
};
</script>

<style scoped></style>
