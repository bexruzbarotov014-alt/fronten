import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    items: [],
    counts: {
      newOrders: 0,
      pendingMessages: 0
    },
    loading: false
  }),

  getters: {
    unreadCount: (state) => state.items.filter(item => !item.read).length
  },

  actions: {
    async refresh() {
      const authStore = useAuthStore()

      if (!authStore.isAuthenticated) {
        this.items = []
        this.counts = { newOrders: 0, pendingMessages: 0 }
        return
      }

      const config = useRuntimeConfig()
      this.loading = true

      try {
        const [orderStats, messagesData] = await Promise.all([
          $fetch(`${config.public.apiBase}/orders/stats/dashboard`, {
            headers: authStore.getAuthHeader()
          }),
          $fetch(`${config.public.apiBase}/contact-messages?status=pending`, {
            headers: authStore.getAuthHeader()
          })
        ])

        this.counts.newOrders = orderStats?.newOrders || 0
        this.counts.pendingMessages = messagesData?.messages?.length || 0

        const existingMap = new Map(this.items.map(item => [item.id, item]))
        const nextItems = []
        const timestamp = new Date().toISOString()

        if (this.counts.newOrders > 0) {
          const existing = existingMap.get('orders')
          nextItems.push({
            id: 'orders',
            type: 'orders',
            titleKey: 'admin.notifications.ordersTitle',
            messageKey: 'admin.notifications.ordersMessage',
            meta: { count: this.counts.newOrders },
            read: existing?.read ?? false,
            createdAt: existing?.createdAt || timestamp
          })
        }

        if (this.counts.pendingMessages > 0) {
          const existing = existingMap.get('messages')
          nextItems.push({
            id: 'messages',
            type: 'messages',
            titleKey: 'admin.notifications.messagesTitle',
            messageKey: 'admin.notifications.messagesMessage',
            meta: { count: this.counts.pendingMessages },
            read: existing?.read ?? false,
            createdAt: existing?.createdAt || timestamp
          })
        }

        this.items = nextItems
      } catch (error) {
        console.error('Bildirishnomalarni olishda xatolik:', error)
      } finally {
        this.loading = false
      }
    },

    markAsRead(id) {
      this.items = this.items.map(item =>
        item.id === id ? { ...item, read: true } : item
      )
    },

    markAllAsRead() {
      this.items = this.items.map(item => ({ ...item, read: true }))
    },

    clear() {
      this.items = []
      this.counts = { newOrders: 0, pendingMessages: 0 }
    }
  }
})