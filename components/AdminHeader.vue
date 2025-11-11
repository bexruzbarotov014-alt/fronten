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
            to="/admin/products" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Mahsulotlar
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
        </nav>
        
        <!-- User menu -->
        <div class="flex items-center space-x-4">
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
            to="/admin/products" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            Mahsulotlar
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
        </nav>
      </div>
    </div>
    
    <!-- Toast notifications -->
    <Toast />
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const config = useRuntimeConfig()

const showUserMenu = ref(false)
const mobileMenuOpen = ref(false)
const newOrdersCount = ref(0)

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
  // Yangi buyurtmalar sonini olish
  try {
    const data = await $fetch(`${config.public.apiBase}/orders/stats/dashboard`, {
      headers: authStore.getAuthHeader()
    })
    newOrdersCount.value = data.newOrders || 0
  } catch (error) {
    console.error('Statistika olishda xatolik:', error)
  }
})

const handleLogout = () => {
  authStore.logout()
  showUserMenu.value = false
}
</script>