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
            to="/admin/orders" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Buyurtmalar
          </NuxtLink>
          <NuxtLink 
            to="/admin/messages" 
            class="text-gray-700 hover:text-red-600 transition font-medium"
            active-class="text-red-600"
          >
            Xabarlar
          </NuxtLink>
        </nav>
        
        <!-- User menu -->
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/" 
            target="_blank"
            class="hidden md:block text-gray-700 hover:text-red-600 transition"
            title="Saytni ko'rish"
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
                A
              </div>
              <span class="hidden md:block font-medium">Admin</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown menu -->
            <div 
              v-if="showUserMenu"
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
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const showUserMenu = ref(false)

const handleLogout = () => {
  // Logout logic
  console.log('Logout clicked')
  showUserMenu.value = false
  navigateTo('/admin/login')
}
</script>
