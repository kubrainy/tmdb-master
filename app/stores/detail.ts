import type { Media } from '~/type'

export const useDetailStore = defineStore('DetailStore', () => {
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Detail = ref<Media[]>([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function fetchMovieDetail(id: number) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    const data = await response.json()
    Detail.value = [data]
  }
  async function fetchTvDetail(id: number) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
    const data = await response.json()
    Detail.value = [data]
  }

  return {
    fetchMovieDetail,
    Detail,
    accessToken,
    fetchTvDetail,
  }
})
