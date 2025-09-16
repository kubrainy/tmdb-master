<script setup lang="ts">
defineProps<{
  video: Video
}>()
</script>

<template>
  <div
    :key="video.id"
    class="flex-shrink-0 w-full sm:w-[90%] md:w-[calc((100%/3)-1rem)] "
  >
    <iframe
      v-if="video.site === 'YouTube'"
      class="w-full aspect-video"
      :src="`https://www.youtube.com/embed/${video.key}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
</template>
