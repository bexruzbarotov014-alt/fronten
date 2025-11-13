<template>
  <div class="p-4">
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      <p class="mt-2 text-gray-600">Yuklanmoqda...</p>
    </div>
    
    <div v-else-if="notificationStore.notifications.length === 0" class="text-center py-8">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <p class="text-gray-600">Bildirishnomalar yo'q</p>
    </div>
    
    <div v-else class="space-y-3 max-h-96 overflow-y-auto mobile-scroll">
      <div
        v-for="notification in notificationStore.notifications"
        :key="notification._id"
        class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        :class="{ 'border-l-4 border-red-500': !notification.read }"
        @click="markAsRead(notification._id)"
      >
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center',
                getNotificationStyle(notification.type).bg
              ]"
            >
              <svg
                :class="['w-5 h-5', getNotificationStyle(notification.type).text]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="notification.type === 'order_confirmed'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
                <path
                  v-else-if="notification.type === 'order_shipped'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
                <path
                  v-else-if="notification.type === 'order_delivered'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  v-else-if="notification.type === 'order_cancelled'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
                <path
                  v-else-if="notification.type === 'promotion'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h4 class="text-sm font-medium truncate">{{ notification.title }}</h4>
              <span class="text-xs text-gray-500">{{ notificationStore.formatTime(notification.createdAt) }}</span>
            </div>
            <p class="text-sm text-gray-600 line-clamp-2">{{ notification.message }}</p>
            
            <!-- Order details -->
            <div v-if="notification.data?.orderNumber" class="mt-2 text-xs text-gray-500">
              Buyurtma: #{{ notification.data.orderNumber }}
              <span v-if="notification.data.totalAmount" class="ml-2">
                • {{ notificationStore.formatPrice(notification.data.totalAmount) }}
              </span>
            </div>
            
            <div v-if="!notification.read" class="mt-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Yangi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Actions -->
    <div v-if="notificationStore.notifications.length > 0" class="mt-4 pt-4 border-t space-y-2">
      <button
        @click="markAllAsRead"
        :disabled="notificationStore.unreadCount === 0"
        class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition text-sm disabled:opacity-50"
      >
        Barchasini o'qilgan deb belgilash ({{ notificationStore.unreadCount }})
      </button>
      
      <button
        @click="refreshNotifications"
        class="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition text-sm"
      >
        Yangilash
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCustomerNotificationStore } from '~/stores/customerNotifications'

const notificationStore = useCustomerNotificationStore()
const loading = ref(false)
const emit = defineEmits(['close'])

onMounted(async () => {
  // Telefon raqamini yuklash
  notificationStore.loadPhone()
  
  if (notificationStore.phone) {
    loading.value = true
    try {
      await notificationStore.fetchNotifications()
      await notificationStore.fetchUnreadCount()
    } catch (error) {
      console.error('Bildirishnomalarni yuklashda xatolik:', error)
    } finally {
      loading.value = false
    }
  }
})

const getNotificationStyle = (type) => {
  const styles = {
    order_confirmed: { bg: 'bg-green-100', text: 'text-green-600' },
    order_shipped: { bg: 'bg-blue-100', text: 'text-blue-600' },
    order_delivered: { bg: 'bg-green-100', text: 'text-green-600' },
    order_cancelled: { bg: 'bg-red-100', text: 'text-red-600' },
    promotion: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    system: { bg: 'bg-gray-100', text: 'text-gray-600' }
  }
  
  return styles[type] || styles.system
}

const markAsRead = async (notificationId) => {
  try {
    await notificationStore.markAsRead(notificationId)
  } catch (error) {
    console.error('Bildirishnomani o\'qilgan deb belgilashda xatolik:', error)
  }
}

const markAllAsRead = async () => {
  try {
    await notificationStore.markAllAsRead()
  } catch (error) {
    console.error('Barcha bildirishnomalarni o\'qilgan deb belgilashda xatolik:', error)
  }
}

const refreshNotifications = async () => {
  loading.value = true
  try {
    await notificationStore.fetchNotifications()
    await notificationStore.fetchUnreadCount()
  } catch (error) {
    console.error('Bildirishnomalarni yangilashda xatolik:', error)
  } finally {
    loading.value = false
  }
}
</script>
