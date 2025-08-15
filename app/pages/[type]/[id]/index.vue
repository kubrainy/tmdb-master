<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { computed } from 'vue'

definePageMeta({
  name: 'detail',
})

const router = useRouter()
const route = useRoute()
const mediaType = route.params.type as 'tv' | 'movie'
const tvId = Number(route.params.id)
const movieId = Number(route.params.id)
const DetailStore = useDetailStore()

const items = [
  {
    label: 'Video',
    slot: 'Video' as const,
  },

  {
    label: 'Poster',
    slot: 'Poster' as const,

  },

] satisfies TabsItem

const uniqueImages = computed(() => {
  const map = new Map<string, any>()
  DetailStore.images.forEach((img) => {
    if (!map.has(img.file_path)) {
      map.set(img.file_path, img)
    }
  })
  return Array.from(map.values())
})

onMounted(async () => {
  if (mediaType === 'movie') {
    await DetailStore.fetchMovieDetail(movieId)
  }
  else {
    await DetailStore.fetchTvDetail(tvId)
  }
})
</script>

<template>
  <div v-if="DetailStore.Detail.length !== 0">
    <div v-if="mediaType === 'movie'">
      <div class="w-full relative aspect-video">
        <div class="absolute w-full z-2 p-6 md:p-28">
          <div class="flex flex-col md:flex-row mt-4 w-full md:w-4/5 p-4 items-center md:items-start">
            <img
              :src="`https://image.tmdb.org/t/p/w500${DetailStore.Detail[0]?.poster_path}`"
              alt="Movie Poster"
              class="w-full max-w-[250px] md:w-[300px] rounded flex-shrink-0 shadow-amber-200 shadow-lg mb-4 md:mb-0"
            >

            <div class="text-white flex-1 md:ml-4">
              <h1 class="text-xl md:text-2xl font-bold mb-2 text-center md:text-left">
                {{ DetailStore.Detail[0]?.title }}
              </h1>

              <p class="mb-4 whitespace-pre-line break-words text-center md:text-left">
                {{ DetailStore.Detail[0]?.overview }}
              </p>

              <p class="mb-2 text-center md:text-left">
                <span class="font-bold text-amber-100">Türler: </span>
                {{ DetailStore.Detail[0]?.genres?.map(g => g.name).join(', ') }}
              </p>

              <p class="mb-2 text-center md:text-left">
                <span class="font-bold text-amber-100">İlk Yayın Tarihi: </span>
                {{ DetailStore.Detail[0]?.release_date }}
              </p>

              <p class="mb-2 text-center md:text-left">
                <span class="font-bold text-amber-100">Konuşulan Diller: </span>
                {{
                  Array.isArray(DetailStore.Detail[0]?.spoken_languages)
                    ? DetailStore.Detail[0].spoken_languages.map(l => l.english_name).join(', ')
                    : DetailStore.Detail[0]?.spoken_languages
                }}
              </p>

              <UAvatarGroup size="xl" class="mt-4" :max="4">
                <UAvatar
                  v-for="actor in DetailStore.Credits"
                  :key="actor.id"
                >
                  <div
                    class="cursor-pointer rounded-full w-10 h-10 overflow-hidden"
                    @click="router.push({
                      name: 'actor-detail',
                      params: { actor_id: mediaType },
                    })"
                  >
                    <img
                      :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`"
                      :alt="actor.name"
                      class="w-full h-full object-cover"
                    >
                  </div>
                </UAvatar>
              </UAvatarGroup>
            </div>
          </div>
        </div>

        <div class="relative w-full">
          <img
            :src="`https://image.tmdb.org/t/p/original${DetailStore.Detail[0]?.backdrop_path}`"
            alt="Movies Backdrop"
            class="w-full h-[620px] object-fill"
          >
          <div class="absolute inset-0 bg-black/40" />
        </div>
        <div class="w-4/5 mx-auto mt-4  rounded-lg p-4">
          <UTabs color="warning" variant="link" :items="items" class="w-full">
            <template #Video>
              <div v-if="DetailStore.videos.length" class="overflow-x-auto">
                <div class="flex gap-4">
                  <div
                    v-for="video in DetailStore.videos"
                    :key="video.id"
                    class="flex-shrink-0 w-full sm:w-[90%] md:w-[calc((100%/3)-1rem)]"
                  >
                    <iframe
                      v-if="video.site === 'YouTube'"
                      class="w-full aspect-video"
                      :src="`https://www.youtube.com/embed/${video.key}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    />
                  </div>
                </div>
              </div>
              <div
                v-else
                class=" text-white text-lg font-semibold"
              >
                Video bulunamadı.
              </div>
            </template>
            <template #Poster>
              <div class="overflow-x-auto">
                <div class="flex gap-4">
                  <div
                    v-for="img in uniqueImages"
                    :key="img.file_path"
                    class="flex-shrink-0"
                    style="width: 250px;"
                  >
                    <img
                      :src="`https://image.tmdb.org/t/p/w500${img.file_path}`"
                      class="rounded shadow w-full"
                      height="250"
                    >
                  </div>
                </div>
              </div>
            </template>
          </UTabs>
        </div>
      </div>
    </div>

    <div v-else-if="mediaType === 'tv'">
      <div class="w-full relative aspect-video">
        <div class=" absolute w-full z-2 p-6 md:p-28">
          <div class="flex flex-col md:flex-row mt-4  w-full md:w-4/5 p-4 items-center md:items-start">
            <img
              :src="`https://image.tmdb.org/t/p/w500${DetailStore.Detail[0]?.poster_path}`"
              alt="TV Series Poster"
              class=" w-full max-w-[250px] md:w-[300px] rounded  flex-shrink-0 shadow-amber-200 shadow-lg mb-4 md:mb-0"
            >
            <div class="ml-4 text-white flex-1 md:ml-4">
              <h1 class=" text-xl md:text-2xl font-bold mb-2 text-center md:text-left">
                {{ DetailStore.Detail[0]?.name }}
              </h1>

              <p class="mb-4 whitespace-pre-line break-words text-center md:text-left">
                {{ DetailStore.Detail[0]?.overview }}
              </p>

              <p class="mb-2 text-center md:text-left">
                <span class="font-bold text-amber-100">Türler: </span>
                {{ DetailStore.Detail[0]?.genres?.map(g => g.name).join(', ') }}
              </p>
              <p class="mb-2 text-center md:text-left">
                <span class="font-bold text-amber-100">İlk Yayın Tarihi: </span>

                {{ DetailStore.Detail[0]?.first_air_date }}
              </p>
              <p class="mb-2 text-center md:text-left">
                <span class="font-bold text-amber-100">Konuşulan Diller: </span>

                {{
                  Array.isArray(DetailStore.Detail[0]?.spoken_languages)
                    ? DetailStore.Detail[0].spoken_languages.map(l => l.english_name).join(', ')
                    : DetailStore.Detail[0]?.spoken_languages
                }}
              </p>
              <p class="mb-2">
                <span class="font-bold text-amber-100">Sezon Sayısı: </span>
                {{ DetailStore.Detail[0]?.number_of_seasons }}
              </p>
              <UAvatarGroup size="xl" class="mt-4" :max="4">
                <UAvatar
                  v-for="actor in DetailStore.Credits"
                  :key="actor.id"
                  class="cursor-pointer"
                  @click="router.push({
                    name: 'actor-detail',
                    params: { actor_id: mediaType },
                  })"
                >
                  <img
                    :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`"
                    :alt="actor.name"
                    class="rounded-full w-10 h-10 object-cover"
                  >
                </UAvatar>
              </UAvatarGroup>
            </div>
          </div>
        </div>

        <div class="relative w-full">
          <img
            :src="`https://image.tmdb.org/t/p/original${DetailStore.Detail[0]?.backdrop_path}`"
            alt="TV Series Backdrop"
            class="w-full h-[620px] object-fill"
          >
          <div class="absolute inset-0 bg-black/40" />
        </div>

        <div class="w-4/5 mx-auto mt-4 border-2 border-amber-200 rounded-lg p-4 ">
          <UTabs color="warning" variant="link" :items="items" class="w-full ">
            <template #Video>
              <div v-if="DetailStore.videos.length" class="overflow-x-auto">
                <div class="flex gap-4">
                  <div
                    v-for="video in DetailStore.videos"
                    :key="video.id"
                    class="flex-shrink-0 w-full sm:w-[90%] md:w-[calc((100%/3)-1rem)] "
                  >
                    <iframe
                      v-if="video.site === 'YouTube'"
                      class="w-full aspect-video"
                      :src="`https://www.youtube.com/embed/${video.key}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    />
                  </div>
                </div>
              </div>
              <div
                v-else
                class=" text-white text-lg font-semibold"
              >
                Video bulunamadı.
              </div>
            </template>
            <template #Poster>
              <div class="overflow-x-auto">
                <div class="flex gap-4">
                  <div
                    v-for="img in uniqueImages"
                    :key="img.file_path"
                    class="flex-shrink-0"
                    style="width: 250px;"
                  >
                    <img
                      :src="`https://image.tmdb.org/t/p/w500${img.file_path}`"
                      class="rounded shadow w-full"
                      height="250"
                    >
                  </div>
                </div>
              </div>
            </template>
          </UTabs>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-full flex justify-center items-center">
    <div class="w-12 h-12 border-2 rounded-full border-l-primary-200 border-t-primary-400 border-r-primary-600 border-b-primary-800 animate-spin" />
  </div>
</template>
