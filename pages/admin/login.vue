<template>
  <div class="min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="text-6xl mb-4">🍷</div>
        <h1 class="text-3xl font-bold text-white mb-2">Admin Panel</h1>
        <p class="text-red-200">Tizimga kirish</p>
      </div>
      
      <!-- Login Card -->
      <div class="bg-white rounded-lg shadow-2xl p-8">
        <form @submit.prevent="handleLogin">
          <!-- Username -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input 
              v-model="formData.username"
              type="text" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Username kiriting"
              autocomplete="username"
            />
          </div>
          
          <!-- Password -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Parol
            </label>
            <div class="relative">
              <input 
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Parol kiriting"
                autocomplete="current-password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Error message -->
          <div v-if="error" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>
          
          <!-- Submit Button -->
          <button 
            type="submit"
            :disabled="loading"
            class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            <span v-if="loading">Yuklanmoqda...</span>
            <span v-else>Kirish</span>
          </button>
        </form>
        
        <!-- Back to home -->
        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-red-600 hover:text-red-700 text-sm">
            ← Asosiy sahifaga qaytish
          </NuxtLink>
        </div>
      </div>
      
      <!-- Info -->
      <div class="mt-6 text-center text-red-100 text-sm">
        <p>Default: username=admin, password=admin123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const result = await authStore.login(formData.value.username, formData.value.password)
    
    if (result.success) {
      // Muvaffaqiyatli kirish
      router.push('/admin')
    } else {
      error.value = result.message
    }
  } catch (err) {
    error.value = 'Tizimga kirishda xatolik yuz berdi'
  } finally {
    loading.value = false
  }
}

// Agar allaqachon login qilgan bo'lsa
onMounted(() => {
  authStore.loadFromLocalStorage()
  if (authStore.isAuthenticated) {
    router.push('/admin')
  }
})
</script>