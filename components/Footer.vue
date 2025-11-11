<template>
  <footer class="bg-gray-900 text-white mt-16">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo va tavsif -->
        <div>
          <div class="text-2xl font-bold mb-4 flex items-center">
            <span class="text-3xl mr-2">🍷</span>
            AlcoShop
          </div>
          <p class="text-gray-400 text-sm">
            Eng sifatli alkogol mahsulotlari, tez va xavfsiz yetkazib berish
          </p>
        </div>
        
        <!-- Havolalar -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Havolalar</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <NuxtLink to="/" class="hover:text-white transition">
                Asosiy sahifa
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog" class="hover:text-white transition">
                Katalog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-white transition">
                Biz haqimizda
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-white transition">
                Aloqa
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Kategoriyalar -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Kategoriyalar</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <NuxtLink to="/catalog?category=vino" class="hover:text-white transition">
                Vino
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog?category=pivo" class="hover:text-white transition">
                Pivo
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog?category=aroq" class="hover:text-white transition">
                Aroq
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog?category=viski" class="hover:text-white transition">
                Viski
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Aloqa -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Aloqa</h3>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +998 90 123 45 67
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@alcoshop.uz
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Toshkent sh., Chilonzor tumani
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Pastki qism -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2024 AlcoShop. Barcha huquqlar himoyalangan.</p>
        <p class="mt-2">
          <span class="text-red-500">⚠️</span> 
          18 yoshdan oshganlar uchun. Alkogol ichishning salomatlik uchun zarari haqida unutmang.
        </p>
      </div>
    </div>
  </footer>
</template>