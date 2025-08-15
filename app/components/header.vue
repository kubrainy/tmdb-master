<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>
([
  [
    {
      label: 'Home',
      icon: 'lucide:house',
      to: { name: 'main' },

    },
    {
      label: 'Tv',
      icon: 'lucide:tv',
      to: { name: 'list', params: { type: 'tv' } },
    },
    {
      label: 'Movie',
      icon: 'lucide:clapperboard',
      to: { name: 'list', params: { type: 'movie' } },

    },
    {
      label: 'Search',
      icon: 'lucide:search',
      to: { name: 'search' },
    },
  ],

  [
    {
      icon: 'lucide:sun',
      onSelect: () => toggleTheme(),

    },
    {
      icon: 'i-simple-icons-github',
      to: 'https://github.com/kubracetinkaya1',
      target: '_blank',
    },
  ],

])
</script>

<template>
  <header class="w-full border-b-2 border-amber-400 h-14 flex items-center">
    <UNavigationMenu color="primary" variant="link" :items="items" class="w-full" size="xl" />
  </header>
</template>
