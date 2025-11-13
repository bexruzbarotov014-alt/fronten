<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <!-- Icon -->
      <div class="mb-6">
        <div class="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      
      <!-- Title -->
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        Internet aloqasi yo'q
      </h1>
      
      <!-- Description -->
      <p class="text-gray-600 mb-8">
        Iltimos, internet aloqangizni tekshiring. Sahifani qayta yuklash orqali urinib ko'ring.
      </p>
      
      <!-- Actions -->
      <div class="space-y-3">
        <button
          @click="retryConnection"
          class="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Qayta urinish
        </button>
        
        <NuxtLink
          to="/"
          class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Asosiy sahifa
        </NuxtLink>
      </div>
      
      <!-- Cached content info -->
      <div class="mt-8 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm text-blue-800">
          <strong>Ma'lumot:</strong> Ba'zi sahifalar offline rejimda mavjud.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Retry connection
const retryConnection = () => {
  window.location.reload()
}

// SEO
useHead({
  title: 'Offline - AlcoShop',
  meta: [
    {
      name: 'description',
      content: 'Internet aloqasi yo\'q. Iltimos, aloqani tekshiring.'
    }
  ]
})
</script>
