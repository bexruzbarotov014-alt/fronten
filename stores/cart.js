// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  
  getters: {
    // Jami mahsulotlar soni
    totalItems: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    // Jami narx
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => {
        const price = item.discountPercent > 0 
          ? item.price - (item.price * item.discountPercent / 100)
          : item.price
        return sum + (price * item.quantity)
      }, 0)
    },
    
    // Savatchada mahsulot bormi tekshirish
    isInCart: (state) => (productId) => {
      return state.items.some(item => item._id === productId)
    },
    
    // Mahsulot miqdorini olish
    getItemQuantity: (state) => (productId) => {
      const item = state.items.find(item => item._id === productId)
      return item ? item.quantity : 0
    }
  },
  
  actions: {
    // Savatchaga mahsulot qo'shish
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item._id === product._id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          ...product,
          quantity
        })
      }
      
      this.saveToLocalStorage()
    },
    
    // Mahsulot miqdorini yangilash
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item._id === productId)
      
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
      
      this.saveToLocalStorage()
    },
    
    // Savatchadan mahsulotni o'chirish
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item._id === productId)
      
      if (index !== -1) {
        this.items.splice(index, 1)
      }
      
      this.saveToLocalStorage()
    },
    
    // Savatchani tozalash
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },
    
    // LocalStorage ga saqlash
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },
    
    // LocalStorage dan yuklash
    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('cart')
        if (saved) {
          this.items = JSON.parse(saved)
        }
      }
    }
  }
})