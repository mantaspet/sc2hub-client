<template>
  <div class="mb-4">
    <label class="block">
      {{ label }}
      <div
        :class="isFocused ? 'border-primary-500' : 'border-gray-300'"
        class="w-full flex items-center bg-white rounded box-border border-2"
      >
        <input
          v-if="!textarea"
          :value="value"
          :type="type"
          :id="inputId"
          :placeholder="placeholder"
          class="p-2 border-none outline-none flex-grow"
          @input="$emit('input', $event.target.value)"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
        <textarea
          v-else
          :value="value"
          :rows="rows"
          :id="inputId"
          :placeholder="placeholder"
          class="outline-none border-none p-2 w-full"
          @input="$emit('input', $event.target.value)"
        />
        <div v-if="!textarea" class="h-8 w-8">
          <BaseIcon
            v-if="clearable && value"
            classes="cursor-pointer text-neutral-500"
            icon="close"
            @click.stop.prevent="$emit('click:clear')"
          />
        </div>
      </div>
    </label>
    <div v-if="errors" class="text-sm text-negative-500">
      {{ errors }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTextField',

  props: {
    value: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
      default: '',
    },

    errors: {
      type: String,
      default: '',
    },

    textarea: {
      type: Boolean,
      default: false,
    },

    rows: {
      type: Number,
      default: 4,
    },

    clearable: {
      type: Boolean,
      default: false,
    },

    inputId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isFocused: false,
    };
  },
};
</script>

<style scoped></style>
