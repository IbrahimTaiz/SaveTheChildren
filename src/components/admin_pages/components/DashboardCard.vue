<template>
  <div :class="'p-5 rounded-lg shadow text-center text-white ' + color">
    <h3 class="text-lg font-medium">{{ title }}</h3>
    <p class="text-2xl font-bold mt-2">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  color: String,
});
</script>
