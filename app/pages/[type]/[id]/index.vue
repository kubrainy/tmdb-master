<script setup lang="ts">
definePageMeta({
  name: 'detail',
})
const route = useRoute()
const mediaType = route.params.type as 'tv' | 'movie'
const tvId = Number(route.params.id)
const movieId = Number(route.params.id)
const DetailStore = useDetailStore()

onMounted(async () => {
  if (mediaType === 'movie') {
    await DetailStore.fetchMovieDetail(movieId, 'movie')
  }
  else if (mediaType === 'tv') {
    await DetailStore.fetchTvDetail(tvId, 'tv')
  }
})
</script>

<template>
  <div>
    <div v-if="mediaType === 'movie'">
      <div class="w-full relative aspect-video">
        <div class="flex flex-row justify-center items-center absolute w-full z-2 p-28">
          <div class="flex flex-row mt-4 w-4/5  p-4 items-center">
            <img
              :src="`https://image.tmdb.org/t/p/w500${DetailStore.Detail[0]?.poster_path}`"
              alt="Movie Poster"
              class="w-[300px] rounded  flex-shrink-0 shadow-amber-200 shadow-lg"
            >
            <div class="ml-4 text-white flex-1 ">
              <h1 class="text-2xl font-bold mb-2">
                {{ DetailStore.Detail[0]?.title }}
              </h1>

              <p class="mb-4 whitespace-pre-line break-words">
                {{ DetailStore.Detail[0]?.overview }}
              </p>

              <p class="mb-2">
                <span class="font-bold text-amber-100">Türler: </span>
                {{ DetailStore.Detail[0]?.genres?.map(g => g.name).join(', ') }}
              </p>

              <p class="mb-2">
                <span class="font-bold text-amber-100">İlk Yayın Tarihi: </span>
                {{ DetailStore.Detail[0]?.release_date }}
              </p>

              <p class="mb-2">
                <span class="font-bold text-amber-100">Konuşulan Diller: </span>
                {{
                  Array.isArray(DetailStore.Detail[0]?.spoken_languages)
                    ? DetailStore.Detail[0].spoken_languages.map(l => l.english_name).join(', ')
                    : DetailStore.Detail[0]?.spoken_languages
                }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="absolute z-0 w-full h-[620px] bg-black/50 dark:bg-black/50" />
          <img
            :src="`https://image.tmdb.org/t/p/original${DetailStore.Detail[0]?.backdrop_path}`"
            alt="Movie Backdrop"
            class="absolute inset-0 w-full z-[-1] h-[620px] object-fill"
          >
        </div>
      </div>
    </div>

    <div v-else-if="mediaType === 'tv'">
      <div class="w-full relative aspect-video">
        <div class="flex flex-row justify-center items-center absolute w-full z-2 p-28">
          <div class="flex flex-row mt-4 w-4/5  p-4 items-center">
            <img
              :src="`https://image.tmdb.org/t/p/w500${DetailStore.Detail[0]?.poster_path}`"
              alt="TV Series Poster"
              class="w-[300px] rounded  flex-shrink-0 shadow-amber-200 shadow-lg"
            >
            <div class="ml-4 text-white flex-1 ">
              <h1 class="text-2xl font-bold mb-2 ">
                {{ DetailStore.Detail[0]?.name }}
              </h1>

              <p class="mb-4 whitespace-pre-line break-words">
                {{ DetailStore.Detail[0]?.overview }}
              </p>

              <p class="mb-2">
                <span class="font-bold text-amber-100">Türler: </span>
                {{ DetailStore.Detail[0]?.genres?.map(g => g.name).join(', ') }}
              </p>
              <p class="mb-2">
                <span class="font-bold text-amber-100">İlk Yayın Tarihi: </span>

                {{ DetailStore.Detail[0]?.release_date }}
              </p>
              <p class="mb-2">
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
            </div>
          </div>
        </div>
        <div>
          <div class="absolute z-0 w-full h-[620px] bg-black/50 dark:bg-black/50" />
          <img
            :src="`https://image.tmdb.org/t/p/original${DetailStore.Detail[0]?.backdrop_path}`"
            alt="TV Series Backdrop"
            class="absolute inset-0 w-full z-[-1] h-[620px] object-fill"
          >
        </div>
      </div>
    </div>
    <div class="justify-center items-center flex flex-col mt-4">
      <div class="flex flex-col mt-4 w-4/5 p-4">
        <p class="text-amber-400 text-lg font-semibold mb-4 border-4 border-amber-400 self-start">
          {{ mediaType === 'movie' ? 'Film Oyuncuları' : 'Dizi Oyuncuları' }}
        </p>

        <div class="flex overflow-x-auto gap-4">
          <div
            v-for="actor in DetailStore.Credits"
            :key="actor.id"
            class="rounded-lg shadow flex flex-col items-center cursor-pointer flex-shrink-0 w-36"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`"
              :alt="actor.name"
              class="rounded mb-0.5"
              width="150"
              height="150"
            >
            <p class="text-center px-2">
              {{ actor.character }}
            </p>
            <p class="text-center px-2">
              {{ actor.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
