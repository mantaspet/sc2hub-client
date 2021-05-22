<template>
  <a :href="url" target="_blank" @click="$emit('click')">
    <article
      class="
        flex flex-col
        h-full
        mb-4
        duration-150
        transition-all
        transform
        hover:scale-105
      "
    >
      <div class="bg-gray-200 relative video-card-image-wrapper">
        <img
          :src="currentImageUrl"
          class="absolute top-0 left-0 w-full"
          @error="failedToLoadImage = true"
        />
        <div
          v-if="topLeft"
          class="
            absolute
            top-0
            left-0
            bg-black
            text-white
            m-1
            px-1
            rounded
            text-xs
            font-bold
          "
        >
          {{ topLeft }}
        </div>
        <div class="absolute top-0 right-0 m-1">
          <slot name="top-right">
            <div
              v-if="topRight"
              class="bg-black text-white px-1 rounded text-xs font-bold"
            >
              {{ topRight }}
            </div>
          </slot>
        </div>
        <div
          v-if="bottomLeft"
          class="
            absolute
            bottom-0
            left-0
            bg-black
            text-white
            m-1
            px-1
            rounded
            text-xs
            font-bold
          "
        >
          {{ bottomLeft }}
        </div>
        <div
          v-if="bottomRight"
          class="
            absolute
            bottom-0
            right-0
            bg-black
            text-white
            m-1
            px-1
            rounded
            text-xs
            font-bold
          "
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

    fallbackImageUrl: {
      type: String,
      default: '',
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

  data() {
    return {
      failedToLoadImage: false,
    };
  },

  computed: {
    currentImageUrl() {
      if (this.failedToLoadImage) {
        return this.fallbackImageUrl || '/youtube-placeholder.png';
      }
      return this.imageUrl;
    },
  },
};
</script>
