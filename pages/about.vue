<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <!-- Hero -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Biz haqimizda</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          AlcoShop - sizning ishonchli alkogol mahsulotlari yetkazib berish xizmatingiz
        </p>
      </div>
      
      <!-- Missiya -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="bg-white rounded-lg shadow-md p-8">
          <div class="text-5xl mb-4">🎯</div>
          <h2 class="text-2xl font-bold mb-4">Bizning missiyamiz</h2>
          <p class="text-gray-700 leading-relaxed">
            Biz mijozlarimizga eng yaxshi sifatli alkogol mahsulotlarini qulay narxlarda 
            va tez yetkazib berish bilan ta'minlashni maqsad qilganmiz. Har bir buyurtma 
            biz uchun muhim va biz har doim sizning qulayligingiz haqida o'ylaymiz.
          </p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-8">
          <div class="text-5xl mb-4">👁️</div>
          <h2 class="text-2xl font-bold mb-4">Bizning qarashimiz</h2>
          <p class="text-gray-700 leading-relaxed">
            O'zbekistonda eng yirik va ishonchli alkogol mahsulotlari platformasi bo'lish. 
            Biz innovatsion texnologiyalar va yuqori xizmat sifati orqali mijozlarimizga 
            eng yaxshi tajribani taqdim etishga intilamiz.
          </p>
        </div>
      </div>
      
      <!-- Afzalliklar -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">Nima uchun bizni tanlash kerak?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Sifatli mahsulotlar</h3>
            <p class="text-gray-600">
              Barcha mahsulotlar sertifikatlangan va original brendlardan
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Tez yetkazib berish</h3>
            <p class="text-gray-600">
              Toshkent bo'ylab 1-2 soat ichida yetkazib beramiz
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Qulay narxlar</h3>
            <p class="text-gray-600">
              Raqobatbardosh narxlar va tez-tez chegirmalar
            </p>
          </div>
        </div>
      </div>
      
      <!-- Statistika -->
      <div class="bg-gradient-to-r from-red-900 to-red-700 rounded-lg p-12 mb-16 text-white">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p class="text-4xl font-bold mb-2">5000+</p>
            <p class="text-red-200">Baxtli mijozlar</p>
          </div>
          <div>
            <p class="text-4xl font-bold mb-2">300+</p>
            <p class="text-red-200">Mahsulotlar</p>
          </div>
          <div>
            <p class="text-4xl font-bold mb-2">50+</p>
            <p class="text-red-200">Brendlar</p>
          </div>
          <div>
            <p class="text-4xl font-bold mb-2">99%</p>
            <p class="text-red-200">Mijoz qoniqishi</p>
          </div>
        </div>
      </div>
      
      <!-- Jamoamiz -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">Bizning jamoamiz</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-4xl">👨‍💼</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Alisher Karimov</h3>
            <p class="text-gray-600 mb-2">CEO & Asoschisi</p>
            <p class="text-sm text-gray-500">
              10+ yillik tajriba alkogol savdosi sohasida
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-4xl">👩‍💼</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Nilufar Ahmedova</h3>
            <p class="text-gray-600 mb-2">Marketing Direktori</p>
            <p class="text-sm text-gray-500">
              Mijozlar bilan aloqa va marketing strategiyalari
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-4xl">👨‍💻</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Javohir Toshmatov</h3>
            <p class="text-gray-600 mb-2">Texnik Direktor</p>
            <p class="text-sm text-gray-500">
              Platforma ishlab chiqish va texnik qo'llab-quvvatlash
            </p>
          </div>
        </div>
      </div>
      
      <!-- Qo'ng'iroq qilish -->
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Savollaringiz bormi?</h2>
        <p class="text-gray-600 mb-6">
          Biz har doim sizga yordam berishga tayyormiz. Biz bilan bog'laning!
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/contact"
            class="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Biz bilan bog'lanish
          </NuxtLink>
          <NuxtLink 
            to="/catalog"
            class="border border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition font-semibold"
          >
            Katalogni ko'rish
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Biz haqimizda - AlcoShop',
  meta: [
    {
      name: 'description',
      content: 'AlcoShop - O\'zbekistonda ishonchli alkogol mahsulotlari yetkazib berish xizmati'
    }
  ]
})
</script>