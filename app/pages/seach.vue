<script setup lang="ts">
import type { Media, MediaType } from '~/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '~/stores/search'

definePageMeta({
  name: 'search',
})

const searchStore = useSearchStore()
const searchInput = ref('')
const type = ref<MediaType>('movie')
const router = useRouter()

async function doSearch() {
  if (searchInput.value.trim()) {
    await searchStore.searchDetail(searchInput.value, type.value)
  }
}
</script>

<template>
  <div class="p-4">
    <div class="w-full sm:w-3/5 mx-auto mb-6">
      <div class="flex gap-2">
        <input
          v-model="searchInput"
          placeholder="Aramak istediğiniz filmi ya da diziyi yazın..."
          class="border p-2 rounded flex-grow"
          @keyup.enter="doSearch"
        >
        <UButton
          icon="i-lucide-search"
          label="Ara"
          class="bg-amber-400 text-white px-4"
          @click="doSearch"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div
        v-for="item in searchStore.searchResults"
        :key="item.id"
        class="rounded-lg shadow-md hover:shadow-[0_0_15px_#facc15] transition-shadow duration-300 flex flex-col items-center cursor-pointer"
        @click="router.push({
          name: 'detail',
          params: {
            type: item.title ? 'movie' : 'tv',
            id: item.id,
          },
        })"
      >
        <div v-if="item.poster_path" class="mb-0.5">
          <img
            :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
            :alt="item.title || item.name"
            class="object-cover rounded w-[250px] h-[350px]"
          >
        </div>
        <div v-else class="w-[250px] h-[350px] flex items-center justify-center mb-0.5">
          <p class="text-lg font-semibold text-center px-2">
            {{ item.title || item.name }}
          </p>
        </div>

        <p
          v-if="item.poster_path"
          class="text-center font-semibold px-2"
        >
          {{ item.title || item.name }}
        </p>
      </div>
    </div>
  </div>
</template>
