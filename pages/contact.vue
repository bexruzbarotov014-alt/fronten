<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Biz bilan bog'laning</h1>
        <p class="text-xl text-gray-600">
          Savollaringiz yoki takliflaringiz bo'lsa, biz bilan bog'laning
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Aloqa ma'lumotlari -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Telefon -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-start">
              <div class="bg-red-100 p-3 rounded-full mr-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold mb-2">Telefon</h3>
                <p class="text-gray-600">+998 90 123 45 67</p>
                <p class="text-gray-600">+998 91 234 56 78</p>
                <p class="text-sm text-gray-500 mt-2">
                  Dush-Juma: 9:00 - 21:00<br/>
                  Shanba-Yakshanba: 10:00 - 20:00
                </p>
              </div>
            </div>
          </div>
          
          <!-- Email -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-start">
              <div class="bg-blue-100 p-3 rounded-full mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold mb-2">Email</h3>
                <p class="text-gray-600">info@alcoshop.uz</p>
                <p class="text-gray-600">support@alcoshop.uz</p>
                <p class="text-sm text-gray-500 mt-2">
                  24 soat ichida javob beramiz
                </p>
              </div>
            </div>
          </div>
          
          <!-- Manzil -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-start">
              <div class="bg-green-100 p-3 rounded-full mr-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold mb-2">Manzil</h3>
                <p class="text-gray-600">
                  Toshkent shahar,<br/>
                  Chilonzor tumani,<br/>
                  Bunyodkor ko'chasi, 10-uy
                </p>
              </div>
            </div>
          </div>
          
          <!-- Ijtimoiy tarmoqlar -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="font-semibold mb-4">Ijtimoiy tarmoqlar</h3>
            <div class="flex space-x-4">
              <a href="#" class="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a href="#" class="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.773 13.37l-2.91-.908c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.95z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Xabar yuborish formasi -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold mb-6">Xabar yuborish</h2>
            
            <form @submit.prevent="sendMessage">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium mb-2">
                    Ismingiz <span class="text-red-600">*</span>
                  </label>
                  <input 
                    v-model="formData.name"
                    type="text" 
                    required
                    class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Ismingiz"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">
                    Telefon raqam <span class="text-red-600">*</span>
                  </label>
                  <input 
                    v-model="formData.phone"
                    type="tel" 
                    required
                    class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>
              
              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">
                  Email <span class="text-red-600">*</span>
                </label>
                <input 
                  v-model="formData.email"
                  type="email" 
                  required
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              
              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">
                  Mavzu <span class="text-red-600">*</span>
                </label>
                <input 
                  v-model="formData.subject"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Xabar mavzusi"
                />
              </div>
              
              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">
                  Xabar <span class="text-red-600">*</span>
                </label>
                <textarea 
                  v-model="formData.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Xabaringizni yozing..."
                ></textarea>
              </div>
              
              <div v-if="successMessage" class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {{ successMessage }}
              </div>
              
              <div v-if="errorMessage" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {{ errorMessage }}
              </div>
              
              <button 
                type="submit"
                :disabled="loading"
                class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-semibold"
              >
                <span v-if="loading">Yuborilmoqda...</span>
                <span v-else>Xabar yuborish</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Xarita -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6 border-b">
          <h2 class="text-2xl font-bold">Bizning manzilimiz</h2>
        </div>
        <div class="h-96 bg-gray-200 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p class="text-gray-600">
              Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi, 10-uy
            </p>
            <p class="text-sm text-gray-500 mt-2">
              Bu yerda Google Maps joylashadi
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const sendMessage = () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''
  
  // Simulate sending
  setTimeout(() => {
    successMessage.value = 'Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.'
    loading.value = false
    
    // Reset form
    formData.value = {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    }
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }, 1500)
}

useHead({
  title: 'Biz bilan bog\'laning - AlcoShop',
  meta: [
    {
      name: 'description',
      content: 'AlcoShop bilan bog\'laning. Savollaringiz yoki takliflaringiz bo\'lsa, biz bilan bog\'laning.'
    }
  ]
})
</script>