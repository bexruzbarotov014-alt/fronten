<template>
  <Transition
    name="notification"
    tag="div"
    class="fixed top-4 right-4 z-50 pointer-events-none"
  >
    <div
      v-if="show"
      :class="[
        'pointer-events-auto max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all',
        typeClasses
      ]"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <component :is="iconComponent" class="h-6 w-6" />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">
              {{ title }}
            </p>
            <p v-if="message" class="mt-1 text-sm text-gray-500">
              {{ message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="close"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="showProgress"
        class="h-1 bg-gray-200"
      >
        <div
          :class="[
            'h-full transition-all ease-linear',
            progressColorClass
          ]"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 5000
  },
  showProgress: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const progress = ref(100)
const interval = ref(null)

const typeClasses = computed(() => {
  const classes = {
    success: 'border-l-4 border-green-400',
    error: 'border-l-4 border-red-400',
    warning: 'border-l-4 border-yellow-400',
    info: 'border-l-4 border-blue-400'
  }
  return classes[props.type] || classes.info
})

const progressColorClass = computed(() => {
  const classes = {
    success: 'bg-green-400',
    error: 'bg-red-400',
    warning: 'bg-yellow-400',
    info: 'bg-blue-400'
  }
  return classes[props.type] || classes.info
})

const iconComponent = computed(() => {
  const icons = {
    success: 'CheckCircleIcon',
    error: 'XCircleIcon',
    warning: 'ExclamationIcon',
    info: 'InformationCircleIcon'
  }
  return icons[props.type] || icons.info
})

const close = () => {
  emit('close')
}

onMounted(() => {
  if (props.show && props.duration > 0) {
    const step = 100 / (props.duration / 100)
    interval.value = setInterval(() => {
      progress.value -= step
      if (progress.value <= 0) {
        close()
      }
    }, 100)
  }
})

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})
</script>

<style scoped>
.notification-enter-active {
  transition: all 0.3s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
</style>
