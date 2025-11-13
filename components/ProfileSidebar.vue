<template>
  <div class="p-4">
    <!-- User Info -->
    <div class="text-center mb-6">
      <div class="w-20 h-20 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
        <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h3 class="font-semibold text-lg">Foydalanuvchi</h3>
      <p class="text-sm text-gray-600">user@example.com</p>
    </div>
    
    <!-- Menu Items -->
    <nav class="space-y-1">
      <NuxtLink
        to="/profile"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        @click="$emit('close')"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>Profil</span>
      </NuxtLink>
      
      <NuxtLink
        to="/orders"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        @click="$emit('close')"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <span>Buyurtmalarim</span>
      </NuxtLink>
      
      <NuxtLink
        to="/favorites"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        @click="$emit('close')"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>Sevimlilar</span>
      </NuxtLink>
      
      <NuxtLink
        to="/addresses"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        @click="$emit('close')"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Manzillar</span>
      </NuxtLink>
      
      <NuxtLink
        to="/settings"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        @click="$emit('close')"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Sozlamalar</span>
      </NuxtLink>
      
      <button
        @click="toggleNotifications"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition w-full text-left"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span>Bildirishnomalar</span>
        <div class="ml-auto">
          <span
            :class="[
              'w-2 h-2 rounded-full',
              notificationsEnabled ? 'bg-green-500' : 'bg-gray-300'
            ]"
          ></span>
        </div>
      </button>
    </nav>
    
    <!-- Divider -->
    <div class="my-6 border-t"></div>
    
    <!-- Support -->
    <nav class="space-y-1 mb-6">
      <NuxtLink
        to="/help"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        @click="$emit('close')"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Yordam</span>
      </NuxtLink>
      
      <NuxtLink
        to="/about"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        @click="$emit('close')"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Biz haqimizda</span>
      </NuxtLink>
    </nav>
    
    <!-- Logout -->
    <button
      @click="logout"
      class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition text-red-600"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Chiqish</span>
    </button>
  </div>
</template>

<script setup>
const notificationsEnabled = ref(true)
const emit = defineEmits(['close'])

const toggleNotifications = () => {
  notificationsEnabled.value = !notificationsEnabled.value
}

const logout = () => {
  // Logout logic here
  if (confirm('Chiqishni xohlaysizmi?')) {
    // Clear auth state
    navigateTo('/login')
    emit('close')
  }
}
</script>
