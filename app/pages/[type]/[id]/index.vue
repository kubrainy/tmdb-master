<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

definePageMeta(
  {
    name: 'detail',
  },
)
const mediaStore = useMediaStore()
const router = useRouter()
const route = useRoute()
const mediaType = route.params.type as MediaType
const id = Number(route.params.id)

const voteAverage = computed(() => mediaStore.detail?.vote_average ?? 0)

const showAllReviews = ref(false)

function toggleReview(review: Review) {
  review.showFull = !review.showFull
}

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
  mediaStore.images.forEach((img) => {
    if (!map.has(img.file_path))
      map.set(img.file_path, img)
  })
  return Array.from(map.values())
})

const detail = ref<Media>()

onMounted(async () => {
  await Promise.all([
    mediaStore.fetchDetail({ id, mediaType }),
    mediaStore.fetchCredits({ id, mediaType }),
    mediaStore.fetchVideos({ id, mediaType }),
    mediaStore.fetchImages({ id, mediaType }),
    mediaStore.fetchReviews({ id, mediaType }),
    mediaStore.fetchSimilar({ id, mediaType }),
  ])
  if (!mediaStore.detail) {
    router.push({
      name: 'main',
    })
  }
  detail.value = mediaStore.detail
})

watch(() => route.params.id, async (newId) => {
  const id = Number(newId)
  await mediaStore.fetchDetail({ id, mediaType })
})
</script>

<template>
  <div class="w-full relative">
    <div class="relative w-full h-[300px] md:hidden">
      <img :src="`https://image.tmdb.org/t/p/original${detail?.backdrop_path}`" alt="Backdrop" class="w-full h-full object-cover brightness-50">
      <div class="absolute inset-0 flex flex-col justify-center items-center px-4 text-center text-white">
        <h1 class="text-lg font-bold mb-2 text-primary-400">
          {{ detail?.name ?? detail?.title }}
        </h1>
        <Star :vote-average="voteAverage" />
        <p class="text-sm">
          {{ detail?.overview }}
        </p>
      </div>
    </div>
    <div class="flex flex-row mt-4 px-4 gap-4 md:hidden ">
      <img :src="`https://image.tmdb.org/t/p/w500${detail?.poster_path}`" alt="Poster" class="w-[100px] rounded shadow-lg flex-shrink-0">
      <div class="flex-1 flex flex-col dark:text-white text-neutral-700 text-xs">
        <p class="mb-1">
          <span class="font-bold dark:text-primary-100 text-primary-300">Türler: </span>
          {{ detail?.genres?.map(g => g.name).join(', ') }}
        </p>

        <p class="mb-1">
          <span class="font-bold dark:text-primary-100 text-primary-300">İlk Yayın Tarihi: </span>
          {{ detail?.first_air_date ?? detail?.release_date }}
        </p>
        <p class="mb-1">
          <span class="font-bold dark:text-primary-100 text-primary-300">Konuşulan Diller: </span>
          {{ Array.isArray(detail?.spoken_languages) ? detail.spoken_languages.map(l => l.english_name).join(', ') : detail?.spoken_languages }}
        </p>
        <p v-if="mediaType === 'movie' && detail?.runtime" class="mb-1">
          <span class="font-bold dark:text-primary-100 text-primary-300">Süre: </span>
          {{ Math.floor(detail.runtime / 60) }} saat {{ detail.runtime % 60 }} dk
        </p>
        <p v-if="detail?.number_of_seasons" class="mb-1">
          <span class="font-bold dark:text-primary-100 text-primary-300">Sezon Sayısı: </span>
          {{ detail.number_of_seasons }}
        </p>
        <div class="mt-auto">
          <UAvatarGroup size="sm" :max="4">
            <ActorAvatar v-for="actor in mediaStore.Credits" :key="actor.id" :actor="actor" />
          </UAvatarGroup>
        </div>
      </div>
    </div>
    <div class="hidden md:block absolute w-full z-2 p-6 md:p-28">
      <div class="flex flex-col md:flex-row mt-4 w-full md:w-4/5 p-4 items-stretch">
        <img :src="`https://image.tmdb.org/t/p/w500${detail?.poster_path}`" alt="TV Series Poster`" class="w-[150px] md:w-[300px] lg:w-[300px] rounded flex-shrink-0 shadow-amber-200 shadow-lg mb-4 md:mb-0 object-cover">
        <div class="ml- text-white flex-1 md:ml-4 flex flex-col relative">
          <h1 class="text-xl md:text-2xl font-bold mb-2 text-center md:text-left text-primary-400">
            {{ detail?.name ?? detail?.title }}
          </h1>
          <Star :vote-average="voteAverage" />
          <p class="mb-4 whitespace-pre-line break-words text-left max-w-10/12">
            {{ detail?.overview }}
          </p>
          <p class="mb-2 text-center md:text-left">
            <span class="font-bold text-primary-100">Türler: </span>
            {{ detail?.genres?.map(g => g.name).join(', ') }}
          </p>
          <p class="mb-2 text-center md:text-left">
            <span class="font-bold text-primary-100">İlk Yayın Tarihi: </span>
            {{ detail?.first_air_date ?? detail?.release_date }}
          </p>
          <p class="mb-2 text-center md:text-left">
            <span class="font-bold text-primary-100">Konuşulan Diller: </span>
            {{ Array.isArray(detail?.spoken_languages) ? detail.spoken_languages.map(l => l.english_name).join(', ') : detail?.spoken_languages }}
          </p>
          <p v-if="mediaType === 'movie' && detail?.runtime" class="mb-2 text-center md:text-left">
            <span class="font-bold text-primary-100">Süre: </span>
            {{ Math.floor(detail.runtime / 60) }} saat {{ detail.runtime % 60 }} dk
          </p>
          <p v-if="detail?.number_of_seasons" class="mb-2">
            <span class="font-bold text-primary-100">Sezon Sayısı: </span>
            {{ detail.number_of_seasons }}
          </p>
          <UAvatarGroup size="xl" class="absolute bottom-2 left-2" :max="4">
            <ActorAvatar v-for="actor in mediaStore.Credits ?? []" :key="actor.id" :actor="actor" />
          </UAvatarGroup>
        </div>
      </div>
    </div>
    <div class="hidden sm:block relative w-full h-[700px] bg-gray-300 overflow-hidden">
      <img :src="`https://image.tmdb.org/t/p/original${detail?.backdrop_path}`" alt="TV Series Backdrop" class="brightness-50 w-full h-full object-cover sm:object-contain sm:object-right">
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent w-9/12" />
    </div>
  </div>

  <div class="px-4 md:w-4/5 md:mx-auto mt-4 rounded-lg p-4">
    <UTabs color="warning" variant="link" :items="items" class="w-full">
      <template #Video>
        <p class="text-gray-400 text-sm mb-2">
          Aradığınız filmle alakalı videoları buradan izleyebilirsiniz.
        </p>
        <div v-if="mediaStore.videos" class="overflow-x-auto">
          <div class="flex gap-4">
            <VideoIframe v-for="video in mediaStore.videos ?? []" :key="video.id" :video="video" />
          </div>
        </div>
        <div v-else class="text-white text-lg font-semibold text-center">
          Video bulunamadı.
        </div>
      </template>

      <template #Poster>
        <p class="text-gray-400 text-sm mb-2">
          Bu filme dair bütün afişleri burada görüntüleyebilirsiniz.
        </p>
        <div class="overflow-x-auto">
          <div class="flex gap-4">
            <PosterImg :images="uniqueImages" />
          </div>
        </div>
      </template>
    </UTabs>
  </div>

  <div class="px-4 md:w-4/5 md:mx-auto mt-4 rounded-lg p-4">
    <UTabs color="warning" variant="link" :items="[{ label: 'Benzer', slot: 'Similar' }]">
      <template #Similar>
        <p class="text-gray-400 text-sm mb-2">
          İlginizi çekebilecek benzer filmleri aşağıdan görüntüleyebilirsiniz.
        </p>
        <div v-if="mediaStore.reviews.length > 0" class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          <SimilarItem v-for="item in mediaStore.similar ?? []" :key="item.id" :item />
        </div>
        <div v-else class="text-white text-lg font-semibold text-center">
          Öneri bulunamadı.
        </div>
      </template>
    </UTabs>
  </div>

  <div class="px-4 md:w-4/5 md:mx-auto mt-4 rounded-lg p-4">
    <UTabs color="warning" variant="link" :items="[{ label: 'Yorumlar', slot: 'Reviews' }]">
      <template #Reviews>
        <div>
          <div v-if="(mediaStore.reviews ?? []).length > 0" class="space-y-4">
            <div
              v-for="review in (showAllReviews ? (mediaStore.reviews ?? []) : (mediaStore.reviews ?? []).slice(0, 3))"
              :key="review.id"
              class="p-4 border border-primary-400 rounded bg-primary-100 text-gray-700"
            >
              <h3 class="font-semibold mb-2">
                {{ review.author }}
              </h3>
              <p>
                {{ review.showFull ? review.content : review.content.slice(0, 120) }}
                <span v-if="!review.showFull && review.content.length > 120">...</span>
              </p>
              <UButton
                v-if="review.content.length > 120"
                class="mt-2 text-sm text-primary-400"
                variant="ghost"
                size="sm"
                @click="toggleReview(review)"
              >
                {{ review.showFull ? "Daha az göster" : "Daha fazlasını göster" }}
              </UButton>
            </div>

            <div v-if="(mediaStore.reviews ?? []).length > 3" class="text-center mt-4">
              <UButton color="warning" variant="soft" size="sm" @click="showAllReviews = !showAllReviews">
                {{ showAllReviews ? "Daha az yorum göster" : "Devamını gör" }}
              </UButton>
            </div>
          </div>

          <div v-else class="text-gray-400">
            Henüz yorum yok.
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>
