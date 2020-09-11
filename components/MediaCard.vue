<template>
  <a :href="url" class="media-card-wrapper" target="_blank">
    <article
      class="flex flex-col h-full mb-4 duration-150 transition-all transform hover:scale-105"
    >
      <div class="bg-gray-200 relative video-card-image-wrapper">
        <img :src="imageUrl" class="absolute top-0 left-0 w-full" />
        <div
          class="absolute top-0 left-0 bg-black text-white m-1 px-1 rounded text-xs font-bold"
        >
          {{ topLeft }}
        </div>
        <div
          class="absolute top-0 right-0 bg-black text-white m-1 px-1 rounded text-xs font-bold"
        >
          {{ topRight }}
        </div>
        <div
          class="absolute bottom-0 left-0 bg-black text-white m-1 px-1 rounded text-xs font-bold"
        >
          {{ bottomLeft }}
        </div>
        <div
          class="absolute bottom-0 right-0 bg-black text-white m-1 px-1 rounded text-xs font-bold"
        >
          {{ bottomRight }}
        </div>
      </div>
      <h3 class="p-2 sm:text-sm">
        {{ title }}
      </h3>
    </article>
  </a>
</template>

<script>
export default {
  name: 'MediaCard',

  props: {
    url: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: '', // TODO: add placeholder image URL
    },

    title: {
      type: String,
      default: '',
    },

    topLeft: {
      type: String,
      default: '',
    },

    topRight: {
      type: String,
      default: '',
    },

    bottomLeft: {
      type: String,
      default: '',
    },

    bottomRight: {
      type: String,
      default: '',
    },
  },
};
</script>
