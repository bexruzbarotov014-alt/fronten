<template>
  <div ref="container" class="relative">
    <button
      type="button"
      @click="toggleDropdown"
      class="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span class="uppercase font-medium text-sm">
        {{ currentLocaleLabel }}
      </span>
      
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition name="fade">
      <div
        v-if="showDropdown"
        class="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 min-w-[8rem]"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          type="button"
          @click="selectLocale(loc.code)"
          :class="[
            'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition',
            locale.value === loc.code ? 'bg-gray-50 font-semibold text-red-600' : 'text-gray-700'
          ]"
        >
          {{ loc.name || loc.code.toUpperCase() }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const STORAGE_KEY = 'alcoshop-locale'

const { locale, locales, setLocale } = useI18n()

const showDropdown = ref(false)
const container = ref(null)

const availableLocales = computed(() => locales.value ?? [])

const currentLocaleLabel = computed(() => {
  const match = availableLocales.value.find((item) => item.code === locale.value)
  return match?.name || locale.value.toUpperCase()
})

const closeDropdown = () => {
  showDropdown.value = false
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleOutsideClick = (event) => {
  if (!container.value) return
  if (!container.value.contains(event.target)) {
    closeDropdown()
  }
}

const applyLocale = (code) => {
  if (code === locale.value) return
  setLocale(code)
  if (process.client) {
    localStorage.setItem(STORAGE_KEY, code)
  }
}

const selectLocale = (code) => {
  applyLocale(code)
  closeDropdown()
}

onMounted(() => {
  if (process.client) {
    const savedLocale = localStorage.getItem(STORAGE_KEY)
    if (savedLocale && availableLocales.value.some((item) => item.code === savedLocale)) {
      applyLocale(savedLocale)
    }
    document.addEventListener('click', handleOutsideClick)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    document.removeEventListener('click', handleOutsideClick)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
