// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    admin: null,
    isAuthenticated: false
  }),
  
  actions: {
    // Login
    async login(username, password) {
      const config = useRuntimeConfig()
      
      try {
        const response = await $fetch(`${config.public.apiBase}/admin/login`, {
          method: 'POST',
          body: { username, password }
        })
        
        this.token = response.token
        this.admin = response.admin
        this.isAuthenticated = true
        
        // LocalStorage ga saqlash
        if (process.client) {
          localStorage.setItem('admin_token', response.token)
          localStorage.setItem('admin', JSON.stringify(response.admin))
        }
        
        return { success: true }
      } catch (error) {
        console.error('Login xatolik:', error)
        return { 
          success: false, 
          message: error.data?.message || 'Login xatolik yuz berdi' 
        }
      }
    },
    
    // Logout
    logout() {
      this.token = null
      this.admin = null
      this.isAuthenticated = false
      
      // LocalStorage dan o'chirish
      if (process.client) {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin')
      }
      
      // Admin sahifasidan chiqib ketish
      navigateTo('/')
    },
    
    // LocalStorage dan yuklash
    loadFromLocalStorage() {
      if (process.client) {
        const token = localStorage.getItem('admin_token')
        const admin = localStorage.getItem('admin')
        
        if (token && admin) {
          this.token = token
          this.admin = JSON.parse(admin)
          this.isAuthenticated = true
        }
      }
    },
    
    // Token bilan header qaytarish
    getAuthHeader() {
      return this.token ? { Authorization: `Bearer ${this.token}` } : {}
    }
  }
})