<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Global page transition component
</script>

<style>
/* Page transition styles */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Layout transition styles */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(5px);
}
</style>
