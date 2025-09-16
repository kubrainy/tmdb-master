<script setup lang="ts">
defineProps<{
  actor: Person
}>()
</script>

<template>
  <UAvatar
    :key="actor.id"
  >
    <div
      class="cursor-pointer rounded-full w-10 h-10 overflow-hidden"
      @click="navigateTo({
        name: 'actor-detail',
        params: { actor_id: actor.id },
      })"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`"
        :alt="actor.name"
        class="w-full h-full object-cover"
      >
    </div>
  </UAvatar>
</template>
