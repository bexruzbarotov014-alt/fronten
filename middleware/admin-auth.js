// middleware/admin-auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  // Client-side da ishlatish
  if (process.client) {
    const authStore = useAuthStore()
    
    // LocalStorage'dan yuklash
    authStore.loadFromLocalStorage()
    
    // Agar authenticate bo'lmagan bo'lsa
    if (!authStore.isAuthenticated) {
      return navigateTo('/admin/login')
    }
  }
})