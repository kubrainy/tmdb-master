<script setup lang="ts">
definePageMeta({
  name: 'main',
})
const mediaStore = useMediaStore()

const movies = ref<Media[]>([])
const tvSeries = ref<Media[]>([])


onMounted(async () => {
  await mediaStore.fetchMedias({ mediaType: 'movie' })
  movies.value = mediaStore.movies

  await mediaStore.fetchMedias({ mediaType: 'tv' })
  tvSeries.value = mediaStore.tvSeries
})
</script>

<template>
  <div class="p-6">
    <h2 class="text-l font-bold mb-2 border border-primary-400 p-4 rounded-md w-fit mt-2 text-primary cursor-pointer hover:bg-amber-50">
      <NuxtLink :to="{ name: 'list', params: { type: 'movie' } }">
        Filmler
      </NuxtLink>
    </h2>
    <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div class="flex gap-4 min-w-max">
        <MediaCard :items="movies" type="movie" />
      </div>
    </div>

    <h2 class="text-l font-bold mb-2 border border-primary-400 p-4 rounded-md w-fit mt-6 text-primary cursor-pointer hover:bg-amber-50">
      <NuxtLink :to="{ name: 'list', params: { type: 'tv' } }">
        Diziler
      </NuxtLink>
    </h2>
    <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
      <div class="flex gap-4 min-w-max ">
        <MediaCard :items="tvSeries" type="tv" />
      </div>
    </div>
  </div>
</template>
