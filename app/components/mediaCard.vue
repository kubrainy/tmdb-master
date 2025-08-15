<script setup lang="ts">
import type { Media } from '~/type'
import { useRouter } from 'vue-router'

const props = defineProps<{
  items: Media[]
  type: 'movie' | 'tv'
}>()

const router = useRouter()


const mediaList = computed(() =>
  props.items.map(item => ({
    id: item.id,
    title: item.title || item.name, 
    poster: item.poster_path,
    type: item.title ? 'movie' : 'tv', 
  })),
)
</script>

<template>
  <div>
    <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div class="flex gap-4 min-w-max">
        <div
          v-for="item in mediaList"
          :key="item.id"
          class="rounded-xl p-2 min-w-[250px] cursor-pointer"
          @click="router.push({
            name: 'detail',
            params: {
              type: item.type,
              id: item.id,
            },
          })"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${item.poster}`"
            :alt="item.title"
            class="rounded mb-0.5"
            width="250"
            height="250"
          >
          <h3 class="text-lg font-semibold break-words whitespace-normal w-[250px]">
            {{ item.title }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
