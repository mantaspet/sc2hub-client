<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div
        v-if="eventCategories"
        class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <div class="text-right mb-2">
          <BaseButton to="/admin/event-categories/create" link
            >Create event category</BaseButton
          >
        </div>
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-white">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Info
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="ec in eventCategories" :key="ec.ID">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="ec.ImageURL"
                        alt=""
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ ec.Name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ ec.Pattern }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ ec.Description }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <a
                    v-if="ec.InfoURL"
                    :href="ec.InfoURL"
                    class="link text-sm"
                    target="_blank"
                  >
                    Info
                  </a>
                </td>
                <td class="px-6 py-4 text-right text-sm font-medium">
                  <div class="flex">
                    <nuxt-link
                      :to="`/admin/event-categories/${ec.ID}`"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Edit</nuxt-link
                    >
                    <a
                      href="#"
                      class="ml-2 text-red-600 hover:text-red-900"
                      @click.prevent="deleteEventCategory(ec)"
                      >Delete</a
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
