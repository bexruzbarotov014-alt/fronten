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
    <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
    
    <!-- Statistika kartlari -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Jami buyurtmalar -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Jami buyurtmalar</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ stats.totalOrders }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Yangi buyurtmalar -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Yangi buyurtmalar</p>
              <p class="text-3xl font-bold text-orange-600 mt-2">{{ stats.newOrders }}</p>
            </div>
            <div class="bg-orange-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Yetkazilgan -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Yetkazilgan</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.deliveredOrders }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Jami daromad -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Jami daromad</p>
              <p class="text-2xl font-bold text-red-600 mt-2">{{ formatPrice(stats.totalRevenue) }}</p>
            </div>
            <div class="bg-red-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Oxirgi buyurtmalar -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Oxirgi buyurtmalar</h2>
          <NuxtLink 
            to="/admin/orders" 
            class="text-red-600 hover:text-red-700 font-medium"
          >
            Hammasini ko'rish →
          </NuxtLink>
        </div>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
        
        <div v-else-if="recentOrders.length === 0" class="text-center py-8 text-gray-500">
          Buyurtmalar yo'q
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4 font-medium">Buyurtma #</th>
                <th class="text-left py-3 px-4 font-medium">Mijoz</th>
                <th class="text-left py-3 px-4 font-medium">Summa</th>
                <th class="text-left py-3 px-4 font-medium">Holat</th>
                <th class="text-left py-3 px-4 font-medium">Sana</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="order in recentOrders" 
                :key="order._id"
                class="border-b hover:bg-gray-50"
              >
                <td class="py-3 px-4">
                  <NuxtLink 
                    :to="`/admin/orders?id=${order._id}`"
                    class="text-red-600 hover:underline font-medium"
                  >
                    {{ order.orderNumber }}
                  </NuxtLink>
                </td>
                <td class="py-3 px-4">
                  <div>
                    <p class="font-medium">{{ order.customer.name }}</p>
                    <p class="text-sm text-gray-500">{{ order.customer.phone }}</p>
                  </div>
                </td>
                <td class="py-3 px-4 font-semibold">
                  {{ formatPrice(order.totalPrice) }}
                </td>
                <td class="py-3 px-4">
                  <span :class="getStatusClass(order.status)">
                    {{ getStatusText(order.status) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-gray-600">
                  {{ formatDate(order.createdAt) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

const config = useRuntimeConfig()
const authStore = useAuthStore()

const stats = ref({
  totalOrders: 0,
  newOrders: 0,
  processingOrders: 0,
  deliveredOrders: 0,
  totalRevenue: 0,
  recentOrders: 0
})

const recentOrders = ref([])
const loading = ref(true)

onMounted(async () => {
  console.log('Admin index page mounted')
  authStore.loadFromLocalStorage()
  
  console.log('Auth status:', authStore.isAuthenticated)
  console.log('Admin user:', authStore.admin)
  
  if (!authStore.isAuthenticated) {
    console.log('Not authenticated, redirecting to login')
    navigateTo('/admin/login')
    return
  }
  
  console.log('Fetching dashboard data...')
  await fetchDashboardData()
})

const fetchDashboardData = async () => {
  loading.value = true
  
  try {
    // Statistika
    const statsData = await $fetch(`${config.public.apiBase}/orders/stats/dashboard`, {
      headers: authStore.getAuthHeader()
    })
    stats.value = statsData
    
    // Oxirgi buyurtmalar
    const ordersData = await $fetch(`${config.public.apiBase}/orders?limit=5`, {
      headers: authStore.getAuthHeader()
    })
    recentOrders.value = ordersData.orders
  } catch (error) {
    console.error('Dashboard ma\'lumotlarini olishda xatolik:', error)
    if (error.status === 401) {
      authStore.logout()
      navigateTo('/admin/login')
    }
  } finally {
    loading.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const logout = () => {
  authStore.logout()
  navigateTo('/admin/login')
}

const getStatusClass = (status) => {
  const classes = {
    new: 'px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium',
    processing: 'px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium',
    delivered: 'px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium',
    canceled: 'px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium'
  }
  return classes[status] || classes.new
}

const getStatusText = (status) => {
  const texts = {
    new: 'Yangi',
    processing: 'Jarayonda',
    delivered: 'Yetkazildi',
    canceled: 'Bekor qilindi'
  }
  return texts[status] || status
}
</script>