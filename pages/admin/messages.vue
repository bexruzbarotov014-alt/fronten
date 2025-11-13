<template>
  <div class="min-h-screen bg-gray-50">
    <AdminHeader />

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <h1 class="text-3xl font-bold">Aloqa xabarlari</h1>
        <div class="flex flex-wrap gap-3">
          <div class="bg-white rounded-lg shadow-md px-4 py-3">
            <p class="text-sm text-gray-500">Javob berilmagan</p>
            <p class="text-xl font-semibold text-red-600">{{ pendingMessages.length }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md px-4 py-3">
            <p class="text-sm text-gray-500">Javob berilgan</p>
            <p class="text-xl font-semibold text-green-600">{{ answeredMessages.length }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Javob berilmagan xabarlar</h2>
            <button
              @click="fetchPendingMessages"
              class="text-sm text-gray-500 hover:text-red-600 transition flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M20 20v-5h-.581m-15.357-2a8.003 8.003 0 0115.357 2" />
              </svg>
              Yangilash
            </button>
          </div>

          <div v-if="loading.pending" class="py-8 text-center text-gray-500">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-3"></div>
            Yuklanmoqda...
          </div>

          <div v-else-if="pendingMessages.length === 0" class="py-8 text-center text-gray-500">
            Javob berilmagan xabarlar yo'q.
          </div>

          <div v-else class="space-y-4">
            <article
              v-for="message in pendingMessages"
              :key="message._id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <header class="mb-3">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-lg font-semibold text-gray-800">{{ message.subject }}</p>
                    <p class="text-sm text-gray-500">
                      {{ message.name }} • {{ message.email }} • {{ message.phone }}
                    </p>
                  </div>
                  <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                    Yangi
                  </span>
                </div>
                <p class="text-sm text-gray-400 mt-1">
                  {{ formatDate(message.createdAt) }}
                </p>
              </header>

              <p class="text-gray-700 whitespace-pre-line mb-4">
                {{ message.message }}
              </p>

              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">
                  Javobingiz
                </label>
                <textarea
                  v-model="responses[message._id]"
                  rows="4"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Mijozga yuboriladigan javobni yozing..."
                ></textarea>
                <div class="flex justify-end">
                  <button
                    @click="respondToMessage(message._id)"
                    :disabled="respondingId === message._id"
                    class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <svg v-if="respondingId !== message._id" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7M5 5h8a4 4 0 014 4v0" />
                    </svg>
                    <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M20 20v-5h-.581m-15.357-2a8.003 8.003 0 0115.357 2" />
                    </svg>
                    Javobni yuborish
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Javob berilgan xabarlar</h2>
            <button
              @click="fetchAnsweredMessages"
              class="text-sm text-gray-500 hover:text-red-600 transition flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M20 20v-5h-.581m-15.357-2a8.003 8.003 0 0115.357 2" />
              </svg>
              Yangilash
            </button>
          </div>

          <div v-if="loading.answered" class="py-8 text-center text-gray-500">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-3"></div>
            Yuklanmoqda...
          </div>

          <div v-else-if="answeredMessages.length === 0" class="py-8 text-center text-gray-500">
            Javob berilgan xabarlar yo'q.
          </div>

          <div v-else class="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
            <article
              v-for="message in answeredMessages"
              :key="message._id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <header class="mb-3">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-lg font-semibold text-gray-800">{{ message.subject }}</p>
                    <p class="text-sm text-gray-500">
                      {{ message.name }} • {{ message.email }} • {{ message.phone }}
                    </p>
                  </div>
                  <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
                    Javob berilgan
                  </span>
                </div>
                <p class="text-sm text-gray-400 mt-1">
                  {{ formatDate(message.createdAt) }}
                </p>
              </header>

              <p class="text-gray-700 whitespace-pre-line mb-4">
                {{ message.message }}
              </p>

              <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p class="text-sm text-gray-500 mb-2">
                  Admin javobi • {{ message.respondedBy || 'Admin' }} • {{ formatDate(message.respondedAt) }}
                </p>
                <p class="text-gray-800 whitespace-pre-line">
                  {{ message.response }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'

definePageMeta({
  middleware: 'admin-auth'
})

const config = useRuntimeConfig()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref({
  pending: true,
  answered: true
})

const pendingMessages = ref([])
const answeredMessages = ref([])
const responses = ref({})
const respondingId = ref(null)

onMounted(async () => {
  authStore.loadFromLocalStorage()

  if (!authStore.isAuthenticated) {
    navigateTo('/admin/login')
    return
  }

  await Promise.all([fetchPendingMessages(), fetchAnsweredMessages()])
})

const fetchPendingMessages = async () => {
  loading.value.pending = true
  try {
    const data = await $fetch(`${config.public.apiBase}/contact-messages?status=pending`, {
      headers: authStore.getAuthHeader()
    })
    pendingMessages.value = data.messages || []
    // Reset response fields for pending messages
    const responseState = {}
    pendingMessages.value.forEach((msg) => {
      responseState[msg._id] = responses.value[msg._id] || ''
    })
    responses.value = responseState
  } catch (error) {
    console.error('Javob berilmagan xabarlarni olishda xatolik:', error)
    toast.error('Javob berilmagan xabarlarni olishda xatolik yuz berdi')
  } finally {
    loading.value.pending = false
  }
}

const fetchAnsweredMessages = async () => {
  loading.value.answered = true
  try {
    const data = await $fetch(`${config.public.apiBase}/contact-messages?status=answered`, {
      headers: authStore.getAuthHeader()
    })
    answeredMessages.value = data.messages || []
  } catch (error) {
    console.error('Javob berilgan xabarlarni olishda xatolik:', error)
    toast.error('Javob berilgan xabarlarni olishda xatolik yuz berdi')
  } finally {
    loading.value.answered = false
  }
}

const respondToMessage = async (id) => {
  const responseText = responses.value[id]?.trim()

  if (!responseText) {
    toast.warning('Javob matnini kiriting')
    return
  }

  respondingId.value = id

  try {
    await $fetch(`${config.public.apiBase}/contact-messages/${id}/respond`, {
      method: 'PUT',
      headers: authStore.getAuthHeader(),
      body: { response: responseText }
    })

    toast.success('Javob muvaffaqiyatli yuborildi')
    responses.value[id] = ''
    await Promise.all([fetchPendingMessages(), fetchAnsweredMessages()])
  } catch (error) {
    console.error('Javob yuborishda xatolik:', error)
    const message = error?.data?.message || 'Javobni yuborishda xatolik yuz berdi'
    toast.error(message)
  } finally {
    respondingId.value = null
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('uz-UZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

