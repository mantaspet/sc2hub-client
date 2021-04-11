<template>
  <div class="loading-spinner"></div>
</template>

<script>
export default {
  name: 'BaseLoadingSpinner',
};
</script>

<style scoped>
.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 0.4rem solid transparent;
  border-top-color: var(--color-primary-700);
  border-bottom-color: var(--color-primary-700);
  border-radius: 50%;
  animation: rotation 0.8s ease infinite;
  cursor: progress;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes progress {
  0% {
    left: -130%;
    background: var(--color-primary-700);
  }
  50% {
    left: 130%;
    background: var(--color-primary-700);
  }
  51% {
    background: var(--color-neutral-100);
  }
  100% {
    background: var(--color-neutral-100);
  }
}
</style>
