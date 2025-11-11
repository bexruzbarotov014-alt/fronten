<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="handleCancel"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <!-- Header -->
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ title || 'Tasdiqlash' }}
          </h3>
        </div>
        
        <!-- Body -->
        <div class="px-6 py-4">
          <p class="text-gray-600">
            {{ message || 'Bu amalni bajarmoqchimisiz?' }}
          </p>
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-4 border-t flex justify-end gap-3">
          <button
            @click="handleCancel"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Bekor qilish
          </button>
          <button
            @click="handleConfirm"
            :class="[
              'px-4 py-2 text-white rounded-lg transition font-medium',
              confirmType === 'danger' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            {{ confirmText || 'Tasdiqlash' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { watch, onUnmounted } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Tasdiqlash'
  },
  message: {
    type: String,
    default: 'Bu amalni bajarmoqchimisiz?'
  },
  confirmText: {
    type: String,
    default: 'Tasdiqlash'
  },
  confirmType: {
    type: String,
    default: 'danger', // 'danger' yoki 'primary'
    validator: (value) => ['danger', 'primary'].includes(value)
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

// ESC tugmasini bosganda yopish
let escHandler = null

watch(() => props.show, (newVal) => {
  if (!process.client) return
  
  if (newVal) {
    escHandler = (e) => {
      if (e.key === 'Escape') {
        handleCancel()
      }
    }
    document.addEventListener('keydown', escHandler)
  } else if (escHandler) {
    document.removeEventListener('keydown', escHandler)
    escHandler = null
  }
})

onUnmounted(() => {
  if (process.client && escHandler) {
    document.removeEventListener('keydown', escHandler)
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>

