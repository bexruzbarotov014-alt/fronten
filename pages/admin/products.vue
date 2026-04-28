<template>
  <!-- Admin Header -->
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <NuxtLink to="/admin" class="text-2xl font-bold text-red-600 flex items-center">
          <span class="text-3xl mr-2">🍷</span>
          Admin Panel
        </NuxtLink>
        <nav class="flex space-x-6">
          <NuxtLink to="/admin" class="text-gray-700 hover:text-red-600 font-medium" active-class="text-red-600">Dashboard</NuxtLink>
          <NuxtLink to="/admin/analytics" class="text-gray-700 hover:text-red-600 font-medium" active-class="text-red-600">Analytics</NuxtLink>
          <NuxtLink to="/admin/products" class="text-gray-700 hover:text-red-600 font-medium" active-class="text-red-600">Mahsulotlar</NuxtLink>
          <NuxtLink to="/admin/orders" class="text-gray-700 hover:text-red-600 font-medium" active-class="text-red-600">Buyurtmalar</NuxtLink>
          <NuxtLink to="/admin/messages" class="text-gray-700 hover:text-red-600 font-medium" active-class="text-red-600">Xabarlar</NuxtLink>
        </nav>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" target="_blank" class="text-gray-700 hover:text-red-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </NuxtLink>
          <button @click="logout" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Chiqish
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Mahsulotlar boshqaruvi</h1>
      <button 
        @click="openAddModal"
        class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Yangi mahsulot
      </button>
    </div>
    
    <!-- Qidiruv va filter -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Mahsulot qidirish..."
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
          @input="debouncedSearch"
        />
        <select 
          v-model="filterCategory"
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
          @change="fetchProducts"
        >
          <option value="">Barcha kategoriyalar</option>
          <option value="vino">Vino</option>
          <option value="pivo">Pivo</option>
          <option value="aroq">Aroq</option>
          <option value="viski">Viski</option>
          <option value="konyak">Konyak</option>
          <option value="likyor">Likyor</option>
        </select>
        <select 
          v-model="sortBy"
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
          @change="fetchProducts"
        >
          <option value="-createdAt">Yangi birinchi</option>
          <option value="name">Nom (A-Z)</option>
          <option value="price">Arzon birinchi</option>
          <option value="-price">Qimmat birinchi</option>
        </select>
      </div>
    </div>
    
    <!-- Mahsulotlar jadvali -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
      
      <div v-else-if="products.length === 0" class="text-center py-12">
        <p class="text-gray-600">Mahsulotlar topilmadi</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="text-left py-3 px-4 font-medium">Rasm</th>
              <th class="text-left py-3 px-4 font-medium">Nom</th>
              <th class="text-left py-3 px-4 font-medium">Kategoriya</th>
              <th class="text-left py-3 px-4 font-medium">Narx</th>
              <th class="text-left py-3 px-4 font-medium">Ombor</th>
              <th class="text-left py-3 px-4 font-medium">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="product in products" 
              :key="product._id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-3 px-4">
                <img 
                  :src="product.images?.[0] || '/placeholder.jpg'" 
                  :alt="product.name"
                  class="w-16 h-16 object-cover rounded"
                />
              </td>
              <td class="py-3 px-4">
                <p class="font-medium">{{ product.name }}</p>
                <p class="text-sm text-gray-500">{{ product.brand }}</p>
              </td>
              <td class="py-3 px-4">
                <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {{ product.category }}
                </span>
              </td>
              <td class="py-3 px-4">
                <p class="font-semibold">{{ formatPrice(product.price) }}</p>
                <p v-if="product.discountPercent > 0" class="text-sm text-red-600">
                  -{{ product.discountPercent }}%
                </p>
              </td>
              <td class="py-3 px-4">
                <span :class="product.inStock > 0 ? 'text-green-600' : 'text-red-600'">
                  {{ product.inStock }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex space-x-2">
                  <button 
                    @click="openEditModal(product)"
                    class="text-blue-600 hover:text-blue-700"
                    title="Tahrirlash"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="deleteProduct(product._id)"
                    class="text-red-600 hover:text-red-700"
                    title="O'chirish"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="p-4 border-t flex justify-center">
        <nav class="flex gap-2">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page === 1"
            class="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Oldingi
          </button>
          <span class="px-4 py-2">
            {{ pagination.page }} / {{ pagination.totalPages }}
          </span>
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page === pagination.totalPages"
            class="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Keyingi
          </button>
        </nav>
      </div>
    </div>
    
    <!-- Modal (Qo'shish/Tahrirlash) -->
    <ProductModal 
      v-if="showModal"
      :product="selectedProduct"
      @close="closeModal"
      @save="handleSave"
    />
    
    <!-- Confirm Dialog -->
    <ConfirmDialog
      :show="showConfirmDialog"
      title="Mahsulotni o'chirish"
      message="Bu mahsulotni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
      confirm-text="O'chirish"
      confirm-type="danger"
      @confirm="handleDeleteConfirm"
      @cancel="showConfirmDialog = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

const config = useRuntimeConfig()
const authStore = useAuthStore()
const toast = useToast()

const products = ref([])
const loading = ref(true)
const searchQuery = ref('')
const filterCategory = ref('')
const sortBy = ref('-createdAt')
const pagination = ref({
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1
})

const showModal = ref(false)
const selectedProduct = ref(null)
const showConfirmDialog = ref(false)
const productToDelete = ref(null)

let searchTimeout = null

onMounted(() => {
  fetchProducts()
})

const fetchProducts = async () => {
  loading.value = true

  try {
    const params = new URLSearchParams({
      page: pagination.value.page,
      limit: pagination.value.limit,
      sort: sortBy.value
    })

    if (filterCategory.value) params.append('category', filterCategory.value)
    if (searchQuery.value) params.append('search', searchQuery.value)

    // Normalize base (avoid double slashes)
    const base = (config.public.apiBase || '').replace(/\/+$/, '')
    const url = `${base}/products?${params.toString()}`

    const data = await $fetch(url, {
      headers: authStore.getAuthHeader()
    })

    products.value = Array.isArray(data.products) ? data.products : []
    pagination.value = data.pagination || {
      total: products.value.length,
      page: 1,
      limit: products.value.length || 20,
      totalPages: 1
    }
  } catch (error) {
    console.error('Mahsulotlarni olishda xatolik:', error)
    const message = error?.data?.message || error?.message || 'Mahsulotlarni olishda xatolik yuz berdi'
    toast.error(message)
    products.value = []
    pagination.value = { total: 0, page: 1, limit: 20, totalPages: 1 }
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    fetchProducts()
  }, 500)
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.page = page
    fetchProducts()
  }
}

const openAddModal = () => {
  selectedProduct.value = null
  showModal.value = true
}

const openEditModal = (product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

const handleSave = () => {
  closeModal()
  fetchProducts()
  toast.success('Mahsulot muvaffaqiyatli saqlandi')
}

const deleteProduct = (id) => {
  productToDelete.value = id
  showConfirmDialog.value = true
}

const handleDeleteConfirm = async () => {
  if (!productToDelete.value) {
    showConfirmDialog.value = false
    return
  }
  
  try {
    await $fetch(`${config.public.apiBase}/products/${productToDelete.value}`, {
      method: 'DELETE',
      headers: authStore.getAuthHeader()
    })
    
    toast.success('Mahsulot muvaffaqiyatli o\'chirildi')
    showConfirmDialog.value = false
    productToDelete.value = null
    fetchProducts()
  } catch (error) {
    console.error('Mahsulotni o\'chirishda xatolik:', error)
    toast.error(error.data?.message || 'Mahsulotni o\'chirishda xatolik yuz berdi')
    showConfirmDialog.value = false
    productToDelete.value = null
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}

const logout = () => {
  authStore.logout()
  navigateTo('/admin/login')
}
</script>