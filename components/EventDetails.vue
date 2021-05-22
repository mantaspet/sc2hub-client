<template>
  <div>
    <p>{{ event.stage }}</p>
  </div>
</template>

<script>
export default {
  name: 'EventDetails',

  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
