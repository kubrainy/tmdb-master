<script setup lang="ts">
const props = defineProps<{
  items: Media[]
  type: 'movie' | 'tv'
}>()

const router = useRouter()
</script>

<template>
  <div>
    <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div class="flex gap-4 min-w-max">
        <div
          v-for="item in props.items"
          :key="item.id"
          class="rounded-xl p-2 min-w-[250px] cursor-pointer"
          @click="router.push({
            name: 'detail',
            params: {
              type: props.type,
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
            {{ item.title || item.name }}
          </h3>
          <Star :vote-average="item?.vote_average ?? 0" />
        </div>
      </div>
    </div>
  </div>
</template>
