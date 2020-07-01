<template>
  <a :href="video.VideoURL" class="media-card-wrapper" target="_blank">
    <article
      class="flex flex-col h-full mb-4 duration-150 transition-all transform hover:scale-105"
    >
      <div class="bg-gray-200 relative video-card-image-wrapper">
        <img :src="video.ThumbnailURL" class="absolute top-0 left-0" />
        <div
          class="absolute top-0 left-0 bg-black text-white m-1 px-1 rounded text-xs font-bold"
        >
          {{ video.Duration }}
        </div>
        <div
          class="absolute bottom-0 left-0 bg-black text-white m-1 px-1 rounded text-xs font-bold"
        >
          {{ video.ViewCount }}
        </div>
        <div
          class="absolute bottom-0 right-0 bg-black text-white m-1 px-1 rounded text-xs font-bold"
        >
          {{ video.CreatedAt }}
        </div>
      </div>
      <h3 class="p-2 sm:text-sm">
        {{ video.Title }}
      </h3>
    </article>
  </a>
</template>

<script>
export default {
  name: 'MediaCard',

  props: {
    video: {
      type: Object,
      required: true,
    },
  },
};
</script>
