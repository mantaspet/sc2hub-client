<template>
  <div class="px-3 pb-8">
    <EventCategoryForm
      :form-item="newEventCategory"
      :errors="eventCategoryValidationErrors"
      :saving="loading['post:/event-categories']"
      @save="createEventCategory"
      @clear:errors="clearEventCategoryValidationErrors"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

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
    ...mapActions('eventCategories', [
      'createEventCategory',
      'clearEventCategoryValidationErrors',
    ]),
  },
};
</script>

<style scoped></style>
