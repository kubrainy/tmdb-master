import type { Media } from '~/type'

export const useMediaStore = defineStore('MediaStore', () => {
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Movies = ref<Media[]>([])
  const Tv = ref<Media[]>([])
  const movieId = ref<number>()
  const Detail = ref<Media[]>([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function fetchMovieList() {
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    const data = await response.json()
    Movies.value.push(...data.results)
  }
  async function fetchTvList() {
    const response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)
    const data = await response.json()
    Tv.value.push(...data.results)
  }


  return {
    fetchMovieList,
    Tv,
    accessToken,
    Movies,
    fetchTvList,
    Detail,
    movieId,
  }
})
