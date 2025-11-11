<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Savatcha</h1>
      
      <!-- Bo'sh savatcha -->
      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🛒</div>
        <h2 class="text-2xl font-semibold mb-2">Savatcha bo'sh</h2>
        <p class="text-gray-600 mb-6">Hozircha hech narsa qo'shilmagan</p>
        <NuxtLink 
          to="/catalog" 
          class="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Katalogga o'tish
        </NuxtLink>
      </div>
      
      <!-- To'ldirilgan savatcha -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Mahsulotlar ro'yxati -->
        <div class="lg:col-span-2 space-y-4">
          <div 
            v-for="item in cartStore.items" 
            :key="item._id"
            class="bg-white rounded-lg shadow-md p-4 flex gap-4"
          >
            <!-- Rasm -->
            <img 
              :src="item.images?.[0] || '/placeholder.jpg'" 
              :alt="item.name"
              class="w-24 h-24 object-cover rounded-lg"
            />
            
            <!-- Ma'lumotlar -->
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-1">{{ item.name }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ item.brand }}</p>
              <p class="text-sm text-gray-500">{{ item.volume }}ml • {{ item.alcoholPercent }}%</p>
              
              <div class="mt-3 flex items-center gap-4">
                <!-- Miqdor -->
                <div class="flex items-center border rounded-lg">
                  <button 
                    @click="cartStore.updateQuantity(item._id, item.quantity - 1)"
                    class="px-3 py-1 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span class="px-4 py-1 border-x">{{ item.quantity }}</span>
                  <button 
                    @click="cartStore.updateQuantity(item._id, item.quantity + 1)"
                    :disabled="item.quantity >= item.inStock"
                    class="px-3 py-1 hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                
                <!-- Narx -->
                <div class="flex-1 text-right">
                  <p v-if="item.discountPercent > 0" class="text-sm text-gray-400 line-through">
                    {{ formatPrice(item.price * item.quantity) }}
                  </p>
                  <p class="text-xl font-bold text-red-600">
                    {{ formatPrice(getItemTotal(item)) }}
                  </p>
                </div>
                
                <!-- O'chirish -->
                <button 
                  @click="cartStore.removeFromCart(item._id)"
                  class="text-red-600 hover:text-red-700 transition"
                  title="O'chirish"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Xulosa -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 class="text-xl font-semibold mb-4">Buyurtma xulosasi</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Mahsulotlar ({{ cartStore.totalItems }}):</span>
                <span>{{ formatPrice(cartStore.totalPrice) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Yetkazib berish:</span>
                <span class="text-green-600">Bepul</span>
              </div>
              <div class="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Jami:</span>
                <span class="text-red-600">{{ formatPrice(cartStore.totalPrice) }}</span>
              </div>
            </div>
            
            <NuxtLink 
              to="/checkout"
              class="block w-full bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Buyurtma berish
            </NuxtLink>
            
            <button 
              @click="cartStore.clearCart"
              class="block w-full mt-3 bg-gray-200 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Savatchani tozalash
            </button>
            
            <NuxtLink 
              to="/catalog"
              class="block w-full mt-3 text-center text-red-600 hover:underline"
            >
              ← Xaridni davom ettirish
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

// Cart'ni localStorage dan yuklash
onMounted(() => {
  cartStore.loadFromLocalStorage()
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}

const getItemTotal = (item) => {
  let price = item.price
  if (item.discountPercent > 0) {
    price = price - (price * item.discountPercent / 100)
  }
  return price * item.quantity
}
</script>