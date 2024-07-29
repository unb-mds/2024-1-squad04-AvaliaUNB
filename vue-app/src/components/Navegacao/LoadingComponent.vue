<template>
  <div class="loading-spinner" v-if="isLoading">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.loading-spinner {
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: none;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 13px;
  margin: 0 auto;
  padding: 0;
  height: 13px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
