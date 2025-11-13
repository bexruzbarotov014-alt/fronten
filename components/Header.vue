<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-red-600 flex items-center">
          <span class="text-3xl mr-2">🍷</span>
          {{ t('brand.name') }}
        </NuxtLink>
        <LanguageSwitcher />
        <!-- Navigation -->
        <nav class="hidden md:flex space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-red-600 transition">
            {{ t('nav.home') }}
          </NuxtLink>
          <NuxtLink to="/catalog" class="text-gray-700 hover:text-red-600 transition">
            {{ t('nav.catalog') }}
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 hover:text-red-600 transition">
            {{ t('nav.about') }}
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 hover:text-red-600 transition">
            {{ t('nav.contact') }}
          </NuxtLink>
        </nav>
        
        <!-- Cart -->
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/cart" 
            class="relative flex items-center text-gray-700 hover:text-red-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span 
              v-if="cartStore.totalItems > 0" 
              class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.totalItems }}
            </span>
          </NuxtLink>
          
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
      <div v-if="mobileMenuOpen" class="md:hidden pb-4">
        <nav class="flex flex-col space-y-2">
          <NuxtLink 
            to="/" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            {{ t('nav.home') }}
          </NuxtLink>
          <NuxtLink 
            to="/catalog" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            {{ t('nav.catalog') }}
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            {{ t('nav.about') }}
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-gray-700 hover:text-red-600 transition py-2"
            @click="mobileMenuOpen = false"
          >
            {{ t('nav.contact') }}
          </NuxtLink>
        </nav>
      </div>
    </div>
    
    <!-- Toast notifications -->
    <Toast />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
import { useCartStore } from '~/stores/cart'

const { t } = useI18n()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)
</script>