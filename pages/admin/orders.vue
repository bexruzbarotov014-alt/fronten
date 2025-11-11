<template>
  <div class="min-h-screen bg-gray-50">
    <AdminHeader />
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Buyurtmalar</h1>
      
      <!-- Filter -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Status</label>
            <select 
              v-model="filterStatus"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
              @change="fetchOrders"
            >
              <option value="">Barchasi</option>
              <option value="new">Yangi</option>
              <option value="processing">Jarayonda</option>
              <option value="delivered">Yetkazildi</option>
              <option value="canceled">Bekor qilindi</option>
            </select>
          </div>
          
          <div class="md:col-span-3 flex items-end">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buyurtma raqami yoki mijoz ismi..."
              class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
              @input="debouncedSearch"
            />
          </div>
        </div>
      </div>
      
      <!-- Buyurtmalar ro'yxati -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
        
        <div v-else-if="orders.length === 0" class="text-center py-12">
          <p class="text-gray-600">Buyurtmalar topilmadi</p>
        </div>
        
        <div v-else>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left py-3 px-4 font-medium">Buyurtma #</th>
                  <th class="text-left py-3 px-4 font-medium">Mijoz</th>
                  <th class="text-left py-3 px-4 font-medium">Mahsulotlar</th>
                  <th class="text-left py-3 px-4 font-medium">Summa</th>
                  <th class="text-left py-3 px-4 font-medium">Holat</th>
                  <th class="text-left py-3 px-4 font-medium">Sana</th>
                  <th class="text-left py-3 px-4 font-medium">Amallar</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="order in orders" 
                  :key="order._id"
                  class="border-b hover:bg-gray-50"
                >
                  <td class="py-3 px-4">
                    <p class="font-medium text-red-600">{{ order.orderNumber }}</p>
                  </td>
                  <td class="py-3 px-4">
                    <p class="font-medium">{{ order.customer.name }}</p>
                    <p class="text-sm text-gray-600">{{ order.customer.phone }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ order.customer.address }}</p>
                  </td>
                  <td class="py-3 px-4">
                    <p class="text-sm">{{ order.items.length }} ta mahsulot</p>
                    <button 
                      @click="viewOrderDetails(order)"
                      class="text-xs text-blue-600 hover:underline"
                    >
                      Batafsil ko'rish
                    </button>
                  </td>
                  <td class="py-3 px-4 font-semibold">
                    {{ formatPrice(order.totalPrice) }}
                  </td>
                  <td class="py-3 px-4">
                    <select 
                      :value="order.status"
                      @change="updateOrderStatus(order._id, $event.target.value)"
                      :class="getStatusSelectClass(order.status)"
                      class="px-3 py-1 rounded-full text-sm font-medium cursor-pointer border-none outline-none"
                    >
                      <option value="new">Yangi</option>
                      <option value="processing">Jarayonda</option>
                      <option value="delivered">Yetkazildi</option>
                      <option value="canceled">Bekor qilindi</option>
                    </select>
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-600">
                    {{ formatDate(order.createdAt) }}
                  </td>
                  <td class="py-3 px-4">
                    <button 
                      @click="viewOrderDetails(order)"
                      class="text-blue-600 hover:text-blue-700"
                      title="Ko'rish"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
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
      </div>
    </div>
    
    <!-- Order Details Modal -->
    <OrderDetailsModal 
      v-if="selectedOrder"
      :order="selectedOrder"
      @close="selectedOrder = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'

definePageMeta({
  middleware: 'admin-auth'
})

const config = useRuntimeConfig()
const authStore = useAuthStore()
const toast = useToast()

const orders = ref([])
const loading = ref(true)
const filterStatus = ref('')
const searchQuery = ref('')
const selectedOrder = ref(null)
const pagination = ref({
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1
})

let searchTimeout = null

onMounted(() => {
  fetchOrders()
})

const fetchOrders = async () => {
  loading.value = true
  
  try {
    const params = new URLSearchParams({
      page: pagination.value.page,
      limit: pagination.value.limit
    })
    
    if (filterStatus.value) {
      params.append('status', filterStatus.value)
    }
    
    const data = await $fetch(`${config.public.apiBase}/orders?${params}`, {
      headers: authStore.getAuthHeader()
    })
    
    orders.value = data.orders
    pagination.value = data.pagination
  } catch (error) {
    console.error('Buyurtmalarni olishda xatolik:', error)
    if (error.status === 401) {
      authStore.logout()
      navigateTo('/admin/login')
    }
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    fetchOrders()
  }, 500)
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.page = page
    fetchOrders()
  }
}

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await $fetch(`${config.public.apiBase}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: authStore.getAuthHeader(),
      body: { status: newStatus }
    })
    
    toast.success('Buyurtma holati yangilandi')
    // Ro'yxatni yangilash
    fetchOrders()
  } catch (error) {
    console.error('Statusni yangilashda xatolik:', error)
    toast.error(error.data?.message || 'Buyurtma holatini yangilashda xatolik yuz berdi')
  }
}

const viewOrderDetails = (order) => {
  selectedOrder.value = order
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

const getStatusSelectClass = (status) => {
  const classes = {
    new: 'bg-orange-100 text-orange-800',
    processing: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800'
  }
  return classes[status] || classes.new
}
</script>