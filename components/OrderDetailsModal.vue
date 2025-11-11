<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold">Buyurtma tafsilotlari</h2>
          <p class="text-sm text-gray-600">{{ order.orderNumber }}</p>
        </div>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Buyurtma ma'lumotlari -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">Holat</p>
            <span :class="getStatusClass(order.status)">
              {{ getStatusText(order.status) }}
            </span>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">Sana</p>
            <p class="font-medium">{{ formatDate(order.createdAt) }}</p>
          </div>
        </div>
        
        <!-- Mijoz ma'lumotlari -->
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mijoz
          </h3>
          <div class="space-y-2">
            <div class="flex">
              <span class="text-gray-600 w-24">Ism:</span>
              <span class="font-medium">{{ order.customer.name }}</span>
            </div>
            <div class="flex">
              <span class="text-gray-600 w-24">Telefon:</span>
              <span class="font-medium">{{ order.customer.phone }}</span>
            </div>
            <div class="flex">
              <span class="text-gray-600 w-24">Manzil:</span>
              <span class="font-medium">{{ order.customer.address }}</span>
            </div>
            <div v-if="order.customer.comment" class="flex">
              <span class="text-gray-600 w-24">Izoh:</span>
              <span class="text-gray-700">{{ order.customer.comment }}</span>
            </div>
          </div>
        </div>
        
        <!-- Mahsulotlar -->
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Mahsulotlar
          </h3>
          <div class="space-y-3">
            <div 
              v-for="item in order.items" 
              :key="item._id"
              class="flex gap-4 pb-3 border-b last:border-b-0"
            >
              <img 
                :src="item.image || '/placeholder.jpg'" 
                :alt="item.name"
                class="w-20 h-20 object-cover rounded"
              />
              <div class="flex-1">
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-sm text-gray-600">
                  {{ item.quantity }} x {{ formatPrice(item.price) }}
                </p>
              </div>
              <div class="text-right">
                <p class="font-semibold">
                  {{ formatPrice(item.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Jami summa -->
        <div class="border-t pt-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-600">Mahsulotlar:</span>
            <span class="font-medium">{{ formatPrice(order.totalPrice) }}</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-600">Yetkazib berish:</span>
            <span class="text-green-600">Bepul</span>
          </div>
          <div class="flex justify-between items-center text-lg font-bold pt-2 border-t">
            <span>Jami:</span>
            <span class="text-red-600">{{ formatPrice(order.totalPrice) }}</span>
          </div>
        </div>
        
        <!-- Tugmalar -->
        <div class="flex gap-3">
          <button 
            @click="printOrder"
            class="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Chop etish
          </button>
          <button 
            @click="$emit('close')"
            class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const classes = {
    new: 'px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium inline-block',
    processing: 'px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block',
    delivered: 'px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium inline-block',
    canceled: 'px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium inline-block'
  }
  return classes[status] || classes.new
}

const getStatusText = (status) => {
  const texts = {
    new: 'Yangi',
    processing: 'Jarayonda',
    delivered: 'Yetkazildi',
    canceled: 'Bekor qilindi'
  }
  return texts[status] || status
}

const printOrder = () => {
  window.print()
}
</script>