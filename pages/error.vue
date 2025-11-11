<template>
  <div class="min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center px-4">
    <div class="text-center text-white">
      <!-- Error code -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold mb-4 animate-pulse">404</h1>
        <div class="text-6xl mb-4">🍷</div>
      </div>
      
      <!-- Error message -->
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Sahifa topilmadi
      </h2>
      <p class="text-xl text-red-200 mb-8 max-w-md mx-auto">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan.
      </p>
      
      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          to="/"
          class="bg-white text-red-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
        >
          Asosiy sahifaga qaytish
        </NuxtLink>
        <NuxtLink 
          to="/catalog"
          class="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-red-900 transition font-semibold"
        >
          Katalogni ko'rish
        </NuxtLink>
      </div>
      
      <!-- Additional links -->
      <div class="mt-12 space-y-2">
        <p class="text-red-200 text-sm">Yoki quyidagi havolalardan foydalaning:</p>
        <div class="flex flex-wrap gap-4 justify-center text-sm">
          <NuxtLink to="/about" class="text-red-200 hover:text-white transition">
            Biz haqimizda
          </NuxtLink>
          <span class="text-red-400">•</span>
          <NuxtLink to="/contact" class="text-red-200 hover:text-white transition">
            Aloqa
          </NuxtLink>
          <span class="text-red-400">•</span>
          <NuxtLink to="/cart" class="text-red-200 hover:text-white transition">
            Savatcha
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

useHead({
  title: '404 - Sahifa topilmadi'
})
</script>