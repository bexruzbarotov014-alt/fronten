<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Desktop Header -->
    <Header class="hidden md:block" />
    
    <!-- Main Content -->
    <main class="md:mb-0 mb-16">
      <NuxtPage />
    </main>
    
    <!-- Desktop Footer -->
    <Footer class="hidden md:block" />
    
    <!-- Mobile Navigation -->
    <MobileNavigation />
    
    <!-- PWA Install Prompt -->
    <PWAInstallPrompt />
    
    <!-- Toast Notifications -->
    <Toast />
    
    <!-- Pull to Refresh Indicator -->
    <div
      ref="pullToRefresh"
      class="pull-to-refresh"
      :class="{ active: isPulling }"
    >
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Yangilash...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Initialize PWA service worker
const initServiceWorker = () => {
  if (process.client && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration)
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              if (confirm('Yangilangan versiya mavjud. Yangilashni xohlaysizmi?')) {
                window.location.reload()
              }
            }
          })
        })
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
  }
}

// Pull to refresh functionality
const pullToRefresh = ref(null)
const isPulling = ref(false)
const startY = ref(0)
const currentY = ref(0)

const handleTouchStart = (e) => {
  if (window.scrollY === 0) {
    startY.value = e.touches[0].clientY
  }
}

const handleTouchMove = (e) => {
  if (window.scrollY === 0 && startY.value) {
    currentY.value = e.touches[0].clientY
    const pullDistance = currentY.value - startY.value
    
    if (pullDistance > 0 && pullDistance < 150) {
      isPulling.value = true
      pullToRefresh.value.style.transform = `translateY(${pullDistance}px)`
    }
  }
}

const handleTouchEnd = () => {
  if (isPulling.value) {
    const pullDistance = currentY.value - startY.value
    
    if (pullDistance > 100) {
      // Trigger refresh
      window.location.reload()
    } else {
      // Reset
      isPulling.value = false
      pullToRefresh.value.style.transform = 'translateY(-60px)'
    }
    
    startY.value = 0
    currentY.value = 0
  }
}

// Handle online/offline status
const isOnline = ref(true)
const showOfflineToast = () => {
  if (!isOnline.value) {
    // Show offline notification
    const toast = useToast()
    toast.warning('Internet aloqasi yo\'q. Offline rejimda ishlamoqda.')
  }
}

// Initialize on mount
onMounted(() => {
  initServiceWorker()
  
  // Add pull to refresh listeners
  if (process.client) {
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    // Monitor online status
    isOnline.value = navigator.onLine
    window.addEventListener('online', () => {
      isOnline.value = true
      const toast = useToast()
      toast.success('Internet aloqasi tiklandi!')
    })
    
    window.addEventListener('offline', () => {
      isOnline.value = false
      showOfflineToast()
    })
  }
})

onUnmounted(() => {
  // Clean up listeners
  if (process.client) {
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }
})

// SEO
useHead({
  htmlAttrs: {
    lang: 'uz'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
    { name: 'theme-color', content: '#dc2626' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
  ]
})
</script>

<style>
/* Ensure proper mobile viewport */
html, body {
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

/* Better scrolling on iOS */
body {
  -webkit-overflow-scrolling: touch;
}

/* Remove default margins */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Smooth transitions */
* {
  transition: inherit;
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

/* Loading states */
.loading {
  pointer-events: none;
  opacity: 0.6;
}

/* Skeleton loading */
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #f8f8f8 40px,
    #f0f0f0 80px
  );
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}
</style>
