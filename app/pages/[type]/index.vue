<script setup lang="ts">
definePageMeta({
  name: 'list',
})
const route = useRoute()
const router = useRouter()
const mediaStore = useMediaStore()
const type = route.params.type as 'tv' | 'movie'

onMounted(async () => {
  if (type === 'movie') {
    mediaStore.Movies = []
    await mediaStore.fetchMovieList()
  }
  else if (type === 'tv') {
    mediaStore.Tv = []
    await mediaStore.fetchTvList()
  }
})

const mediaItems = computed(() => {
  return type === 'movie' ? mediaStore.Movies : mediaStore.Tv
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4 text-cyan-500 text-center">
      {{ type === 'movie' ? 'FİLMLER' : 'DİZİLER' }}
    </h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div
        v-for="item in mediaItems"
        :key="item.id"
        class="rounded-lg shadow flex flex-col items-center cursor-pointer"
        @click="router.push({
          name: 'detail',
          params: {
            id: item.id,
          },
        })"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
          :alt="item.title || item.name"
          class="rounded mb-0.5"
          width="250"
          height="250"
        >
        <p class="text-center px-2">
          {{ item.title || item.name }}
        </p>
      </div>
    </div>
  </div>
</template>
