// Push Notifications composable
export const useNotifications = () => {
  const isSupported = ref(false)
  const permission = ref('default')
  const subscription = ref(null)
  const isSubscribed = ref(false)
  
  // Check if notifications are supported
  const checkSupport = () => {
    if (process.client) {
      isSupported.value = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
      if (isSupported.value) {
        permission.value = Notification.permission
      }
    }
  }
  
  // Request notification permission
  const requestPermission = async () => {
    if (!isSupported.value) {
      throw new Error('Push notifications are not supported')
    }
    
    try {
      const result = await Notification.requestPermission()
      permission.value = result
      
      if (result === 'granted') {
        await subscribeToPush()
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      throw error
    }
  }
  
  // Subscribe to push notifications
  const subscribeToPush = async () => {
    if (!isSupported.value || permission.value !== 'granted') {
      throw new Error('Notification permission not granted')
    }
    
    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js')
      
      // Subscribe to push
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NUXT_PUBLIC_VAPID_PUBLIC_KEY)
      })
      
      subscription.value = pushSubscription
      isSubscribed.value = true
      
      // Send subscription to server
      await sendSubscriptionToServer(pushSubscription)
      
      return pushSubscription
    } catch (error) {
      console.error('Error subscribing to push notifications:', error)
      throw error
    }
  }
  
  // Unsubscribe from push notifications
  const unsubscribeFromPush = async () => {
    if (!subscription.value) {
      return
    }
    
    try {
      await subscription.value.unsubscribe()
      subscription.value = null
      isSubscribed.value = false
      
      // Remove subscription from server
      await removeSubscriptionFromServer()
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error)
      throw error
    }
  }
  
  // Send local notification (for testing)
  const sendLocalNotification = (title, options = {}) => {
    if (permission.value === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      })
    }
  }
  
  // Send subscription to server
  const sendSubscriptionToServer = async (subscription) => {
    try {
      await $fetch('/api/notifications/subscribe', {
        method: 'POST',
        body: {
          subscription: JSON.parse(JSON.stringify(subscription))
        }
      })
    } catch (error) {
      console.error('Error sending subscription to server:', error)
    }
  }
  
  // Remove subscription from server
  const removeSubscriptionFromServer = async () => {
    try {
      await $fetch('/api/notifications/unsubscribe', {
        method: 'POST'
      })
    } catch (error) {
      console.error('Error removing subscription from server:', error)
    }
  }
  
  // Helper function to convert VAPID key
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    
    return outputArray
  }
  
  // Initialize
  onMounted(() => {
    checkSupport()
  })
  
  return {
    isSupported: readonly(isSupported),
    permission: readonly(permission),
    isSubscribed: readonly(isSubscribed),
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    sendLocalNotification
  }
}
