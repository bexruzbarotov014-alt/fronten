<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <NuxtLink to="/admin" class="text-2xl font-bold text-red-600 flex items-center">
          <span class="text-3xl mr-2">🍷</span>
          Admin Panel
        </NuxtLink>
        
        <!-- Navigation -->
        <nav class="hidden md:flex space-x-6">
          <NuxtLink 
            to="/admin" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/admin/analytics" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Analytics
          </NuxtLink>
          <NuxtLink 
            to="/admin/products" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Mahsulotlar
          </NuxtLink>
          <NuxtLink 
            to="/admin/promocodes" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Promo kodlar
          </NuxtLink>
          <NuxtLink 
            to="/admin/orders" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Buyurtmalar
            <span v-if="newOrdersCount > 0" class="ml-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {{ newOrdersCount }}
            </span>
          </NuxtLink>
          <NuxtLink 
            to="/admin/messages" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Xabarlar
            <span v-if="pendingMessagesCount > 0" class="ml-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
              {{ pendingMessagesCount }}
            </span>
          </NuxtLink>
        </nav>
        
        <!-- User menu -->
        <div class="flex items-center space-x-4">
          <LanguageSwitcher class="hidden md:block" />
          <NuxtLink 
            to="/" 
            target="_blank"
            class="hidden md:block text-gray-700 hover:text-red-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </NuxtLink>

          <div class="relative">
            <button
              @click="toggleNotifications"
              class="relative text-gray-700 hover:text-red-600 transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span 
                v-if="notificationStore.unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ notificationStore.unreadCount }}
              </span>
            </button>

            <div 
              v-if="showNotifications"
              v-click-outside="() => showNotifications = false"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
            >
              <div class="flex items-center justify-between px-4 py-3 border-b">
                <h3 class="text-sm font-semibold text-gray-800">{{ t('admin.notifications.title') }}</h3>
                <button
                  v-if="notificationStore.items.length > 0"
                  @click="markAllNotifications"
                  class="text-xs text-red-600 hover:underline"
                >
                  {{ t('admin.notifications.markAll') }}
                </button>
              </div>

              <div v-if="notificationStore.loading" class="px-4 py-6 text-center text-gray-500">
                <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mb-3"></div>
                {{ t('actions.loading') }}
              </div>

              <div v-else-if="notificationStore.items.length === 0" class="px-4 py-6 text-center text-gray-500">
                {{ t('admin.notifications.empty') }}
              </div>

              <ul v-else class="divide-y">
                <li
                  v-for="item in notificationStore.items"
                  :key="item.id"
                  :class="['px-4 py-3 space-y-2', item.read ? 'bg-white' : 'bg-red-50/70']"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-sm font-semibold text-gray-800">{{ t(item.titleKey) }}</p>
                      <p class="text-sm text-gray-600">
                        {{ t(item.messageKey, item.meta) }}
                      </p>
                    </div>
                    <span class="text-xs text-gray-400 whitespace-nowrap">
                      {{ formatRelativeTime(item.createdAt) }}
                    </span>
                  </div>
                  <button
                    v-if="!item.read"
                    @click="markNotificationAsRead(item.id)"
                    class="text-xs text-red-600 hover:underline"
                  >
                    {{ t('admin.notifications.markAsRead') }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="relative">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition"
            >
              <div class="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                {{ authStore.admin?.username?.charAt(0).toUpperCase() }}
              </div>
              <span class="hidden md:block font-medium">{{ authStore.admin?.username }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown menu -->
            <div 
              v-if="showUserMenu"
              v-click-outside="() => showUserMenu = false"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <button 
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Chiqish
              </button>
            </div>
          </div>
          
          <!-- Mobile menu button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4 border-t">
        <nav class="flex flex-col space-y-2 pt-4">
          <NuxtLink 
            to="/admin" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/admin/analytics" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            Analytics
          </NuxtLink>
          <NuxtLink 
            to="/admin/products" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            Mahsulotlar
          </NuxtLink>
          <NuxtLink 
            to="/admin/promocodes" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            Promo kodlar
          </NuxtLink>
          <NuxtLink 
            to="/admin/orders" 
            class="text-gray-700 hover:text-red-600 transition py-2 flex items-center"
            @click="mobileMenuOpen = false"
          >
            Buyurtmalar
            <span v-if="newOrdersCount > 0" class="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {{ newOrdersCount }}
            </span>
          </NuxtLink>
          <NuxtLink 
            to="/admin/messages" 
            class="text-gray-700 hover:text-red-600 transition py-2 flex items-center"
            @click="mobileMenuOpen = false"
          >
            Xabarlar
            <span v-if="pendingMessagesCount > 0" class="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
              {{ pendingMessagesCount }}
            </span>
          </NuxtLink>
        </nav>
      </div>
    </div>
    
    <!-- Toast notifications -->
    <Toast />
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'
import { useNotificationStore } from '~/stores/notifications'

import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const { t, locale } = useI18n()

const showUserMenu = ref(false)
const showNotifications = ref(false)
const mobileMenuOpen = ref(false)

const newOrdersCount = computed(() => notificationStore.counts.newOrders || 0)
const pendingMessagesCount = computed(() => notificationStore.counts.pendingMessages || 0)

// Click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

onMounted(async () => {
  authStore.loadFromLocalStorage()
  await notificationStore.refresh()
})

const handleLogout = () => {
  authStore.logout()
  showUserMenu.value = false
}

const toggleNotifications = async () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    await notificationStore.refresh()
  }
}

const markNotificationAsRead = (id) => {
  notificationStore.markAsRead(id)
}

const markAllNotifications = () => {
  notificationStore.markAllAsRead()
}

const relativeFormatter = computed(
  () => new Intl.RelativeTimeFormat(locale.value, { numeric: 'auto' })
)

const formatRelativeTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const diffMs = date.getTime() - Date.now()
  const minutes = Math.round(diffMs / 60000)

  if (Math.abs(minutes) < 60) {
    return relativeFormatter.value.format(minutes || 0, 'minute')
  }

  const hours = Math.round(diffMs / 3600000)
  if (Math.abs(hours) < 24) {
    return relativeFormatter.value.format(hours, 'hour')
  }

  const days = Math.round(diffMs / 86400000)
  return relativeFormatter.value.format(days, 'day')
}
</script>