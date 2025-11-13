<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Mahsulotlar katalogi</h1>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters -->
        <aside class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 class="text-xl font-semibold mb-4">Filtrlash</h2>
            
            <!-- Qidiruv -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Qidiruv</label>
              <input 
                v-model="filters.search"
                type="text" 
                placeholder="Mahsulot nomi..."
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                @input="debouncedSearch"
              />
            </div>
            
            <!-- Kategoriya -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Kategoriya</label>
              <select 
                v-model="filters.category"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                @change="applyFilters"
              >
                <option value="all">Barchasi</option>
                <option value="vino">Vino</option>
                <option value="pivo">Pivo</option>
                <option value="aroq">Aroq</option>
                <option value="viski">Viski</option>
                <option value="konyak">Konyak</option>
                <option value="likyor">Likyor</option>
              </select>
            </div>
            
            <!-- Narx oralig'i -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Narx oralig'i</label>
              <div class="flex gap-2">
                <input 
                  v-model.number="filters.minPrice"
                  type="number" 
                  placeholder="Dan"
                  class="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                <input 
                  v-model.number="filters.maxPrice"
                  type="number" 
                  placeholder="Gacha"
                  class="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <button 
                @click="applyFilters"
                class="w-full mt-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Qo'llash
              </button>
            </div>
            
            <!-- Saralash -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Saralash</label>
              <select 
                v-model="filters.sort"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                @change="applyFilters"
              >
                <option value="-createdAt">Yangisi birinchi</option>
                <option value="price">Arzon birinchi</option>
                <option value="-price">Qimmat birinchi</option>
                <option value="name">Nom (A-Z)</option>
              </select>
            </div>
            
            <!-- Filterni tozalash -->
            <button 
              @click="resetFilters"
              class="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Tozalash
            </button>
          </div>
        </aside>
        
        <!-- Products Grid -->
        <main class="flex-1">
          <!-- Yuklanmoqda -->
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p class="mt-4 text-gray-600">Yuklanmoqda...</p>
          </div>
          
          <!-- Mahsulotlar yo'q -->
          <div v-else-if="products.length === 0" class="text-center py-12">
            <p class="text-2xl text-gray-600">Mahsulotlar topilmadi</p>
          </div>
          
          <!-- Mahsulotlar -->
          <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard 
                v-for="product in products" 
                :key="product._id"
                :product="product"
              />
            </div>
            
            <!-- Pagination -->
            <div v-if="pagination.totalPages > 1" class="mt-8 flex justify-center">
              <nav class="flex gap-2">
                <button
                  @click="changePage(pagination.page - 1)"
                  :disabled="pagination.page === 1"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Oldingi
                </button>
                
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="changePage(page)"
                  :class="[
                    'px-4 py-2 border rounded-lg',
                    page === pagination.page ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
                  ]"
                >
                  {{ page }}
                </button>
                
                <button
                  @click="changePage(pagination.page + 1)"
                  :disabled="pagination.page === pagination.totalPages"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Keyingi
                </button>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const products = ref([])
const loading = ref(true)
const pagination = ref({
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 1
})

const filters = ref({
  search: '',
  category: 'all',
  minPrice: null,
  maxPrice: null,
  sort: '-createdAt'
})

let searchTimeout = null

// URL query parametrlaridan filterni yuklash
onMounted(() => {
  if (route.query.category) {
    filters.value.category = route.query.category
  }
  if (route.query.search) {
    filters.value.search = route.query.search
  }
  if (route.query.page) {
    pagination.value.page = parseInt(route.query.page)
  }
  
  fetchProducts()
})

// Mahsulotlarni olish
const fetchProducts = async () => {
  loading.value = true
  
  try {
    const params = new URLSearchParams({
      page: pagination.value.page,
      limit: pagination.value.limit,
      sort: filters.value.sort
    })
    
    if (filters.value.category !== 'all') {
      params.append('category', filters.value.category)
    }
    if (filters.value.search) {
      params.append('search', filters.value.search)
    }
    if (filters.value.minPrice) {
      params.append('minPrice', filters.value.minPrice)
    }
    if (filters.value.maxPrice) {
      params.append('maxPrice', filters.value.maxPrice)
    }
    
    const data = await $fetch(`${config.public.apiBase}/products?${params}`)
    products.value = data.products
    pagination.value = data.pagination
    
    // Sahifani yuqoriga scroll qilish
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('Mahsulotlarni olishda xatolik:', error)
  } finally {
    loading.value = false
  }
}

// Filterni qo'llash
const applyFilters = () => {
  pagination.value.page = 1
  updateURL()
  fetchProducts()
}

// Qidiruvni debounce bilan
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

// Filterni tozalash
const resetFilters = () => {
  filters.value = {
    search: '',
    category: 'all',
    minPrice: null,
    maxPrice: null,
    sort: '-createdAt'
  }
  applyFilters()
}

// Sahifani o'zgartirish
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.page = page
    updateURL()
    fetchProducts()
  }
}

// URL ni yangilash
const updateURL = () => {
  const query = {}
  
  if (filters.value.category !== 'all') {
    query.category = filters.value.category
  }
  if (filters.value.search) {
    query.search = filters.value.search
  }
  if (pagination.value.page > 1) {
    query.page = pagination.value.page
  }
  
  router.push({ query })
}

// Ko'rinadigan sahifalar
const visiblePages = computed(() => {
  const pages = []
  const current = pagination.value.page
  const total = pagination.value.totalPages
  
  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>