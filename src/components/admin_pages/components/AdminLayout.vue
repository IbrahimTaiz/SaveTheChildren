<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-red-900">
    <!-- لهيدر -->
    <!-- الهيدر -->
    <header class="flex justify-between items-center px-4 py-3 bg-white dark:bg-black shadow-md relative z-50">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img class="w-50 h-10" src="../../../../images/logo.webp" alt="Logo" />
      </div>
      <!-- روابط التنقل (تظهر فقط على الشاشات الكبيرة) -->
      <nav class="hidden md:flex gap-6">
        <router-link class="text-[#bb8e4a] font-bold text-xl hover:text-black dark:hover:text-white"
          to="/">Home</router-link>
        <router-link class="text-[#bb8e4a] font-bold text-xl hover:text-black dark:hover:text-white"
          to="/Projects">Projects</router-link>
        <router-link class="text-[#bb8e4a] font-bold text-xl hover:text-black dark:hover:text-white"
          to="/Dashboard">Dashboard</router-link>
      </nav>
      <button @click="toggleDarkMode" class="hidden md:block">
        <svg v-if="!isDark" class="text-[#bb8e4a] cursor-pointer" width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
        <svg v-else class="text-[#bb8e4a] cursor-pointer" width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
        </svg>
      </button>

      <!-- أيقونة القائمة في الموبايل -->
      <button @click="toggleSidebar" class="md:hidden text-[#bb8e4a] focus:outline-none">
        ☰
      </button>
    </header>
    <!-- ✅ المحتوى + السيدبار -->
    <div class="flex flex-1">
      <!-- Sidebar -->

      <!-- ✅ الـ Sidebar -->
      <aside :class="[
        'fixed md:static top-16 left-0 w-56 bg-white dark:bg-red-900 shadow-lg z-40 transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]">
        <div
          class="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <h2 class="text-xl font-bold text-[#bb8e4a]">Menu</h2>
          <button @click="toggleSidebar" class="text-gray-600 dark:text-gray-300">
            ✖
          </button>
        </div>

        <nav class="flex flex-col gap-4 p-4">
          <!-- ✅ روابط الـ Header الآن تظهر هنا في الموبايل -->
          <router-link class="md:hidden text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white" to="/"
            @click="closeOnMobile">
            Home
          </router-link>

          <router-link class="md:hidden text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white"
            to="/Projects" @click="closeOnMobile">
            Projects
          </router-link>

          <router-link class="md:hidden text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white"
            to="/Dashboard" @click="closeOnMobile">
            Dashboard
          </router-link>

          <!-- ✅ روابط الـ Admin -->
          <router-link class="text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white"
            to="/AdminProjects" @click="closeOnMobile">
            Admin Projects
          </router-link>

          <router-link class="text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white" to="/AdminDonate"
            @click="closeOnMobile">
            Donations
          </router-link>

          <router-link class="text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white"
            to="/AdminExpenses" @click="closeOnMobile">
            Expenses
          </router-link>

          <button @click="toggleDarkMode"
            class="block md:hidden text-[#bb8e4a] font-bold py-2 px-3 rounded-lg border border-[#bb8e4a] hover:bg-[#bb8e4a] hover:text-white transition">
            {{ isDark ? "☀️ Light Mode" : "🌙 Dark Mode" }}
          </button>
        </nav>
      </aside>

      <!-- ✅ Main Content -->
      <main class="flex-1 ml-0 md:ml-64 p-4 transition-all duration-300 flex flex-col">
        <div class="flex-grow">
          <slot />
        </div>

        <!-- ✅ Footer -->
        <footer class="bg-red-900 text-white py-5 mt-8">
          <div class="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div>
              <img src="../../../../images/logo.webp" class="h-16 mb-4" />
              <p class="text-gray-400">
                Karama Foundation is committed to promoting equality...
              </p>
            </div>

            <div>
              <h4 class="text-lg font-semibold mb-3">Quick Links</h4>
              <ul class="space-y-2">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/Projects">Projects</router-link></li>
                <li><router-link to="/AdminDonate">Donate</router-link></li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold mb-3">Contact</h4>
              <p>Email: info@karama.org</p>
              <p>Phone: +123 456 789</p>
            </div>
          </div>

          <div class="text-center text-gray-500 mt-8">
            &copy; 2025 Karama Foundation. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDark = ref(false);
const isSidebarOpen = ref(false);

onMounted(() => {
  const savedMode = localStorage.getItem("darkMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  isDark.value = savedMode !== null ? savedMode === "true" : prefersDark;
  updateDarkMode();
});

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("darkMode", isDark.value);
  updateDarkMode();
};

const updateDarkMode = () => {
  document.documentElement.classList.toggle("dark", isDark.value);
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeOnMobile = () => {
  if (window.innerWidth < 768) isSidebarOpen.value = false;
};
</script>
