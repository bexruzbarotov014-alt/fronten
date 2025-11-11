// composables/useToast.js
import { ref } from 'vue'

// Global state - barcha komponentlar uchun bir xil state
const toasts = ref([])

export const useToast = () => {
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type }
    
    toasts.value.push(toast)
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }
  
  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const success = (message, duration = 3000) => {
    return addToast(message, 'success', duration)
  }
  
  const error = (message, duration = 4000) => {
    return addToast(message, 'error', duration)
  }
  
  const warning = (message, duration = 3000) => {
    return addToast(message, 'warning', duration)
  }
  
  const info = (message, duration = 3000) => {
    return addToast(message, 'info', duration)
  }
  
  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}

