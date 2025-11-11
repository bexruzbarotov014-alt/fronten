// composables/useConfirm.js
import { ref } from 'vue'

export const useConfirm = () => {
  const show = ref(false)
  const title = ref('Tasdiqlash')
  const message = ref('Bu amalni bajarmoqchimisiz?')
  const confirmText = ref('Tasdiqlash')
  const confirmType = ref('danger')
  let resolvePromise = null
  
  const confirm = (options = {}) => {
    return new Promise((resolve, reject) => {
      show.value = true
      title.value = options.title || 'Tasdiqlash'
      message.value = options.message || 'Bu amalni bajarmoqchimisiz?'
      confirmText.value = options.confirmText || 'Tasdiqlash'
      confirmType.value = options.type || 'danger'
      resolvePromise = resolve
    })
  }
  
  const handleConfirm = () => {
    show.value = false
    if (resolvePromise) {
      resolvePromise(true)
      resolvePromise = null
    }
  }
  
  const handleCancel = () => {
    show.value = false
    if (resolvePromise) {
      resolvePromise(false)
      resolvePromise = null
    }
  }
  
  return {
    show,
    title,
    message,
    confirmText,
    confirmType,
    confirm,
    handleConfirm,
    handleCancel
  }
}

