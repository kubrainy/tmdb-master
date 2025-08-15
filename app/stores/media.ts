import type { Media, MediaType } from '~/type'

export const useMediaStore = defineStore('MediaStore', () => {
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const medias = ref<Media[]>([])
  const tvSeries = ref<Media[]>([])
  const movies = ref<Media[]>([])
  const movieId = ref<number>()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function fetchMedias(type: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options)
    const data = await response.json()
    // medias.value.push(...data.results)
    medias.value = data.results as Media[]
  }

  return {
    accessToken,
    medias,
    fetchMedias,
    movieId,
    movies,
    tvSeries,

  }
})
