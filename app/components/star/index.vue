<script setup lang="ts">
const props = defineProps<{
  voteAverage: number
}>()

function fullStar(index: number) {
  const vote = props.voteAverage / 2
  let i = (vote - (index - 1)) * 100
  if (i > 100)
    i = 100
  if (i < 0)
    i = 0
  return `${i}%`
}
</script>

<template>
  <div class="flex">
    <div v-for="index in 5" :key="index" class="relative text-primary-400">
      <div
        class="absolute  flex-row gap-2 inset-0 overflow-hidden"
        :style="{ width: fullStar(index) }"
      >
        <UIcon name="heroicons:star-solid" class="text-primary-400" />
      </div>

      <UIcon name="lucide:star" class="" />
    </div>
  </div>
</template>
