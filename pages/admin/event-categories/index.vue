<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div
        v-if="eventCategories"
        class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <div class="text-right mb-4">
          <BaseButton to="/admin/event-categories/create" link
            >Create event category</BaseButton
          >
        </div>
        <BaseTable :headers="tableHeaders" :items="eventCategories">
          <template #item.Name="{ item }">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="item.ImageURL"
                  alt=""
                />
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ item.Name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ item.Pattern }}
                </div>
              </div>
            </div>
          </template>

          <template #item.InfoURL="{ item }">
            <a
              v-if="item.InfoURL"
              :href="item.InfoURL"
              class="link text-sm"
              target="_blank"
            >
              Info
            </a>
          </template>

          <template #item.Actions="{ item }">
            <div class="flex">
              <nuxt-link
                :to="`/admin/event-categories/${item.ID}`"
                class="text-indigo-600 hover:text-indigo-900"
                >Edit</nuxt-link
              >
              <a
                href="#"
                class="ml-2 text-red-600 hover:text-red-900"
                @click.prevent="deleteEventCategory(item)"
                >Delete</a
              >
            </div>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'EventCategories',

  layout: 'admin',

  computed: {
    ...mapState('eventCategories', ['eventCategories']),

    tableHeaders() {
      return [
        { value: 'Name', text: 'Name' },
        { value: 'Description', text: 'Description' },
        { value: 'InfoURL', text: 'Info' },
        { value: 'Actions', text: 'Actions' },
      ];
    },
  },

  mounted() {
    if (!this.eventCategories) {
      this.fetchEventCategories();
    }
  },

  methods: {
    ...mapActions('eventCategories', [
      'fetchEventCategories',
      'deleteEventCategory',
    ]),
  },
};
</script>

<style scoped></style>
