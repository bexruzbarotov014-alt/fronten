<template>
  <div v-if="showInstallPrompt" class="fixed bottom-20 left-4 right-4 z-40 md:hidden">
    <div class="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-sm">AlcoShop ilovasini o'rnatish</h3>
            <p class="text-xs text-gray-600">Tezkor kirish va offline rejim</p>
          </div>
        </div>
        <button
          @click="dismissPrompt"
          class="p-1 hover:bg-gray-100 rounded transition"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="flex gap-2">
        <button
          @click="installApp"
          class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition haptic-feedback"
        >
          O'rnatish
        </button>
        <button
          @click="dismissPrompt"
          class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
        >
          Keyinroq
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const deferredPrompt = ref(null)
const showInstallPrompt = ref(false)

// Listen for beforeinstallprompt event
const handleBeforeInstallPrompt = (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  // Stash the event so it can be triggered later
  deferredPrompt.value = e
  // Show the install banner
  showInstallPrompt.value = true
}

// Install the PWA
const installApp = async () => {
  if (!deferredPrompt.value) {
    return
  }
  
  // Show the install prompt
  deferredPrompt.value.prompt()
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.value.userChoice
  
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt.value = null
  
  // Hide the install banner
  showInstallPrompt.value = false
  
  // Log the result
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt')
    
    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([50, 50, 50])
    }
  } else {
    console.log('User dismissed the install prompt')
  }
}

// Dismiss the install prompt
const dismissPrompt = () => {
  showInstallPrompt.value = false
  
  // Save dismissal to localStorage
  if (process.client) {
    localStorage.setItem('pwa-install-dismissed', 'true')
  }
}

// Check if we should show the prompt
const checkShouldShowPrompt = () => {
  if (process.client) {
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    const installed = localStorage.getItem('pwa-installed')
    
    // Don't show if user dismissed or already installed
    if (!dismissed && !installed && !isStandalone()) {
      // Show after 3 seconds
      setTimeout(() => {
        showInstallPrompt.value = true
      }, 3000)
    }
  }
}

// Check if app is running in standalone mode
const isStandalone = () => {
  if (process.client) {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && window.navigator.standalone) ||
      document.referrer.includes('android-app://')
    )
  }
  return false
}

onMounted(() => {
  if (process.client) {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed')
      localStorage.setItem('pwa-installed', 'true')
      showInstallPrompt.value = false
    })
    
    // Check if we should show the prompt
    checkShouldShowPrompt()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }
})
</script>
