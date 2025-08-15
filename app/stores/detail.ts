import type { Image, Media, MediaType, Person, Review, Video } from '~/type'

export const useDetailStore = defineStore('DetailStore', () => {
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Detail = ref<Media[]>([])
  const Credits = ref<Person[]>([])
  const videos = ref<Video[]>([])
  const images = ref<Image[]>([])
  const reviews = ref<Review[]>([])

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

    await fetchDetail(id, 'movie')
    await fetchVideos(id, 'movie')
    await fetchImages(id, 'movie')
    await fetchReviews(id, 'movie')
  }

  async function fetchTvDetail(id: number ) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
    const data = await response.json()
    Detail.value = [data]

    await fetchDetail(id, 'tv')
    await fetchVideos(id, 'tv')
    await fetchImages(id, 'tv')
    await fetchReviews(id, 'tv')
  }

  async function fetchDetail(id: number, mediaType: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`, options)
    const data = await response.json()
    Credits.value = data.cast
  }

  async function fetchVideos(id: number, mediaType: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`, options)
    const data = await response.json()
    videos.value = data.results as Video[]
  }

  async function fetchImages(id: number, mediaType: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/images`, options)
    const data = await response.json()
    images.value = data.posters as Image[] 
  }

  async function fetchReviews(id: number, mediaType: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/reviews?language=en-US`, options)
    const data = await response.json()
    reviews.value = data.results as Review[]
  }

  return {
    fetchMovieDetail,
    fetchTvDetail,
    fetchDetail,
    fetchVideos,
    fetchImages,
    fetchReviews,
    Detail,
    Credits,
    videos,
    images,
    reviews,
    accessToken,
  }
})
