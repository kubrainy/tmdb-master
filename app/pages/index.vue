<script setup lang="ts">
import type { Media } from '~/type'

definePageMeta({
  name: 'main',
})
const mediaStore = useMediaStore()

const movies = ref<Media[]>([])
const tvSeries = ref<Media[]>([])

onMounted(async () => {
  await mediaStore.fetchMedias('movie')
  movies.value = [...mediaStore.medias]

  await mediaStore.fetchMedias('tv')
  tvSeries.value = [...mediaStore.medias]
})
</script>

<template>
  <div class="p-6">
    <h2 class="text-l font-bold mb-2 border border-amber-400 p-4 rounded-md w-fit mt-2 text-amber-400">
      Filmler
    </h2>
    <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div class="flex gap-4 min-w-max">
        <MediaCard :items="movies" type="movie" />
      </div>
    </div>

    <h2 class="text-l font-bold mb-2 border border-amber-400 p-4 rounded-md w-fit mt-6 text-amber-400">
      Diziler
    </h2>
    <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
      <div class="flex gap-4 min-w-max ">
        <MediaCard :items="tvSeries" type="tv" />
      </div>
    </div>
  </div>
</template>
