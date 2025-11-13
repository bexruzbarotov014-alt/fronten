<template>
  <div class="flex items-center justify-center min-h-[200px]">
    <div class="relative">
      <!-- Outer ring -->
      <div class="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
      <!-- Inner spinning ring -->
      <div class="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
      
      <!-- Optional pulse effect -->
      <div v-if="pulse" class="absolute inset-0 w-16 h-16 bg-red-600 rounded-full animate-ping opacity-20"></div>
    </div>
    
    <!-- Optional text -->
    <div v-if="text" class="ml-4 text-gray-600 font-medium">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  },
  pulse: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* Custom spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
