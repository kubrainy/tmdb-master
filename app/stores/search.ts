import type { Media, MediaType } from '~/type'

export const useSearchStore = defineStore('SearchStore', () => {
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const searchResults = ref<Media[]>([])
  const searchQuery = ref<string>('')

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function searchDetail(query: string, type: MediaType) {
    if (!query.trim())
      return
    const response = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options)
    const data = await response.json()
    searchResults.value = data.results as Media[]
  }

  return {
    accessToken,
    searchResults,
    searchQuery,
    searchDetail,
  }
})
