<script setup lang="ts">
import type { MediaType } from '~/type'
import { useRoute } from 'vue-router'

definePageMeta({
  name: 'actor-detail',
})

const route = useRoute()
const DetailStore = useDetailStore()
const id = Number(route.params.id)
const mediaType = route.params.type as MediaType

onMounted(async () => {
  await DetailStore.fetchDetail(id, mediaType)
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-4 text-center text-amber-400 mt-2">
      {{ mediaType === 'movie' ? 'Film Oyuncuları' : 'Dizi Oyuncuları' }}
    </h1>
    <div class="w-full sm:w-4/5 mx-auto p-2 flex flex-col">
      <div class="w-full sm:w-4/5 mx-auto p-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="actor in DetailStore.Credits"
          :key="actor.id"
          class="border-2 border-amber-200 rounded-lg p-2 text-center"
        >
          <img
            v-if="actor.profile_path"
            :src="`https://image.tmdb.org/t/p/w300${actor.profile_path}`"
            :alt="actor.name"
            class="w-full h-72 object-cover rounded"
          >

          <div
            v-else
            class="h-72 w-full rounded bg-gray-800 bg-opacity-50 backdrop-blur-sm"
          >
            <p class="text-gray-400 justify-center items-center flex h-full">
              Resim Yok
            </p>
          </div>

          <div class="mt-2">
            <p class="font-bold">
              {{ actor.character }}
            </p>
            <p class="text-sm text-gray-300">
              {{ actor.original_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
