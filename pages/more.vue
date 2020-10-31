<template>
  <div class="h-full flex flex-col justify-end md:justify-start">
    <div class="p-4 border-b">
      <h2 class="mb-4">Pages</h2>
      <div v-for="page in pages" :key="page.name">
        <nuxt-link :to="page.url" class="flex">
          <BaseIcon :icon="page.icon" classes="h-6 mr-4" />
          {{ page.name }}
        </nuxt-link>
      </div>
    </div>
    <Settings class="w-full p-4" />
  </div>
</template>

<script>
// only meant to be loaded on small screens
import Settings from '@/components/Settings';
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'More',

  components: { BaseIcon, Settings },

  data() {
    return {
      pages: [{ name: 'Calendar', url: '/calendar', icon: 'calendar' }],
    };
  },
};
</script>

<style scoped></style>
