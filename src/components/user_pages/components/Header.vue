<template>
  <header
    class="flex justify-between items-center px-4 py-3 bg-white dark:bg-black shadow-md transition-colors duration-300 relative"
  >
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <img class="w-50 h-10" src="../../../../images/logo.webp" alt="Logo" />
    </div>

    <!-- Navigation Links (Hidden on small screens) -->
    <nav class="hidden md:flex gap-6">
      <router-link
        class="text-[#bb8e4a] dark:text-[#bb8e4a] font-bold text-xl hover:text-black dark:hover:text-white transition-colors"
        to="/"
        >Home</router-link
      >
      <router-link
        class="text-[#bb8e4a] dark:text-[#bb8e4a] font-bold text-xl hover:text-black dark:hover:text-white transition-colors"
        to="/Projects"
        >Projects</router-link
      >
      <router-link
        class="text-[#bb8e4a] dark:text-[#bb8e4a] font-bold text-xl hover:text-black dark:hover:text-white transition-colors"
        to="/Dashboard"
        >Dashboard</router-link
      >
    </nav>

    <!-- Right Side (Dark Mode + Menu Icon) -->
    <div class="flex items-center gap-4">
      <!-- Dark Mode Toggle -->
      <button @click="toggleDarkMode" aria-label="Toggle dark mode">
        <svg
          v-if="!isDark"
          class="text-[#bb8e4a] cursor-pointer hover:scale-110 transition-transform"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
          ></path>
        </svg>

        <svg
          v-else
          class="text-[#bb8e4a] cursor-pointer hover:scale-110 transition-transform"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
          ></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line
            x1="4.22"
            y1="19.78"
            x2="5.64"
            y2="18.36"
          ></line>
          <line
            x1="18.36"
            y1="5.64"
            x2="19.78"
            y2="4.22"
          ></line>
        </svg>
      </button>

      <!-- Hamburger Menu (Visible on small screens) -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden text-[#bb8e4a] focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-full left-0 w-full bg-white dark:bg-black shadow-lg flex flex-col items-center py-4 space-y-3 md:hidden z-50"
    >
      <router-link
        class="text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white"
        to="/"
        @click="isMenuOpen = false"
        >Home</router-link
      >
      <router-link
        class="text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white"
        to="/Projects"
        @click="isMenuOpen = false"
        >Projects</router-link
      >
      <router-link
        class="text-[#bb8e4a] font-bold text-lg hover:text-black dark:hover:text-white"
        to="/Dashboard"
        @click="isMenuOpen = false"
        >Dashboard</router-link
      >
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDark = ref(false);
const isMenuOpen = ref(false);

onMounted(() => {
  const savedMode = localStorage.getItem("darkMode");
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedMode !== null) {
    isDark.value = savedMode === "true";
  } else if (prefersDark) {
    isDark.value = true;
  }

  updateDarkMode();
});

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("darkMode", isDark.value);
  updateDarkMode();
};

const updateDarkMode = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
</script>
