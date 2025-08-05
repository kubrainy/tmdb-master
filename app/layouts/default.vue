<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col h-screen w-screen">
    <Header />
    <main
      class="flex-1 overflow-x-auto  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-700
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-500"
    >
      <slot />
    </main>
    <Footer />
  </div>
</template>
