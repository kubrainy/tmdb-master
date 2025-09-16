<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref<NavigationMenuItem[][]>([])
const genresStore = useGenresStore()

const tvGenres = ref<Genre[]>([])
const movieGenres = ref<Genre[]>([])
const isOpen = ref(false)

onMounted(async () => {
  movieGenres.value = await genresStore.fetchGenres('movie')
  tvGenres.value = await genresStore.fetchGenres('tv')

  const closeMenu = () => {
    isOpen.value = false
  }

  items.value = [
    [
      {
        label: 'Home',
        icon: 'lucide:house',
        to: { name: 'main' },
        onSelect: closeMenu,
      },
      {
        label: 'Tv',
        icon: 'lucide:tv',
        to: { name: 'list', params: { type: 'tv' } },
        onSelect: closeMenu,
        children: tvGenres.value.map(g => ({
          label: g.name,
          to: { name: 'list', params: { type: 'tv' }, query: { genre: g.id } },
          onSelect: closeMenu,
        })),
      },
      {
        label: 'Movie',
        icon: 'lucide:clapperboard',
        to: { name: 'list', params: { type: 'movie' } },
        onSelect: closeMenu,
        children: movieGenres.value.map(g => ({
          label: g.name,
          to: { name: 'list', params: { type: 'movie' }, query: { genre: g.id } },
          onSelect: closeMenu,
        })),
      },
      {
        label: 'Search',
        icon: 'lucide:search',
        to: { name: 'search' },
        onSelect: closeMenu,
      },
    ],
    [
      {
        icon: isDark.value ? 'lucide:moon' : 'lucide:sun',
        onSelect: () => toggleTheme(),
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/kubracetinkaya1',
        target: '_blank',
        onSelect: closeMenu,
      },
    ],
  ]
})

function goBack() {
  if (isOpen.value) {
    isOpen.value = false
  }
  else {
    router.back()
  }
}
</script>

<template>
  <header class="w-full ring ring-default h-14 flex items-center justify-between px-4 z-50">
    <UButton
      icon="lucide:arrow-left"
      variant="ghost"
      class="md:hidden mr-2"
      @click="goBack"
    />

    <UNavigationMenu
      highlight-color="warning"
      orientation="horizontal"
      :items="items"
      class="hidden md:flex w-full"
    />

    <UButton
      class="md:hidden ml-auto"
      icon="lucide:menu"
      variant="ghost"
      @click="() => { isOpen = true; console.log('menu açıldı'); }"
    />

    <USlideover
      :open="isOpen"
      title="GOFLİX"
      description="İstediğiniz sayfaya aşağıdan ulaşabilirsiniz."
      side="right"
      class="max-w-[50vw]"
      @update:open="val => isOpen = val"
    >
      <template #body>
        <UNavigationMenu
          highlight-color="warning"
          orientation="vertical"
          :items="items"
          class="w-full"
        />
      </template>
    </USlideover>
  </header>
</template>
