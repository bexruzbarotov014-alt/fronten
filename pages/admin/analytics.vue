<template>
  <div class="min-h-screen bg-gray-50">
    <AdminHeader />
    
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Analytics va Hisobotlar</h1>
        <button 
          @click="exportPDF"
          class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          PDF eksport
        </button>
      </div>
      
      <!-- Vaqt oralig'i tanlash -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-wrap gap-4">
          <button
            v-for="period in periods"
            :key="period.value"
            @click="changePeriod(period.value)"
            :class="[
              'px-4 py-2 rounded-lg transition',
              selectedPeriod === period.value
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ period.label }}
          </button>
        </div>
      </div>
      
      <!-- Savdo grafigi -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-6">Savdo dinamikasi</h2>
        <div class="relative" style="height: 400px;">
          <canvas ref="salesChart" class="w-full h-full"></canvas>
        </div>
      </div>
      
      <!-- Kategoriya grafigi -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-6">Kategoriya bo'yicha savdo</h2>
          <div class="relative" style="height: 300px;">
            <canvas ref="categoryChart" class="w-full h-full"></canvas>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-6">Buyurtma holatlari</h2>
          <div class="relative" style="height: 300px;">
            <canvas ref="statusChart" class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
      
      <!-- Top mahsulotlar -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-6">Eng ko'p sotilgan mahsulotlar</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left py-3 px-4">#</th>
                <th class="text-left py-3 px-4">Mahsulot</th>
                <th class="text-left py-3 px-4">Kategoriya</th>
                <th class="text-left py-3 px-4">Sotildi</th>
                <th class="text-left py-3 px-4">Daromad</th>
              </tr>
            </thead>
            <tbody v-if="topProducts.length > 0">
              <tr 
                v-for="(product, index) in topProducts" 
                :key="product._id"
                class="border-b hover:bg-gray-50"
              >
                <td class="py-3 px-4">{{ index + 1 }}</td>
                <td class="py-3 px-4 font-medium">{{ product.name }}</td>
                <td class="py-3 px-4">{{ product.category }}</td>
                <td class="py-3 px-4">{{ product.soldCount }} dona</td>
                <td class="py-3 px-4 font-semibold text-green-600">
                  {{ formatPrice(product.revenue) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td class="py-4 px-4 text-center text-gray-500" colspan="5">
                  Ma'lumotlar mavjud emas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Umumiy statistika -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <p class="text-blue-100 text-sm mb-2">O'rtacha buyurtma</p>
          <p class="text-3xl font-bold">{{ formatPrice(stats.avgOrderValue) }}</p>
        </div>
        <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <p class="text-green-100 text-sm mb-2">Jami daromad</p>
          <p class="text-3xl font-bold">{{ formatPrice(stats.totalRevenue) }}</p>
        </div>
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
          <p class="text-purple-100 text-sm mb-2">Buyurtmalar soni</p>
          <p class="text-3xl font-bold">{{ stats.totalOrders }}</p>
        </div>
        <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6">
          <p class="text-orange-100 text-sm mb-2">Yangi mijozlar</p>
          <p class="text-3xl font-bold">{{ stats.newCustomers }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'

definePageMeta({
  middleware: 'admin-auth'
})

const config = useRuntimeConfig()
const authStore = useAuthStore()
const toast = useToast()

const salesChart = ref(null)
const categoryChart = ref(null)
const statusChart = ref(null)

const selectedPeriod = ref('30days')
const periods = [
  { label: '7 kun', value: '7days' },
  { label: '30 kun', value: '30days' },
  { label: '90 kun', value: '90days' },
  { label: 'Yil', value: 'year' }
]

const stats = ref({
  avgOrderValue: 0,
  totalRevenue: 0,
  totalOrders: 0,
  newCustomers: 0
})

const topProducts = ref([])
const isLoading = ref(true)
let charts = {}
let Chart = null

onMounted(async () => {
  authStore.loadFromLocalStorage()

  if (!authStore.isAuthenticated) {
    navigateTo('/admin/login')
    return
  }

  const chartModule = await import('chart.js/auto')
  Chart = chartModule.default
  await fetchAnalytics()
})

const changePeriod = async (period) => {
  if (selectedPeriod.value === period) return
  selectedPeriod.value = period
  await fetchAnalytics()
}

const fetchAnalytics = async () => {
  if (!authStore.isAuthenticated) return

  isLoading.value = true

  try {
    const headers = authStore.getAuthHeader()
    const query = `?period=${selectedPeriod.value}`

    const [salesResponse, categoryResponse, statusResponse, topProductsResponse, statsResponse] = await Promise.all([
      $fetch(`${config.public.apiBase}/analytics/sales${query}`, { headers }),
      $fetch(`${config.public.apiBase}/analytics/categories${query}`, { headers }),
      $fetch(`${config.public.apiBase}/analytics/order-status${query}`, { headers }),
      $fetch(`${config.public.apiBase}/analytics/top-products${query}`, { headers }),
      $fetch(`${config.public.apiBase}/analytics/stats${query}`, { headers })
    ])

    stats.value = {
      avgOrderValue: statsResponse.avgOrderValue || 0,
      totalRevenue: statsResponse.totalRevenue || 0,
      totalOrders: statsResponse.totalOrders || 0,
      newCustomers: statsResponse.newCustomers || 0
    }

    topProducts.value = (topProductsResponse.products || []).map((product) => ({
      _id: product._id,
      name: product.name,
      category: product.category || 'Noma\'lum',
      soldCount: product.soldCount || 0,
      revenue: product.revenue || 0
    }))

    const salesData = buildSalesDataset(salesResponse.sales || [], selectedPeriod.value)
    const categoryData = buildCategoryDataset(categoryResponse.categories || [])
    const statusData = buildStatusDataset(statusResponse.statuses || [])

    await nextTick()
    renderCharts(salesData, categoryData, statusData)
  } catch (error) {
    console.error('Analytics olishda xatolik:', error)
    toast.error('Analytics ma\'lumotlarini yuklashda xatolik yuz berdi')
  } finally {
    isLoading.value = false
  }
}

const getPeriodDays = (period) => {
  switch (period) {
    case '7days':
      return 7
    case '90days':
      return 90
    case 'year':
      return 365
    case '30days':
    default:
      return 30
  }
}

const buildSalesDataset = (sales, period) => {
  const days = getPeriodDays(period)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const salesMap = sales.reduce((acc, item) => {
    acc[item._id] = item.total || 0
    return acc
  }, {})

  const labels = []
  const values = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    const key = date.toISOString().slice(0, 10)
    labels.push(date.toLocaleDateString('uz-UZ', {
      month: 'short',
      day: 'numeric'
    }))
    values.push(salesMap[key] || 0)
  }

  return { labels, values }
}

const buildCategoryDataset = (categories) => {
  const labels = []
  const values = []

  categories.forEach((category) => {
    labels.push(category._id || 'Noma\'lum')
    values.push(category.revenue || 0)
  })

  return { labels, values }
}

const buildStatusDataset = (statuses) => {
  const statusMap = {
    new: 'Yangi',
    processing: 'Jarayonda',
    delivered: 'Yetkazildi',
    canceled: 'Bekor qilindi'
  }

  const labels = []
  const values = []

  statuses.forEach((status) => {
    labels.push(statusMap[status._id] || status._id || 'Noma\'lum')
    values.push(status.count || 0)
  })

  return { labels, values }
}

const renderCharts = (salesData, categoryData, statusData) => {
  if (!Chart) return

  Object.values(charts).forEach((chart) => chart.destroy())
  charts = {}

  if (salesChart.value) {
    charts.sales = new Chart(salesChart.value, {
      type: 'line',
      data: {
        labels: salesData.labels,
        datasets: [{
          label: 'Savdo (UZS)',
          data: salesData.values,
          borderColor: 'rgb(220, 38, 38)',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => new Intl.NumberFormat('uz-UZ', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(value)
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    })
  }

  if (categoryChart.value) {
    charts.category = new Chart(categoryChart.value, {
      type: 'doughnut',
      data: {
        labels: categoryData.labels,
        datasets: [{
          data: categoryData.values,
          backgroundColor: [
            'rgb(220, 38, 38)',
            'rgb(37, 99, 235)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)',
            'rgb(139, 92, 246)',
            'rgb(75, 85, 99)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: { size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = new Intl.NumberFormat('uz-UZ', {
                  style: 'currency',
                  currency: 'UZS',
                  minimumFractionDigits: 0
                }).format(context.parsed);
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    })
  }

  if (statusChart.value) {
    charts.status = new Chart(statusChart.value, {
      type: 'bar',
      data: {
        labels: statusData.labels,
        datasets: [{
          label: 'Buyurtmalar soni',
          data: statusData.values,
          backgroundColor: [
            'rgb(249, 115, 22)',
            'rgb(59, 130, 246)',
            'rgb(34, 197, 94)',
            'rgb(239, 68, 68)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Buyurtmalar: ${context.parsed.y} ta`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: { 
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    })
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price || 0)
}

const exportPDF = async () => {
  try {
    // Simple PDF export using window.print for now
    // Can be enhanced with jsPDF library later
    window.print()
  } catch (error) {
    console.error('PDF eksport xatoligi:', error)
    toast.error('PDF eksport qilishda xatolik yuz berdi')
  }
}
</script>