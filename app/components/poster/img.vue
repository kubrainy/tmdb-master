<script setup lang="ts">
defineProps<{
  images?: { file_path: string }[]
}>()
</script>

<template>
  <div v-for="img in images" :key="img.file_path" class="flex-shrink-0 w-[250px]">
    <img
      :src="`https://image.tmdb.org/t/p/w500${img.file_path}`"
      class="rounded shadow w-full"
      height="250"
    >
  </div>
</template>
