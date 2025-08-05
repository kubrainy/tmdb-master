<script setup lang="ts">
import type { Media } from '~/type'
import { useRouter } from 'vue-router'

const props = defineProps<{
  items: Media[]
  type: 'movie' | 'tv'
}>()

const router = useRouter()
const movies = computed(() => props.items.filter(i => i.title))
const tvSeries = computed(() => props.items.filter(i => i.name))
</script>

<template>
  <div>
    <section>
      <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <div class="flex gap-4 min-w-max">
          <div
            v-for="item in movies"
            :key="item.id"
            class="rounded-xl p-2  min-w-[250px] cursor-pointer"
            @click="router.push({
              name: 'detail',
              params: {
                type: 'movie',
                id: item.id,
              },
            })"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
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
    </section>
    <section>
      <div class="flex gap-4 min-w-max">
        <div
          v-for="item in tvSeries"
          :key="item.id"
          class="rounded-xl p-2  min-w-[250px] cursor-pointer"
          @click="router.push({
            name: 'detail',
            params: {
              type: 'tv',
              id: item.id,
            },
          })"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
            :alt="item.name"
            class="rounded mb-0.5"
            width="250"
            height="250"
          >
          <h3 class="text-lg font-semibold break-words whitespace-normal w-[250px]">
            {{ item.name }}
          </h3>
        </div>
      </div>
    </section>
  </div>
</template>
