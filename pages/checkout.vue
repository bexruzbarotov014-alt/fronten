<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">{{ t('checkout.title') }}</h1>

      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <p class="text-xl text-gray-600 mb-4">{{ t('checkout.empty') }}</p>
        <NuxtLink to="/catalog" class="text-red-600 hover:underline">
          {{ t('checkout.backToCatalog') }}
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6">{{ t('checkout.title') }}</h2>

            <form @submit.prevent="submitOrder" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">
                  {{ t('checkout.form.name') }} <span class="text-red-600">*</span>
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Ismingizni kiriting"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">
                  {{ t('checkout.form.phone') }} <span class="text-red-600">*</span>
                </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">
                  {{ t('checkout.form.address') }} <span class="text-red-600">*</span>
                </label>
                <textarea
                  v-model="formData.address"
                  rows="3"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Shahar, ko'cha, uy raqami..."
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">
                  {{ t('checkout.form.comment') }}
                </label>
                <textarea
                  v-model="formData.comment"
                  rows="3"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Buyurtma bo'yicha qo'shimcha izoh..."
                ></textarea>
              </div>

              <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {{ error }}
              </div>

              <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {{ successMessage }}
              </div>

              <div class="flex gap-4 pt-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  <span v-if="loading">{{ t('checkout.form.submitting') }}</span>
                  <span v-else>{{ t('checkout.form.submit') }}</span>
                </button>

                <NuxtLink
                  to="/cart"
                  class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  {{ t('checkout.form.back') }}
                </NuxtLink>
              </div>
            </form>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-4">{{ t('checkout.title') }}</h2>
              <div class="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
                <div
                  v-for="item in cartStore.items"
                  :key="item._id"
                  class="flex gap-3 pb-3 border-b"
                >
                  <img
                    :src="item.images?.[0] || '/placeholder.jpg'"
                    :alt="item.name"
                    class="w-16 h-16 object-cover rounded"
                  />
                  <div class="flex-1">
                    <p class="text-sm font-medium line-clamp-2">{{ item.name }}</p>
                    <p class="text-xs text-gray-600">{{ item.quantity }} x {{ formatPrice(getFinalPrice(item)) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t pt-4">
              <label class="block text-sm font-medium mb-2">{{ t('checkout.promo.label') }}</label>
              <div class="flex gap-2">
                <input
                  v-model="promoCodeInput"
                  type="text"
                  :disabled="promoLoading || Boolean(appliedPromo.code)"
                  class="flex-1 px-4 py-2 border rounded-lg uppercase focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                  :placeholder="t('checkout.promo.placeholder')"
                />
                <button
                  v-if="!appliedPromo.code"
                  @click="applyPromoCode"
                  :disabled="promoLoading"
                  class="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="promoLoading">...</span>
                  <span v-else>{{ t('actions.apply') }}</span>
                </button>
                <button
                  v-else
                  @click="removePromoCode"
                  class="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  {{ t('checkout.promo.remove') }}
                </button>
              </div>
              <p v-if="promoMessage" class="text-green-600 text-sm mt-2">
                {{ promoMessage }}
              </p>
              <p v-if="promoError" class="text-red-600 text-sm mt-2">
                {{ promoError }}
              </p>
            </div>

            <div class="space-y-2 border-t pt-4">
              <div class="flex justify-between text-gray-600">
                <span>{{ t('checkout.summary.products') }}:</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>{{ t('checkout.summary.promoDiscount') }}:</span>
                <span v-if="appliedPromo.discount > 0" class="text-green-600">
                  -{{ formatPrice(appliedPromo.discount) }}
                </span>
                <span v-else class="text-gray-400">0</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>{{ t('checkout.summary.delivery') }}:</span>
                <span class="text-green-600">{{ t('checkout.summary.deliveryFree') }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold pt-2 border-t">
                <span>{{ t('checkout.summary.total') }}:</span>
                <span class="text-red-600">{{ formatPrice(total) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '~/stores/cart'
import { useCustomerNotificationStore } from '~/stores/customerNotifications'
import { useToast } from '~/composables/useToast'
import { useRuntimeConfig } from 'nuxt/app'

const config = useRuntimeConfig()
const cartStore = useCartStore()
const customerNotificationStore = useCustomerNotificationStore()
const toast = useToast()
const { t } = useI18n()

onMounted(() => {
  cartStore.loadFromLocalStorage()
})

const formData = ref({
  name: '',
  phone: '',
  address: '',
  comment: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)
const orderNumber = ref('')
const successMessage = ref('')

const promoCodeInput = ref('')
const promoLoading = ref(false)
const promoMessage = ref('')
const promoError = ref('')
const appliedPromo = ref({
  code: null,
  discount: 0
})

const subtotal = computed(() => cartStore.totalPrice)
const total = computed(() => Math.max(subtotal.value - appliedPromo.value.discount, 0))

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price || 0)
}

const getFinalPrice = (item) => {
  let price = item.price
  if (item.discountPercent > 0) {
    price = price - (price * item.discountPercent / 100)
  }
  return price
}

const applyPromoCode = async () => {
  promoError.value = ''
  promoMessage.value = ''

  if (!promoCodeInput.value) {
    promoError.value = t('checkout.messages.enterPromo')
    return
  }

  promoLoading.value = true

  try {
    const response = await $fetch(`${config.public.apiBase}/promocodes/validate`, {
      method: 'POST',
      body: {
        code: promoCodeInput.value,
        orderTotal: subtotal.value
      }
    })

    appliedPromo.value = {
      code: response.promo.code,
      discount: response.discount || 0
    }

    const message = t('checkout.messages.promoApplied', {
      amount: formatPrice(response.discount)
    })
    promoMessage.value = message
    toast.success(promoMessage.value)
  } catch (err) {
    const message = err?.data?.message || t('checkout.messages.promoInvalid')
    promoError.value = message
    toast.error(message)
  } finally {
    promoLoading.value = false
  }
}

const removePromoCode = () => {
  appliedPromo.value = { code: null, discount: 0 }
  promoCodeInput.value = ''
  promoMessage.value = ''
  promoError.value = ''
}

const submitOrder = async () => {
  loading.value = true
  error.value = ''
  success.value = false
  orderNumber.value = ''
  successMessage.value = ''

  if (!formData.value.name || !formData.value.phone || !formData.value.address) {
    error.value = t('checkout.messages.requiredFields')
    loading.value = false
    return
  }

  if (cartStore.items.length === 0) {
    error.value = t('checkout.messages.emptyCart')
    loading.value = false
    return
  }

  try {
    const orderData = {
      items: cartStore.items.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: getFinalPrice(item),
        image: item.images?.[0] || ''
      })),
      customer: {
        name: formData.value.name.trim(),
        phone: formData.value.phone.trim(),
        address: formData.value.address.trim(),
        comment: (formData.value.comment || '').trim()
      },
      promoCode: appliedPromo.value.code || undefined
    }

    const response = await $fetch(`${config.public.apiBase}/orders`, {
      method: 'POST',
      body: orderData
    })

    if (response.order && response.order.orderNumber) {
      success.value = true
      orderNumber.value = response.order.orderNumber
      successMessage.value = t('checkout.messages.success', { orderNumber: orderNumber.value })

      // Telefon raqamini saqlash va bildirishnoma qo'shish
      customerNotificationStore.setPhone(formData.value.phone.trim())
      customerNotificationStore.addOrderConfirmation(response.order)

      cartStore.clearCart()
      removePromoCode()

      formData.value = {
        name: '',
        phone: '',
        address: '',
        comment: ''
      }

      setTimeout(() => {
        navigateTo('/')
      }, 3000)
    } else {
      throw new Error('Buyurtma raqami olinmadi')
    }
  } catch (err) {
    const message =
      err?.data?.message ||
      err?.message ||
      err?.data?.error ||
      t('checkout.messages.generalError')

    error.value = message
    toast.error(message)
  } finally {
    loading.value = false
  }
}
</script>