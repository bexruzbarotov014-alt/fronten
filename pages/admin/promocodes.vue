<template>
  <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold">Promo kodlar</h1>
          <p class="text-gray-500 mt-1">Chegirma kodlarini yarating, boshqaring va monitoring qiling</p>
        </div>
        <button
          @click="fetchPromos"
          :disabled="loading"
          class="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition disabled:opacity-50"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M20 20v-5h-.581m-15.357-2a8.003 8.003 0 0115.357 2" />
          </svg>
          Yangilash
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section class="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <header class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Promo kodlar ro'yxati</h2>
            <span class="text-sm text-gray-500">Jami: {{ promos.length }}</span>
          </header>

          <div v-if="loading" class="py-12 text-center text-gray-500">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-3"></div>
            Ma'lumotlar yuklanmoqda...
          </div>

          <div v-else-if="promos.length === 0" class="py-12 text-center text-gray-500 border-2 border-dashed rounded-lg">
            Promo kodlar mavjud emas. Yangi promo kod yarating.
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left text-sm font-medium text-gray-500 px-4 py-3">Kod</th>
                  <th class="text-left text-sm font-medium text-gray-500 px-4 py-3">Chegirma</th>
                  <th class="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                  <th class="text-left text-sm font-medium text-gray-500 px-4 py-3">Foydalanish</th>
                  <th class="text-right text-sm font-medium text-gray-500 px-4 py-3">Amallar</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="promo in promos" :key="promo._id" class="hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <div class="font-semibold text-gray-800 uppercase">{{ promo.code }}</div>
                    <div class="text-xs text-gray-500">{{ promo.description || 'Tavsif yo\'q' }}</div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="text-sm text-gray-700">
                      <span v-if="promo.discountType === 'percentage'">{{ promo.discountValue }}%</span>
                      <span v-else>{{ formatPrice(promo.discountValue) }}</span>
                    </div>
                    <div v-if="promo.maxDiscountAmount" class="text-xs text-gray-500">
                      Maks: {{ formatPrice(promo.maxDiscountAmount) }}
                    </div>
                    <div v-if="promo.minOrderTotal" class="text-xs text-gray-500">
                      Min buyurtma: {{ formatPrice(promo.minOrderTotal) }}
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span
                      :class="promo.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'"
                      class="text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      {{ promo.isActive ? 'Faol' : 'Nofaol' }}
                    </span>
                    <div v-if="promo.expiresAt" class="text-xs text-gray-500 mt-1">
                      Amal qiladi: {{ formatDate(promo.expiresAt) }}
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    {{ promo.usageCount }} {{ promo.usageLimit ? `/ ${promo.usageLimit}` : '' }}
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="flex justify-end gap-2">
                      <button
                        @click="toggleStatus(promo)"
                        class="text-sm px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                      >
                        {{ promo.isActive ? 'O‘chirish' : 'Faollashtirish' }}
                      </button>
                      <button
                        @click="editPromo(promo)"
                        class="text-sm px-3 py-1 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                      >
                        Tahrirlash
                      </button>
                      <button
                        @click="deletePromo(promo)"
                        :disabled="deletingId === promo._id"
                        class="text-sm px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                      >
                        {{ deletingId === promo._id ? 'O‘chirilmoqda...' : 'O‘chirish' }}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">
            {{ editingId ? 'Promo kodni tahrirlash' : 'Yangi promo kod' }}
          </h2>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Promo kod *</label>
              <input
                v-model="form.code"
                type="text"
                required
                class="w-full px-4 py-2 border rounded-lg uppercase focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="SALE50"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Tavsif</label>
              <textarea
                v-model="form.description"
                rows="2"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Promo kod haqida qisqacha ma'lumot..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Chegirma turi *</label>
                <select
                  v-model="form.discountType"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="percentage">Foiz (% da)</option>
                  <option value="fixed">Fiks (so'm)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Chegirma qiymati *</label>
                <input
                  v-model.number="form.discountValue"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="10"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Minimal buyurtma (so'm)</label>
                <input
                  v-model.number="form.minOrderTotal"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Maksimal chegirma (so'm)</label>
                <input
                  v-model.number="form.maxDiscountAmount"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Cheksiz"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Foydalanish limiti</label>
                <input
                  v-model.number="form.usageLimit"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Cheksiz"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Amal qilish muddati</label>
                <input
                  v-model="form.expiresAt"
                  type="date"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
            </div>

            <div class="flex items-center gap-2">
              <input
                id="promo-active"
                v-model="form.isActive"
                type="checkbox"
                class="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label for="promo-active" class="text-sm text-gray-700">Promo kod faol</label>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                <span v-if="saving">Saqlanmoqda...</span>
                <span v-else>{{ editingId ? 'Yangilash' : 'Yaratish' }}</span>
              </button>
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Tozalash
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

const config = useRuntimeConfig()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref(true)
const saving = ref(false)
const deletingId = ref(null)
const editingId = ref(null)
const promos = ref([])

const form = ref({
  code: '',
  description: '',
  discountType: 'percentage',
  discountValue: 10,
  minOrderTotal: 0,
  maxDiscountAmount: null,
  usageLimit: null,
  expiresAt: '',
  isActive: true
})

const defaultForm = () => ({
  code: '',
  description: '',
  discountType: 'percentage',
  discountValue: 10,
  minOrderTotal: 0,
  maxDiscountAmount: null,
  usageLimit: null,
  expiresAt: '',
  isActive: true
})

const formatPrice = (value) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(value || 0)
}

const formatDate = (value) => {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  authStore.loadFromLocalStorage()

  if (!authStore.isAuthenticated) {
    navigateTo('/admin/login')
    return
  }

  await fetchPromos()
})

const fetchPromos = async () => {
  loading.value = true
  try {
    const data = await $fetch(`${config.public.apiBase}/promocodes`, {
      headers: authStore.getAuthHeader()
    })
    promos.value = data.promos || []
  } catch (error) {
    console.error('Promo kodlar ro\'yxatini olishda xatolik:', error)
    toast.error('Promo kodlar ro\'yxatini olishda xatolik yuz berdi')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  editingId.value = null
  form.value = defaultForm()
}

const submitForm = async () => {
  saving.value = true

  try {
    const payload = {
      ...form.value,
      code: form.value.code.trim().toUpperCase(),
      discountValue: Number(form.value.discountValue),
      minOrderTotal: form.value.minOrderTotal ? Number(form.value.minOrderTotal) : 0,
      maxDiscountAmount: form.value.maxDiscountAmount
        ? Number(form.value.maxDiscountAmount)
        : null,
      usageLimit: form.value.usageLimit ? Number(form.value.usageLimit) : null,
      expiresAt: form.value.expiresAt ? new Date(form.value.expiresAt) : null
    }

    const method = editingId.value ? 'PUT' : 'POST'
    const url = editingId.value
      ? `${config.public.apiBase}/promocodes/${editingId.value}`
      : `${config.public.apiBase}/promocodes`

    await $fetch(url, {
      method,
      headers: authStore.getAuthHeader(),
      body: payload
    })

    toast.success(editingId.value ? 'Promo kod yangilandi' : 'Yangi promo kod yaratildi')
    resetForm()
    await fetchPromos()
  } catch (error) {
    console.error('Promo kodni saqlashda xatolik:', error)
    toast.error(error?.data?.message || 'Promo kodni saqlashda xatolik yuz berdi')
  } finally {
    saving.value = false
  }
}

const editPromo = (promo) => {
  editingId.value = promo._id
  form.value = {
    code: promo.code || '',
    description: promo.description || '',
    discountType: promo.discountType || 'percentage',
    discountValue: promo.discountValue || 0,
    minOrderTotal: promo.minOrderTotal || 0,
    maxDiscountAmount: promo.maxDiscountAmount ?? null,
    usageLimit: promo.usageLimit ?? null,
    expiresAt: promo.expiresAt ? promo.expiresAt.substring(0, 10) : '',
    isActive: promo.isActive ?? true
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleStatus = async (promo) => {
  const newStatus = !promo.isActive
  try {
    await $fetch(`${config.public.apiBase}/promocodes/${promo._id}`, {
      method: 'PUT',
      headers: authStore.getAuthHeader(),
      body: { isActive: newStatus }
    })
    toast.success(`Promo kod ${newStatus ? 'faollashtirildi' : 'faol emas qilindi'}`)
    await fetchPromos()
  } catch (error) {
    console.error('Statusni o\'zgartirishda xatolik:', error)
    toast.error('Statusni o\'zgartirishda xatolik yuz berdi')
  }
}

const deletePromo = async (promo) => {
  if (!confirm(`${promo.code} promo kodini o'chirmoqchimisiz?`)) {
    return
  }

  deletingId.value = promo._id
  try {
    await $fetch(`${config.public.apiBase}/promocodes/${promo._id}`, {
      method: 'DELETE',
      headers: authStore.getAuthHeader()
    })
    toast.success('Promo kod o\'chirildi')
    if (editingId.value === promo._id) {
      resetForm()
    }
    await fetchPromos()
  } catch (error) {
    console.error('Promo kodni o\'chirishda xatolik:', error)
    toast.error('Promo kodni o\'chirishda xatolik yuz berdi')
  } finally {
    deletingId.value = null
  }
}
</script>

