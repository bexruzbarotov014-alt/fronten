<template>
  <div class="mobile-card bg-white rounded-lg overflow-hidden hover-lift group">
    <NuxtLink :to="`/product/${product._id}`" class="block">
      <!-- Image with touch-friendly aspect ratio -->
      <div class="relative aspect-square bg-gray-200">
        <img 
          v-if="primaryImage"
          :src="primaryImage" 
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
          🍷
        </div>
        
        <!-- Badges -->
        <div 
          v-if="product.discountPercent > 0" 
          class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold"
        >
          -{{ product.discountPercent }}%
        </div>
        
        <div 
          v-if="product.inStock === 0" 
          class="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-bold"
        >
          Tugagan
        </div>
      </div>
    </NuxtLink>
    
    <!-- Content with better mobile spacing -->
    <div class="p-3">
      <NuxtLink :to="`/product/${product._id}`" class="block">
        <p class="text-xs text-gray-500 mb-1 truncate">{{ product.brand }}</p>
        <h3 class="text-sm font-semibold mb-2 hover:text-red-600 transition line-clamp-2 min-h-[2.5rem]">
          {{ product.name }}
        </h3>
      </NuxtLink>
      
      <!-- Product info -->
      <div class="flex items-center justify-between mb-2">
        <div class="text-xs text-gray-600">
          {{ product.volume }}ml • {{ product.alcoholPercent }}%
        </div>
      </div>
      
      <!-- Price -->
      <div class="mb-3">
        <div v-if="product.discountPercent > 0" class="flex items-baseline gap-2">
          <span class="text-lg font-bold text-red-600">
            {{ formatPrice(finalPrice) }}
          </span>
          <span class="text-xs text-gray-400 line-through">
            {{ formatPrice(product.price) }}
          </span>
        </div>
        <div v-else>
          <span class="text-lg font-bold text-red-600">
            {{ formatPrice(product.price) }}
          </span>
        </div>
      </div>
      
      <!-- Touch-friendly buttons -->
      <div class="flex gap-2">
        <button
          @click="addToCart"
          :disabled="product.inStock === 0"
          class="flex-1 btn-mobile bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center haptic-feedback"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="text-xs">{{ product.inStock === 0 ? 'Tugagan' : 'Qo\'shish' }}</span>
        </button>
        
        <NuxtLink 
          :to="`/product/${product._id}`"
          class="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

const normalizeImages = (images) => {
  if (!images) return []
  if (Array.isArray(images)) {
    return images.filter(Boolean)
  }

  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images)
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean)
      }
    } catch (e) {
      return [images]
    }
  }

  return []
}

const imageList = computed(() => normalizeImages(props.product?.images))
const primaryImage = computed(() => imageList.value[0] || '')

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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const addToCart = () => {
  if (props.product.inStock > 0) {
    cartStore.addToCart(props.product, 1)
    toast.success('Mahsulot savatchaga qo\'shildi!')
    
    // Add haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  } else {
    toast.warning('Bu mahsulot omborda mavjud emas')
  }
}
</script>
