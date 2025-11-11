<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 class="text-2xl font-bold">
          {{ product ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Nom -->
        <div>
          <label class="block text-sm font-medium mb-2">Mahsulot nomi *</label>
          <input 
            v-model="formData.name"
            type="text" 
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
            placeholder="Masalan: Cabernet Sauvignon"
          />
        </div>
        
        <!-- Brend -->
        <div>
          <label class="block text-sm font-medium mb-2">Brend *</label>
          <input 
            v-model="formData.brand"
            type="text" 
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
            placeholder="Masalan: Baron Philippe"
          />
        </div>
        
        <!-- Kategoriya -->
        <div>
          <label class="block text-sm font-medium mb-2">Kategoriya *</label>
          <select 
            v-model="formData.category"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
          >
            <option value="">Tanlang...</option>
            <option value="vino">Vino</option>
            <option value="pivo">Pivo</option>
            <option value="aroq">Aroq</option>
            <option value="viski">Viski</option>
            <option value="konyak">Konyak</option>
            <option value="likyor">Likyor</option>
            <option value="boshqa">Boshqa</option>
          </select>
        </div>
        
        <!-- Tavsif -->
        <div>
          <label class="block text-sm font-medium mb-2">Tavsif *</label>
          <textarea 
            v-model="formData.description"
            rows="3"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
            placeholder="Mahsulot haqida to'liq ma'lumot..."
          ></textarea>
        </div>
        
        <!-- Hajm va Spirt foizi -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Hajm (ml) *</label>
            <input 
              v-model.number="formData.volume"
              type="number" 
              required
              min="0"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
              placeholder="750"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Spirt foizi (%) *</label>
            <input 
              v-model.number="formData.alcoholPercent"
              type="number" 
              required
              min="0"
              max="100"
              step="0.1"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
              placeholder="12.5"
            />
          </div>
        </div>
        
        <!-- Narx va Chegirma -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Narx (UZS) *</label>
            <input 
              v-model.number="formData.price"
              type="number" 
              required
              min="0"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
              placeholder="100000"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Chegirma (%)</label>
            <input 
              v-model.number="formData.discountPercent"
              type="number" 
              min="0"
              max="100"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
              placeholder="0"
            />
          </div>
        </div>
        
        <!-- Ombor -->
        <div>
          <label class="block text-sm font-medium mb-2">Omborda (dona) *</label>
          <input 
            v-model.number="formData.inStock"
            type="number" 
            required
            min="0"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
            placeholder="50"
          />
        </div>
        
        <!-- Rasmlar yuklash -->
        <div>
          <label class="block text-sm font-medium mb-2">Rasmlar</label>
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*"
            multiple
            @change="handleFileChange"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
          />
          <p class="text-xs text-gray-500 mt-1">Maksimal 5 ta rasm, har biri 2MB gacha</p>
          
          <!-- Mavjud rasmlar -->
          <div v-if="formData.images && formData.images.length > 0" class="mt-4 grid grid-cols-4 gap-2">
            <div 
              v-for="(image, index) in formData.images" 
              :key="index"
              class="relative"
            >
              <img :src="image" :alt="`Rasm ${index + 1}`" class="w-full h-24 object-cover rounded" />
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Error -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
        
        <!-- Tugmalar -->
        <div class="flex gap-4 pt-4">
          <button 
            type="submit"
            :disabled="loading"
            class="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            <span v-if="loading">Saqlanmoqda...</span>
            <span v-else>Saqlash</span>
          </button>
          <button 
            type="button"
            @click="$emit('close')"
            class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const config = useRuntimeConfig()
const authStore = useAuthStore()
const toast = useToast()

const formData = ref({
  name: '',
  brand: '',
  category: '',
  description: '',
  volume: null,
  alcoholPercent: null,
  price: null,
  discountPercent: 0,
  inStock: 0,
  images: []
})

const fileInput = ref(null)
const selectedFiles = ref([])
const loading = ref(false)
const error = ref('')

onMounted(() => {
  if (props.product) {
    formData.value = { ...props.product }
  }
})

const handleFileChange = (event) => {
  const files = Array.from(event.target.files)
  
  if (files.length > 5) {
    toast.warning('Maksimal 5 ta rasm yuklash mumkin')
    return
  }
  
  selectedFiles.value = files
}

const removeImage = (index) => {
  formData.value.images.splice(index, 1)
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const method = props.product ? 'PUT' : 'POST'
    const url = props.product 
      ? `${config.public.apiBase}/products/${props.product._id}`
      : `${config.public.apiBase}/products`
    
    // FormData yaratish (fayllar bilan)
    const formDataToSend = new FormData()
    
    // Matnli ma'lumotlar
    Object.keys(formData.value).forEach(key => {
      if (key !== 'images' && formData.value[key] !== null && formData.value[key] !== undefined) {
        formDataToSend.append(key, formData.value[key])
      }
    })
    
    // Yangi rasmlar
    selectedFiles.value.forEach(file => {
      formDataToSend.append('images', file)
    })
    
    // Agar tahrirlash bo'lsa va mavjud rasmlar bo'lsa
    if (props.product && formData.value.images) {
      formData.value.images.forEach(img => {
        formDataToSend.append('existingImages', img)
      })
    }
    
    const response = await fetch(url, {
      method,
      headers: {
        ...authStore.getAuthHeader()
        // Content-Type ni qo'shmaslik kerak - browser avtomatik qo'shadi
      },
      body: formDataToSend
    })
    
    // Response text ni olish
    const responseText = await response.text()
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      // Agar JSON bo'lmasa, text sifatida ishlatish
      data = { message: responseText || 'Xatolik yuz berdi' }
    }
    
    if (!response.ok) {
      // Backend'dan kelgan xato xabarni ko'rsatish
      const errorMessage = data.error || data.message || 'Xatolik yuz berdi'
      throw new Error(errorMessage)
    }
    
    toast.success(props.product ? 'Mahsulot muvaffaqiyatli yangilandi' : 'Mahsulot muvaffaqiyatli qo\'shildi')
    emit('save')
  } catch (err) {
    console.error('Saqlashda xatolik:', err)
    error.value = err.message || 'Xatolik yuz berdi'
    // Xatoni foydalanuvchiga ko'rsatish
    toast.error('Xatolik: ' + err.message)
  } finally {
    loading.value = false
  }
}
</script>