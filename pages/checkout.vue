<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Buyurtma berish</h1>
      
      <!-- Savatcha bo'sh bo'lsa -->
      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <p class="text-xl text-gray-600 mb-4">Savatcha bo'sh</p>
        <NuxtLink to="/catalog" class="text-red-600 hover:underline">
          Katalogga qaytish →
        </NuxtLink>
      </div>
      
      <!-- Checkout forma -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Forma -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6">Yetkazib berish ma'lumotlari</h2>
            
            <form @submit.prevent="submitOrder" class="space-y-4">
              <!-- Ism -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  To'liq ism <span class="text-red-600">*</span>
                </label>
                <input 
                  v-model="formData.name"
                  type="text" 
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Ismingizni kiriting"
                />
              </div>
              
              <!-- Telefon -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  Telefon raqam <span class="text-red-600">*</span>
                </label>
                <input 
                  v-model="formData.phone"
                  type="tel" 
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="+998 90 123 45 67"
                />
              </div>
              
              <!-- Manzil -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  Yetkazib berish manzili <span class="text-red-600">*</span>
                </label>
                <textarea 
                  v-model="formData.address"
                  rows="3"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Shahar, ko'cha, uy raqami..."
                ></textarea>
              </div>
              
              <!-- Izoh -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  Qo'shimcha izoh (ixtiyoriy)
                </label>
                <textarea 
                  v-model="formData.comment"
                  rows="3"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Buyurtma bo'yicha qo'shimcha izoh..."
                ></textarea>
              </div>
              
              <!-- Xatolik xabari -->
              <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {{ error }}
              </div>
              
              <!-- Muvaffaqiyat xabari -->
              <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Buyurtma muvaffaqiyatli qabul qilindi! Buyurtma raqami: {{ orderNumber }}
              </div>
              
              <!-- Tugmalar -->
              <div class="flex gap-4 pt-4">
                <button 
                  type="submit"
                  :disabled="loading"
                  class="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  <span v-if="loading">Yuklanmoqda...</span>
                  <span v-else>Buyurtma berish</span>
                </button>
                
                <NuxtLink 
                  to="/cart"
                  class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Qaytish
                </NuxtLink>
              </div>
            </form>
          </div>
        </div>
        
        <!-- Buyurtma xulosasi -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 class="text-xl font-semibold mb-4">Buyurtma</h2>
            
            <!-- Mahsulotlar -->
            <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
              <div 
                v-for="item in cartStore.items" 
                :key="item._id"
                class="flex gap-3 pb-3 border-b"
              >
                <img 
                  :src="item.images?.[0] || '/placeholder.jpg'" 
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded"
                />
                <div class="flex-1">
                  <p class="text-sm font-medium line-clamp-2">{{ item.name }}</p>
                  <p class="text-xs text-gray-600">{{ item.quantity }} x {{ formatPrice(getFinalPrice(item)) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Narxlar -->
            <div class="space-y-2 border-t pt-4">
              <div class="flex justify-between text-gray-600">
                <span>Mahsulotlar:</span>
                <span>{{ formatPrice(cartStore.totalPrice) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Yetkazib berish:</span>
                <span class="text-green-600">Bepul</span>
              </div>
              <div class="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Jami:</span>
                <span class="text-red-600">{{ formatPrice(cartStore.totalPrice) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const config = useRuntimeConfig()
const cartStore = useCartStore()

// Cart'ni localStorage dan yuklash
onMounted(() => {
  cartStore.loadFromLocalStorage()
})

const formData = ref({
  name: '',
  phone: '',
  address: '',
  comment: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)
const orderNumber = ref('')

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}

const getFinalPrice = (item) => {
  let price = item.price
  if (item.discountPercent > 0) {
    price = price - (price * item.discountPercent / 100)
  }
  return price
}

const submitOrder = async () => {
  loading.value = true
  error.value = ''
  success.value = false
  orderNumber.value = ''
  
  // Validatsiya
  if (!formData.value.name || !formData.value.phone || !formData.value.address) {
    error.value = 'Iltimos, barcha majburiy maydonlarni to\'ldiring'
    loading.value = false
    return
  }
  
  if (cartStore.items.length === 0) {
    error.value = 'Savatcha bo\'sh'
    loading.value = false
    return
  }
  
  try {
    // Buyurtma ma'lumotlarini tayyorlash
    const orderData = {
      items: cartStore.items.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: getFinalPrice(item),
        image: item.images?.[0] || ''
      })),
      totalPrice: cartStore.totalPrice,
      customer: {
        name: formData.value.name.trim(),
        phone: formData.value.phone.trim(),
        address: formData.value.address.trim(),
        comment: (formData.value.comment || '').trim()
      }
    }
    
    console.log('📤 Buyurtma yuborilmoqda...', orderData)
    
    // Backend ga yuborish
    const response = await $fetch(`${config.public.apiBase}/orders`, {
      method: 'POST',
      body: orderData
    })
    
    console.log('✅ Buyurtma javobi:', response)
    
    // Muvaffaqiyatli
    if (response.order && response.order.orderNumber) {
      success.value = true
      orderNumber.value = response.order.orderNumber
      
      // Savatchani tozalash
      cartStore.clearCart()
      
      // Formani tozalash
      formData.value = {
        name: '',
        phone: '',
        address: '',
        comment: ''
      }
      
      // 3 sekunddan keyin asosiy sahifaga o'tish
      setTimeout(() => {
        navigateTo('/')
      }, 3000)
    } else {
      throw new Error('Buyurtma raqami olinmadi')
    }
    
  } catch (err) {
    console.error('❌ Buyurtma xatolik:', err)
    console.error('❌ Xatolik tafsilotlari:', err.data || err.message)
    
    // Xatolik xabarni ko'rsatish
    if (err.data?.message) {
      error.value = err.data.message
    } else if (err.message) {
      error.value = err.message
    } else if (err.data?.error) {
      error.value = err.data.error
    } else {
      error.value = 'Buyurtma berishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'
    }
  } finally {
    loading.value = false
  }
}
</script>