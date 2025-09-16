export const useMediaStore = defineStore('MediaStore', () => {
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const medias = ref<Media[]>([])
  const tvSeries = ref<Media[]>([])
  const movies = ref<Media[]>([])
  const movieId = ref<number>()
  const videos = ref<Video[]>([])
  const similar = ref<Media[]>([])
  const reviews = ref<Review[]>([])
  const images = ref<Image[]>([])
  const Credits = ref<Person[]>([])
  const detail = ref<Media>()
  const moviePage = ref(1)
  const tvPage = ref(1)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function fetchVideos(req: FetchVideosReq) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${req.mediaType}/${req.id}/videos?language=en-US`,
      options,
    )
    const data = await response.json()
    videos.value = data.results as Video[]
  }

  async function fetchCredits(req: fetchCreditsReq) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${req.mediaType}/${req.id}/credits?language=en-US`,
      options,
    )
    const data = await response.json()
    Credits.value = data.cast
  }

  async function fetchSimilar(req: fetchSimilarReq) {
    if (!req.id)
      return
    const res = await fetch(
      `https://api.themoviedb.org/3/${req.mediaType}/${req.id}/similar?language=en-US&page=1`,
      options,
    )
    const data = await res.json()
    similar.value = data.results as Media[]
  }

  async function fetchReviews(req: fetchReviewsReq) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${req.mediaType}/${req.id}/reviews?language=en-US`,
      options,
    )
    const data = await response.json()
    reviews.value = data
  }

  async function fetchDetail(req: fetchDetailAllReq) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${req.mediaType}/${req.id}?language=en-US`,
      options,
    )
    const data = await response.json()
    detail.value = data ?? undefined
  }

  async function fetchImages(req: fetchImagesReq) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${req.mediaType}/${req.id}/images`,
      options,
    )
    const data = await response.json()
    images.value = data.posters as Image[]
  }

  async function fetchMedias(req: FetchMediasReq) {
    const page = req.page ?? 1

    let url = `https://api.themoviedb.org/3/discover/${req.mediaType}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`

    if (req.genreId) {
      url += `&with_genres=${req.genreId}`
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const results = data.results as Media[]

    if (req.append)
      medias.value.push(...results)
    else medias.value = results

    if (req.mediaType === 'movie') {
      if (req.append)
        movies.value.push(...results)
      else movies.value = results
      moviePage.value = page
    }
    else {
      if (req.append)
        tvSeries.value.push(...results)
      else tvSeries.value = results
      tvPage.value = page
    }

    return results
  }

  async function loadMoreMovies(genreId?: string) {
    moviePage.value++
    return fetchMedias({
      mediaType: 'movie',
      page: moviePage.value,
      append: true,
      genreId,
    })
  }

  async function loadMoreTv(genreId?: string) {
    tvPage.value++
    return fetchMedias({
      mediaType: 'tv',
      page: tvPage.value,
      append: true,
      genreId,
    })
  }

  return {
    medias,
    movies,
    tvSeries,
    movieId,
    moviePage,
    tvPage,
    fetchMedias,
    loadMoreMovies,
    loadMoreTv,
    fetchVideos,
    fetchReviews,
    reviews,
    fetchSimilar,
    fetchCredits,
    Credits,
    fetchDetail,
    detail,
    similar,
    videos,
    fetchImages,
    images,
  }
})
