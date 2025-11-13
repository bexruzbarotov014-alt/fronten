<template>
  <div class="relative">
    <!-- Asosiy rasm -->
    <div 
      ref="imageContainer"
      class="relative overflow-hidden bg-white rounded-lg cursor-zoom-in"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      @click="openLightbox"
    >
      <img 
        :src="src" 
        :alt="alt"
        class="w-full h-full object-contain transition-transform duration-200"
        :style="zoomStyle"
      />
      
      <!-- Zoom ko'rsatkichi -->
      <div 
        v-if="showZoomIndicator"
        class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
        Zoom
      </div>
    </div>
    
    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="lightboxOpen"
          class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          @click="closeLightbox"
        >
          <button 
            class="absolute top-4 right-4 text-white hover:text-gray-300 transition"
            @click="closeLightbox"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            class="relative max-w-7xl max-h-full"
            @click.stop
          >
            <img 
              :src="src" 
              :alt="alt"
              class="max-w-full max-h-[90vh] object-contain"
              :style="lightboxZoomStyle"
            />
            
            <!-- Zoom controls -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-90 rounded-lg px-4 py-2 flex items-center gap-4">
              <button 
                @click="zoomOut"
                class="hover:bg-gray-200 p-2 rounded transition"
                :disabled="lightboxZoom <= 1"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              
              <span class="text-sm font-medium min-w-[60px] text-center">
                {{ Math.round(lightboxZoom * 100) }}%
              </span>
              
              <button 
                @click="zoomIn"
                class="hover:bg-gray-200 p-2 rounded transition"
                :disabled="lightboxZoom >= 3"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
              
              <button 
                @click="resetZoom"
                class="hover:bg-gray-200 p-2 rounded transition text-sm"
              >
                Reset
              </button>
            </div>
            
            <!-- Navigation (agar ko'p rasmlar bo'lsa) -->
            <button 
              v-if="hasPrevious"
              @click="$emit('previous')"
              class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              v-if="hasNext"
              @click="$emit('next')"
              class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  zoomLevel: {
    type: Number,
    default: 1.5
  },
  hasPrevious: {
    type: Boolean,
    default: false
  },
  hasNext: {
    type: Boolean,
    default: false
  }
})

defineEmits(['previous', 'next'])

const imageContainer = ref(null)
const isZooming = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const showZoomIndicator = ref(false)
const lightboxOpen = ref(false)
const lightboxZoom = ref(1)

const zoomStyle = computed(() => {
  if (!isZooming.value) return {}
  
  return {
    transform: `scale(${props.zoomLevel})`,
    transformOrigin: `${mouseX.value}% ${mouseY.value}%`
  }
})

const lightboxZoomStyle = computed(() => ({
  transform: `scale(${lightboxZoom.value})`
}))

const handleMouseEnter = () => {
  showZoomIndicator.value = true
}

const handleMouseMove = (e) => {
  if (!imageContainer.value) return
  
  const rect = imageContainer.value.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  
  mouseX.value = x
  mouseY.value = y
  isZooming.value = true
}

const handleMouseLeave = () => {
  isZooming.value = false
  showZoomIndicator.value = false
}

const openLightbox = () => {
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  lightboxZoom.value = 1
  document.body.style.overflow = ''
}

const zoomIn = () => {
  if (lightboxZoom.value < 3) {
    lightboxZoom.value += 0.25
  }
}

const zoomOut = () => {
  if (lightboxZoom.value > 1) {
    lightboxZoom.value -= 0.25
  }
}

const resetZoom = () => {
  lightboxZoom.value = 1
}

// Keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e) => {
    if (!lightboxOpen.value) return
    
    if (e.key === 'Escape') closeLightbox()
    if (e.key === '+' || e.key === '=') zoomIn()
    if (e.key === '-') zoomOut()
    if (e.key === '0') resetZoom()
  }
  
  window.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.cursor-zoom-in {
  cursor: zoom-in;
}
</style>
