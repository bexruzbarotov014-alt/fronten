<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="container mx-auto px-4 py-12 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
    
    <div v-else-if="error" class="container mx-auto px-4 py-12 text-center">
      <p class="text-xl text-red-600">{{ error }}</p>
      <NuxtLink to="/catalog" class="text-blue-600 hover:underline mt-4 inline-block">
        Katalogga qaytish
      </NuxtLink>
    </div>
    
    <div v-else-if="product" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm slide-up">
        <ol class="flex items-center space-x-2">
          <li><NuxtLink to="/" class="text-gray-600 hover:text-red-600">Asosiy</NuxtLink></li>
          <li><span class="text-gray-400">/</span></li>
          <li><NuxtLink to="/catalog" class="text-gray-600 hover:text-red-600">Katalog</NuxtLink></li>
          <li><span class="text-gray-400">/</span></li>
          <li><NuxtLink :to="`/catalog?category=${product.category}`" class="text-gray-600 hover:text-red-600">
            {{ product.category }}
          </NuxtLink></li>
          <li><span class="text-gray-400">/</span></li>
          <li class="text-gray-900 font-medium">{{ product.name }}</li>
        </ol>
      </nav>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Rasmlar -->
        <div class="slide-up">
          <div class="bg-white rounded-lg shadow-md overflow-hidden mb-4 h-96">
            <ImageZoom
              :src="selectedImage"
              :alt="product?.name"
              :zoom="2.2"
              class="w-full h-full"
            />
          </div>
          
          <!-- Thumbnail rasmlar -->
          <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectImage(index, image)"
              :class="[
                'border-2 rounded-lg overflow-hidden transition hover-scale',
                currentImageIndex === index ? 'border-red-600' : 'border-gray-200 hover:border-gray-400'
              ]"
            >
              <img :src="image" :alt="`Rasm ${index + 1}`" class="w-full h-20 object-cover" />
            </button>
          </div>
        </div>
        
        <!-- Ma'lumotlar -->
        <div class="slide-up" style="animation-delay: 0.1s">
          <div class="bg-white rounded-lg shadow-md p-6">
            <!-- Brend -->
            <p class="text-gray-600 mb-2">{{ product.brand }}</p>
          
          <!-- Nom -->
          <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
          
          <!-- Kategoriya va xususiyatlar -->
          <div class="flex flex-wrap gap-3 mb-6">
            <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {{ product.category }}
            </span>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {{ product.volume }}ml
            </span>
            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {{ product.alcoholPercent }}% spirt
            </span>
          </div>
          
          <!-- Narx -->
          <div class="mb-6">
            <div v-if="product.discountPercent > 0" class="flex items-baseline gap-3">
              <span class="text-3xl font-bold text-red-600">
                {{ formatPrice(finalPrice) }}
              </span>
              <span class="text-xl text-gray-400 line-through">
                {{ formatPrice(product.price) }}
              </span>
              <span class="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                -{{ product.discountPercent }}%
              </span>
            </div>
            <div v-else>
              <span class="text-3xl font-bold text-red-600">
                {{ formatPrice(product.price) }}
              </span>
            </div>
          </div>
          
          <!-- Ombor holati -->
          <div class="mb-6">
            <p v-if="product.inStock > 0" class="text-green-600 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Omborda mavjud ({{ product.inStock }} dona)
            </p>
            <p v-else class="text-red-600 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              Omborda tugagan
            </p>
          </div>
          
          <!-- Miqdor va savatchaga qo'shish -->
          <div class="flex gap-4 mb-6">
            <div class="flex items-center border rounded-lg">
              <button 
                @click="decreaseQuantity"
                class="px-4 py-3 hover:bg-gray-100 transition"
                :disabled="quantity <= 1"
              >
                -
              </button>
              <input 
                v-model.number="quantity"
                type="number" 
                min="1"
                :max="product.inStock"
                class="w-16 text-center border-x py-3 focus:outline-none"
              />
              <button 
                @click="increaseQuantity"
                class="px-4 py-3 hover:bg-gray-100 transition"
                :disabled="quantity >= product.inStock"
              >
                +
              </button>
            </div>
            
            <button
              @click="addToCart"
              :disabled="product.inStock === 0"
              class="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ product.inStock === 0 ? 'Tugagan' : 'Savatchaga qo\'shish' }}
            </button>
          </div>
          
          <!-- Xususiyatlar jadvali -->
          <div class="border-t pt-6">
            <h3 class="font-semibold mb-4">Mahsulot xususiyatlari</h3>
            <dl class="space-y-3">
              <div class="flex justify-between">
                <dt class="text-gray-600">Kategoriya:</dt>
                <dd class="font-medium">{{ product.category }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600">Brend:</dt>
                <dd class="font-medium">{{ product.brand }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600">Hajm:</dt>
                <dd class="font-medium">{{ product.volume }}ml</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600">Spirt foizi:</dt>
                <dd class="font-medium">{{ product.alcoholPercent }}%</dd>
              </div>
            </dl>
          </div>
          </div>
        </div>
      </div>
      
      <!-- Tavsif -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8 slide-up" style="animation-delay: 0.2s">
        <h2 class="text-2xl font-bold mb-4">Mahsulot haqida</h2>
        <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ product.description }}</p>
      </div>
      
      <!-- O'xshash mahsulotlar -->
      <div v-if="similarProducts.length > 0" class="mb-8 slide-up" style="animation-delay: 0.3s">
        <h2 class="text-2xl font-bold mb-6">O'xshash mahsulotlar</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="item in similarProducts" 
            :key="item._id"
            :product="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useToast } from '~/composables/useToast'
import ImageZoom from '~/components/ImageZoom.vue'

const route = useRoute()
const config = useRuntimeConfig()
const cartStore = useCartStore()
const toast = useToast()

const defaultImage = 'https://via.placeholder.com/600x600?text=No+Image'

const product = ref(null)
const similarProducts = ref([])
const loading = ref(true)
const error = ref('')
const quantity = ref(1)
const selectedImage = ref('')
const currentImageIndex = ref(0)

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

const finalPrice = computed(() => {
  if (!product.value) return 0
  if (product.value.discountPercent > 0) {
    return product.value.price - (product.value.price * product.value.discountPercent / 100)
  }
  return product.value.price
})

onMounted(async () => {
  await fetchProduct()
  await fetchSimilarProducts()
})

const fetchProduct = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const data = await $fetch(`${config.public.apiBase}/products/${route.params.id}`)
    const normalizedImages = normalizeImages(data.images)
    product.value = { ...data, images: normalizedImages }
    
    selectedImage.value = normalizedImages[0] || defaultImage
    currentImageIndex.value = 0
  } catch (err) {
    console.error('Mahsulotni olishda xatolik:', err)
    error.value = 'Mahsulot topilmadi'
    toast.error('Mahsulotni yuklashda xatolik yuz berdi')
  } finally {
    loading.value = false
  }
}

const fetchSimilarProducts = async () => {
  if (!product.value) return
  
  try {
    const data = await $fetch(`${config.public.apiBase}/products?category=${product.value.category}&limit=4`)
    similarProducts.value = data.products
      .filter(p => p._id !== product.value._id)
      .map(p => ({
        ...p,
        images: normalizeImages(p.images)
      }))
  } catch (err) {
    console.error('O\'xshash mahsulotlarni olishda xatolik:', err)
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}

const selectImage = (index, image) => {
  currentImageIndex.value = index
  selectedImage.value = image
}

const increaseQuantity = () => {
  if (quantity.value < product.value.inStock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value.inStock > 0) {
    cartStore.addToCart(product.value, quantity.value)
    toast.success(`${quantity.value} ta mahsulot savatchaga qo'shildi!`)
    quantity.value = 1
  } else {
    toast.warning('Bu mahsulot omborda mavjud emas')
  }
}

// SEO
useHead({
  title: () => product.value ? `${product.value.name} - AlcoShop` : 'Mahsulot',
  meta: [
    {
      name: 'description',
      content: () => product.value?.description || 'Mahsulot tafsilotlari'
    }
  ]
})
</script>
