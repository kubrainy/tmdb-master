<script setup lang="ts">
const props = defineProps<{
  item: Media
}>()
const router = useRouter()
</script>

<template>
  <div
    class="flex-shrink-0 w-40 cursor-pointer snap-start"
    @click="router.push({ name: 'detail', params: { id: props.item.id } })"
  >
    <img
      v-if="props.item.poster_path"
      :src="`https://image.tmdb.org/t/p/w300${props.item.poster_path}`"
      :alt="props.item.title || props.item.name"
      class="rounded-lg shadow-lg"
    >
    <p class="mt-2 text-sm font-medium truncate text-white">
      {{ props.item.title || props.item.name }}
    </p>
  </div>
</template>
