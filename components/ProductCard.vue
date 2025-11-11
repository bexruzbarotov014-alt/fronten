<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
    <NuxtLink :to="`/product/${product._id}`">
      <!-- Rasm -->
      <div class="relative h-64 bg-gray-200">
        <img 
          v-if="product.images && product.images.length > 0"
          :src="product.images[0]" 
          :alt="product.name"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
          🍷
        </div>
        
        <!-- Chegirma badge -->
        <div 
          v-if="product.discountPercent > 0" 
          class="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold"
        >
          -{{ product.discountPercent }}%
        </div>
        
        <!-- Omborda yo'q badge -->
        <div 
          v-if="product.inStock === 0" 
          class="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold"
        >
          Tugagan
        </div>
      </div>
    </NuxtLink>
    
    <!-- Ma'lumotlar -->
    <div class="p-4">
      <NuxtLink :to="`/product/${product._id}`">
        <p class="text-sm text-gray-500 mb-1">{{ product.brand }}</p>
        <h3 class="text-lg font-semibold mb-2 hover:text-red-600 transition line-clamp-2">
          {{ product.name }}
        </h3>
      </NuxtLink>
      
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="text-sm text-gray-600">{{ product.volume }}ml • {{ product.alcoholPercent }}%</p>
        </div>
        <div class="text-right">
          <p v-if="product.discountPercent > 0" class="text-sm text-gray-400 line-through">
            {{ formatPrice(product.price) }}
          </p>
          <p class="text-xl font-bold text-red-600">
            {{ formatPrice(finalPrice) }}
          </p>
        </div>
      </div>
      
      <!-- Tugmalar -->
      <div class="flex space-x-2">
        <button
          @click="addToCart"
          :disabled="product.inStock === 0"
          class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {{ product.inStock === 0 ? 'Tugagan' : 'Savatga' }}
        </button>
        
        <NuxtLink 
          :to="`/product/${product._id}`"
          class="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useToast } from '~/composables/useToast'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const toast = useToast()

const finalPrice = computed(() => {
  if (props.product.discountPercent > 0) {
    return props.product.price - (props.product.price * props.product.discountPercent / 100)
  }
  return props.product.price
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}

const addToCart = () => {
  if (props.product.inStock > 0) {
    cartStore.addToCart(props.product, 1)
    toast.success('Mahsulot savatchaga qo\'shildi!')
  } else {
    toast.warning('Bu mahsulot omborda mavjud emas')
  }
}
</script>