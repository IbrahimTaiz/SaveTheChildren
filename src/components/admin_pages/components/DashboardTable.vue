<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300 text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th v-for="(h, i) in headers" :key="i" class="border p-2">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rIndex) in rows" :key="rIndex" class="text-center">
            <td v-for="(cell, cIndex) in row" :key="cIndex" class="border p-2">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  headers: Array,
  rows: Array,
});
</script>
