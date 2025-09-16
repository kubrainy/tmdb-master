export const useGenresStore = defineStore('GenresStore', () => {
  
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const genres = ref<{ id: number, name: string }[]>([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function fetchGenres(type: MediaType) {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
      options,
    )
    const data = await response.json()
    genres.value = data.genres

    return data.genres
  }
  
  return {
    genres,
    fetchGenres,
  }
})
