<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

//lang="ts" setup extend
<script setup>
await useAsyncData(async () => {
  const response = await $fetch('/api/hello')
  console.log(response)
})
</script>