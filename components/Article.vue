<template>
  <a
    :href="url"
    class="
      no-underline
      flex-col
      sm:flex-row
      sm:p-2
      sm:my-2
      sm:-mx-2
      transition-all
      duration-150
      hover:bg-neutral-200
      active:bg-neutral-300
    "
    target="_blank"
  >
    <article class="flex flex-col sm:flex-row sm:items-center">
      <img :src="image" class="w-full md:w-1/4 object-cover h-48 md:h-24" />

      <div
        class="sm:w-3/4 justify-center mx-3 mt-2 mb-8 sm:ml-4 sm:mr-0 sm:my-0"
      >
        <h2 class="text-lg mb-1 background-inherit">
          {{ title }}
        </h2>
        <p v-if="excerpt" class="mt-0 mb-2 text-sm">
          {{ excerpt }}
        </p>
        <p class="mt-0 mb-2 text-neutral-600 text-sm">
          {{ publishedAt }} by {{ source }}
        </p>
      </div>
    </article>
  </a>
</template>

<script>
export default {
  name: 'Article',

  props: {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '', // TODO add default image
    },
    url: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: '',
    },
  },
};
</script>
