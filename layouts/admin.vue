<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Header -->
    <AdminHeader />
    
    <!-- Main Content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// Admin layout - faqat AdminHeader bor, Footer yo'q
</script>
