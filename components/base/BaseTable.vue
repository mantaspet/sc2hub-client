<template>
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-white">
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in items" :key="item[itemKey]">
          <td
            v-for="header in headers"
            :key="header.value"
            class="px-6 py-4 text-sm"
          >
            <slot
              :name="`item.${header.value}`"
              :item="item"
              :index="index"
              :header="header"
            >
              {{ item[header.value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',

  props: {
    headers: {
      type: Array,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },

    itemKey: {
      type: String,
      default: 'ID',
    },
  },
};
</script>

<style scoped></style>
