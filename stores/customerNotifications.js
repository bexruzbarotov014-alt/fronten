// stores/customerNotifications.js
import { defineStore } from 'pinia'

export const useCustomerNotificationStore = defineStore('customerNotifications', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    phone: null
  }),

  getters: {
    unreadNotifications: (state) => state.notifications.filter(n => !n.read),
    readNotifications: (state) => state.notifications.filter(n => n.read),
    orderNotifications: (state) => state.notifications.filter(n => n.type.startsWith('order_')),
    promotionNotifications: (state) => state.notifications.filter(n => n.type === 'promotion')
  },

  actions: {
    // Telefon raqamini o'rnatish
    setPhone(phone) {
      this.phone = phone
      if (process.client) {
        localStorage.setItem('customer_phone', phone)
      }
    },

    // Telefon raqamini localStorage dan yuklash
    loadPhone() {
      if (process.client) {
        const savedPhone = localStorage.getItem('customer_phone')
        if (savedPhone) {
          this.phone = savedPhone
        }
      }
    },

    // Bildirishnomalarni olish
    async fetchNotifications(page = 1, limit = 20) {
      if (!this.phone) {
        console.warn('Telefon raqami o\'rnatilmagan')
        return
      }

      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const response = await $fetch(`${config.public.apiBase}/notifications/phone/${this.phone}`, {
          query: { page, limit }
        })

        if (page === 1) {
          this.notifications = response.notifications
        } else {
          this.notifications.push(...response.notifications)
        }

        return response
      } catch (error) {
        console.error('Bildirishnomalarni olishda xatolik:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // O'qilmagan bildirishnomalar sonini olish
    async fetchUnreadCount() {
      if (!this.phone) return

      try {
        const config = useRuntimeConfig()
        const response = await $fetch(`${config.public.apiBase}/notifications/unread-count/phone/${this.phone}`)
        this.unreadCount = response.count
        return response.count
      } catch (error) {
        console.error('O\'qilmagan bildirishnomalar sonini olishda xatolik:', error)
        return 0
      }
    },

    // Bildirishnomani o'qilgan deb belgilash
    async markAsRead(notificationId) {
      if (!this.phone) return

      try {
        const config = useRuntimeConfig()
        await $fetch(`${config.public.apiBase}/notifications/${notificationId}/read`, {
          method: 'PATCH',
          body: { phone: this.phone }
        })

        // Local state ni yangilash
        const notification = this.notifications.find(n => n._id === notificationId)
        if (notification) {
          notification.read = true
          this.unreadCount = Math.max(0, this.unreadCount - 1)
        }
      } catch (error) {
        console.error('Bildirishnomani o\'qilgan deb belgilashda xatolik:', error)
        throw error
      }
    },

    // Barcha bildirishnomalarni o'qilgan deb belgilash
    async markAllAsRead() {
      if (!this.phone) return

      try {
        const config = useRuntimeConfig()
        await $fetch(`${config.public.apiBase}/notifications/mark-all-read`, {
          method: 'PATCH',
          body: { phone: this.phone }
        })

        // Local state ni yangilash
        this.notifications.forEach(n => n.read = true)
        this.unreadCount = 0
      } catch (error) {
        console.error('Barcha bildirishnomalarni o\'qilgan deb belgilashda xatolik:', error)
        throw error
      }
    },

    // Yangi bildirishnoma qo'shish (real-time uchun)
    addNotification(notification) {
      this.notifications.unshift(notification)
      if (!notification.read) {
        this.unreadCount++
      }
    },

    // Bildirishnomalarni tozalash
    clearNotifications() {
      this.notifications = []
      this.unreadCount = 0
    },

    // Buyurtma qabul qilinganda bildirishnoma qo'shish
    addOrderConfirmation(order) {
      const notification = {
        _id: `temp_${Date.now()}`,
        type: 'order_confirmed',
        title: 'Buyurtma qabul qilindi!',
        message: `Sizning #${order.orderNumber} raqamli buyurtmangiz muvaffaqiyatli qabul qilindi.`,
        data: {
          orderNumber: order.orderNumber,
          totalAmount: order.totalPrice
        },
        read: false,
        createdAt: new Date().toISOString()
      }

      this.addNotification(notification)
    },

    // Formatters
    formatTime(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diff = now - date
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (minutes < 1) return 'hozirgina'
      if (minutes < 60) return `${minutes} daqiqa oldin`
      if (hours < 24) return `${hours} soat oldin`
      return `${days} kun oldin`
    },

    formatPrice(price) {
      return new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 0
      }).format(price)
    }
  }
})
