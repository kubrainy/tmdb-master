import type { Media, Person } from '~/type'

export const useDetailStore = defineStore('DetailStore', () => {
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Detail = ref<Media[]>([])
  const Credits = ref<Person[]>([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function fetchMovieDetail(id: number, mediaType: 'movie') {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    const data = await response.json()
    Detail.value = [data]
    await fetchDetail(id, mediaType)
  }
  async function fetchTvDetail(id: number, mediaType: 'tv') {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
    const data = await response.json()
    Detail.value = [data]
    await fetchDetail(id, mediaType)
  }
  async function fetchDetail(id: number, mediaType: 'movie' | 'tv') {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`, options)
    const data = await response.json()
    Credits.value = data.cast
  }

  return {
    fetchMovieDetail,
    Detail,
    accessToken,
    fetchTvDetail,
    fetchDetail,
    Credits,
  }
})
