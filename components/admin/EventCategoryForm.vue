<template>
  <form @submit.prevent="$emit('save', eventCategory)">
    <BaseTextField
      v-model="eventCategory.Name"
      :errors="errors.Name"
      label="Name*"
      @input="$emit('clear:errors', 'Name')"
    />
    <BaseTextField
      v-model="eventCategory.IncludePatterns"
      :errors="errors.IncludePatterns"
      label="Include patterns*"
      placeholder="esl,iem"
      @input="$emit('clear:errors', 'IncludePatterns')"
    />
    <BaseTextField
      v-model="eventCategory.ExcludePatterns"
      :errors="errors.ExcludePatterns"
      label="Exclude patterns"
      placeholder="rerun,repeat"
      @input="$emit('clear:errors', 'ExcludePatterns')"
    />
    <BaseTextField
      v-model="eventCategory.ImageURL"
      :errors="errors.ImageURL"
      label="ImageURL"
      @input="$emit('clear:errors', 'ImageURL')"
    />
    <BaseTextField
      v-model="eventCategory.InfoURL"
      :errors="errors.InfoURL"
      label="InfoURL"
      @input="$emit('clear:errors', 'InfoURL')"
    />
    <BaseTextField
      v-model="eventCategory.Description"
      :errors="errors.Description"
      label="Description"
      textarea
      @input="$emit('clear:errors', 'Description')"
    />
    <BaseButton :disabled="saving" :loading="saving" type="submit">
      Save
    </BaseButton>
  </form>
</template>

<script>
import BaseTextField from '@/components/base/BaseTextField';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'EventCategoryForm',

  components: { BaseButton, BaseTextField },

  props: {
    formItem: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      default: () => ({}),
    },

    saving: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      eventCategory: {},
    };
  },

  created() {
    this.eventCategory = JSON.parse(JSON.stringify(this.formItem));
  },
};
</script>

<style scoped></style>
