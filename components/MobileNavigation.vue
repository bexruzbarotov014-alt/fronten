<template>
  <div class="md:hidden">
    <!-- Bottom Navigation -->
    <nav class="mobile-nav bg-white border-t border-gray-200">
      <div class="flex justify-around items-center">
        <NuxtLink
          to="/"
          class="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition"
          :class="{ 'text-red-600': $route.path === '/' }"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs">Asosiy</span>
        </NuxtLink>
        
        <NuxtLink
          to="/catalog"
          class="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition"
          :class="{ 'text-red-600': $route.path === '/catalog' }"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span class="text-xs">Katalog</span>
        </NuxtLink>
        
        <button
          @click="toggleCart"
          class="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition relative"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="text-xs">Savatcha</span>
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </button>
        
        <button
          @click="toggleNotifications"
          class="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition relative"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="text-xs">Bildirishnomalar</span>
          <span
            v-if="notificationCount > 0"
            class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ notificationCount }}
          </span>
        </button>
        
        <button
          @click="toggleProfile"
          class="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs">Profil</span>
        </button>
      </div>
    </nav>
    
    <!-- Mobile Cart Sidebar -->
    <Transition name="slide-right">
      <div
        v-if="showCart"
        class="fixed inset-0 z-[60] flex"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          @click="toggleCart"
        ></div>
        <div class="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto mobile-scroll">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold">Savatcha</h3>
            <button
              @click="toggleCart"
              class="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <CartSidebar @close="toggleCart" />
        </div>
      </div>
    </Transition>
    
    <!-- Mobile Notifications Sidebar -->
    <Transition name="slide-right">
      <div
        v-if="showNotifications"
        class="fixed inset-0 z-50 flex"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          @click="toggleNotifications"
        ></div>
        <div class="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto mobile-scroll">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold">Bildirishnomalar</h3>
            <button
              @click="toggleNotifications"
              class="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <NotificationList @close="toggleNotifications" />
        </div>
      </div>
    </Transition>
    
    <!-- Mobile Profile Sidebar -->
    <Transition name="slide-right">
      <div
        v-if="showProfile"
        class="fixed inset-0 z-50 flex"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          @click="toggleProfile"
        ></div>
        <div class="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto mobile-scroll">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold">Profil</h3>
            <button
              @click="toggleProfile"
              class="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ProfileSidebar @close="toggleProfile" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useCustomerNotificationStore } from '~/stores/customerNotifications'

const cartStore = useCartStore()
const notificationStore = useCustomerNotificationStore()

const showCart = ref(false)
const showNotifications = ref(false)
const showProfile = ref(false)
const cartCount = computed(() => cartStore.totalItems)
const notificationCount = computed(() => notificationStore.unreadCount)

// Bildirishnomalar sonini yuklash
onMounted(async () => {
  notificationStore.loadPhone()
  if (notificationStore.phone) {
    try {
      await notificationStore.fetchUnreadCount()
    } catch (error) {
      console.error('Bildirishnomalar sonini yuklashda xatolik:', error)
    }
  }
})

const toggleCart = () => {
  console.log('Cart toggle clicked', showCart.value)
  showCart.value = !showCart.value
  if (showCart.value) {
    showNotifications.value = false
    showProfile.value = false
  }
  console.log('Cart is now:', showCart.value)
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    showCart.value = false
    showProfile.value = false
  }
}

const toggleProfile = () => {
  showProfile.value = !showProfile.value
  if (showProfile.value) {
    showCart.value = false
    showNotifications.value = false
  }
}
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
