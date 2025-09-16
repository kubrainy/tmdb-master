<script setup lang="ts">
definePageMeta({
  name: 'list',
})

const route = useRoute()
const router = useRouter()
const mediaStore = useMediaStore()
const type = route.params.type as MediaType

const genreId = route.query.genre as string | undefined

onMounted(async () => {
  await mediaStore.fetchMedias({
    mediaType: type,
    page: 1,
    append: false,
    genreId,
  })
})

watch(
  () => [route.params.type, route.query.genre],
  async ([newType, newGenre]) => {
    const updatedType = newType as MediaType
    const updatedGenre = newGenre as string | undefined
    await mediaStore.fetchMedias({
      mediaType: updatedType,
      page: 1,
      append: false,
      genreId: updatedGenre,
    })
  },

)

async function loadMore() {
  if (type === 'movie') {
    await mediaStore.loadMoreMovies(genreId)
  }
  else if (type === 'tv') {
    await mediaStore.loadMoreTv(genreId)
  }
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4 text-primary-400  text-center">
      {{ type === 'movie' ? 'FİLMLER' : 'DİZİLER' }}
    </h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div
        v-for="item in mediaStore.medias"
        :key="item.id"
        class="rounded-lg shadow-md transition-shadow duration-300 flex flex-col items-center cursor-pointer dark:hover:shadow-[0_0_15px_#facc15] light:hover:shadow-[0_0_15px_#d97706]"
        @click="router.push({
          name: 'detail',
          params: { type, id: item.id },
        })"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
          :alt="item.title || item.name"
          class="rounded mb-1"
          width="250"
          height="250"
        >
        <p class="text-center px-2">
          {{ item.title || item.name }}
        </p>
        <Star :vote-average="item?.vote_average ?? 0" />
      </div>
    </div>

    <div class="flex justify-center mt-6">
      <UButton
        size="xl"
        variant="outline"
        icon="heroicons:plus"
        class="rounded-full"
        @click="loadMore"
      />
    </div>
  </div>
</template>
