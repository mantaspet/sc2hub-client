<template>
  <div class="container">
    <div>
      <h1>{{ error.status }}</h1>
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],

  layout: 'default', // If you prefers you can set a custom layout for the error page
};
</script>
