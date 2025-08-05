<script setup lang="ts">
definePageMeta({
  name: 'detail',
})
const route = useRoute()

const mediaType = route.params.type as string
const tvId = Number(route.params.id)
const movieId = Number(route.params.id)

const DetailStore = useDetailStore()

onMounted(async () => {
  if (mediaType === 'movie') {
    await DetailStore.fetchMovieDetail(movieId)
  }
  else if (mediaType === 'tv') {
    await DetailStore.fetchTvDetail(tvId)
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <div v-if="mediaType === 'movie'">
      <h1 class="text-2xl font-bold flex-wrap text-center ">
        {{ DetailStore.Detail[0]?.title }}
      </h1>
      <img :src="`https://image.tmdb.org/t/p/original${DetailStore.Detail[0]?.backdrop_path}`" alt="Movie Backdrop" class=" h-auto rounded shadow">
      <div class="flex flex-col items-start justify-center mt-4">
        <div class="flex-1">
          <p class="mb-4">
            {{ DetailStore.Detail[0]?.overview }}
          </p>
        </div>
        <div class="flex items-center justify-center pt-56 pl-64">
          <img :src="`https://image.tmdb.org/t/p/w500${DetailStore.Detail[0]?.poster_path}`" alt="Movie Poster" class="w-64 h-auto rounded shadow">
        </div>
      </div>
    </div>
    <div v-else-if="mediaType === 'tv'">
      <h1 class="text-2xl font-bold ">
        {{ DetailStore.Detail[0]?.name }}
      </h1>
      <img :src="`https://image.tmdb.org/t/p/original${DetailStore.Detail[0]?.backdrop_path}`" alt="TV Series backdrop" class="h-auto rounded shadow">
      <p>{{ DetailStore.Detail[0]?.overview }}</p>
      <img :src="`https://image.tmdb.org/t/p/w500${DetailStore.Detail[0]?.poster_path}`" alt="TV Series Poster" class="w-64 h-auto">
    </div>
    <div v-else>
      <p>Type bulunamadı.</p>
    </div>
  </div>
</template>
