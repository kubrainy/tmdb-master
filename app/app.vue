<script setup lang="ts">
const mediaStore = useMediaStore()

useHead({
  title: 'GOFLİX',
})

onMounted(async () => {
  // await mediaStore.fetchMovieList()
  // await mediaStore.fetchTvList()
  await mediaStore.fetchMedias({ mediaType: 'movie' })
  await mediaStore.fetchMedias({ mediaType: 'tv' })
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
div {
  font-family: Inter, sans-serif;
}
</style>
