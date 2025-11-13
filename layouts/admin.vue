<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Test Admin Header -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-bold text-red-600">🍷 Admin Panel</h1>
          <nav class="flex space-x-4">
            <NuxtLink to="/admin" class="text-gray-700 hover:text-red-600">Dashboard</NuxtLink>
            <NuxtLink to="/admin/products" class="text-gray-700 hover:text-red-600">Mahsulotlar</NuxtLink>
            <NuxtLink to="/admin/orders" class="text-gray-700 hover:text-red-600">Buyurtmalar</NuxtLink>
          </nav>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
// Test layout - to'g'ridan-to'g'ri HTML
console.log('Admin layout loaded - TEST VERSION')
</script>
