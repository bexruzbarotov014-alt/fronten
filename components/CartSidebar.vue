<template>
  <div class="p-4">
    <div v-if="cartStore.items.length === 0" class="text-center py-8">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="text-gray-600">Savatchangiz bo'sh</p>
      <NuxtLink
        to="/catalog"
        class="mt-4 inline-block bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
        @click="$emit('close')"
      >
        Katalogga o'tish
      </NuxtLink>
    </div>
    
    <div v-else>
      <!-- Cart Items -->
      <div class="space-y-3 mb-4 max-h-96 overflow-y-auto mobile-scroll">
        <div
          v-for="item in cartStore.items"
          :key="item._id"
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
        >
          <img
            :src="item.images?.[0] || 'https://via.placeholder.com/60x60'"
            :alt="item.name"
            class="w-16 h-16 object-cover rounded-lg"
          />
          
          <div class="flex-1">
            <h4 class="font-medium text-sm line-clamp-1">{{ item.name }}</h4>
            <p class="text-xs text-gray-600">{{ item.volume }}ml</p>
            <p class="text-sm font-semibold text-red-600">{{ formatPrice(item.price) }}</p>
          </div>
          
          <div class="flex items-center gap-2">
            <button
              @click="cartStore.updateQuantity(item._id, item.quantity - 1)"
              class="w-8 h-8 rounded-lg bg-white border hover:bg-gray-100 transition flex items-center justify-center"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            
            <span class="w-8 text-center text-sm font-medium">{{ item.quantity }}</span>
            
            <button
              @click="cartStore.updateQuantity(item._id, item.quantity + 1)"
              class="w-8 h-8 rounded-lg bg-white border hover:bg-gray-100 transition flex items-center justify-center"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <button
            @click="cartStore.removeFromCart(item._id)"
            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Total -->
      <div class="border-t pt-4 mb-4">
        <div class="flex justify-between items-center mb-4">
          <span class="font-semibold">Jami:</span>
          <span class="text-xl font-bold text-red-600">{{ formatPrice(cartStore.totalPrice) }}</span>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="space-y-2">
        <NuxtLink
          to="/cart"
          class="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center font-medium"
          @click="$emit('close')"
        >
          Savatchaga o'tish
        </NuxtLink>
        
        <button
          @click="cartStore.clearCart(); $emit('close')"
          class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition"
        >
          Savatchani bo'shatish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const emit = defineEmits(['close'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}
</script>
