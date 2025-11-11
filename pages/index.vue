<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <Header />
    
    <!-- Hero Banner -->
    <section class="bg-gradient-to-r from-red-900 to-red-700 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold mb-4">Alkogol Do'koni</h1>
        <p class="text-xl mb-8">Eng yaxshi mahsulotlar, tez yetkazib berish</p>
        <NuxtLink 
          to="/catalog" 
          class="bg-white text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Katalogni ko'rish
        </NuxtLink>
      </div>
    </section>
    
    <!-- Kategoriyalar -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Kategoriyalar</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.slug"
            :to="`/catalog?category=${category.slug}`"
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center"
          >
            <div class="text-5xl mb-4">{{ category.icon }}</div>
            <h3 class="text-xl font-semibold">{{ category.name }}</h3>
            <p class="text-gray-600 text-sm mt-2">{{ category.count }}+ mahsulot</p>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Yangi mahsulotlar -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold">Yangi mahsulotlar</h2>
          <NuxtLink to="/catalog" class="text-red-600 hover:text-red-700 font-semibold">
            Hammasini ko'rish →
          </NuxtLink>
        </div>
        
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in newProducts" 
            :key="product._id"
            :product="product"
          />
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const config = useRuntimeConfig()
const cartStore = useCartStore()

const categories = [
  { name: 'Vino', slug: 'vino', icon: '🍷', count: 50 },
  { name: 'Pivo', slug: 'pivo', icon: '🍺', count: 30 },
  { name: 'Aroq', slug: 'aroq', icon: '🥃', count: 40 },
  { name: 'Viski', slug: 'viski', icon: '🥃', count: 25 }
]

const newProducts = ref([])
const loading = ref(true)

onMounted(async () => {
  // Cart'ni localStorage dan yuklash
  cartStore.loadFromLocalStorage()
  
  // Yangi mahsulotlarni olish
  try {
    const data = await $fetch(`${config.public.apiBase}/products?limit=8&sort=-createdAt`)
    newProducts.value = data.products
  } catch (error) {
    console.error('Mahsulotlarni olishda xatolik:', error)
  } finally {
    loading.value = false
  }
})
</script>