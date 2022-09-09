<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup>
await useAsyncData(async () => {
  const response = await $fetch('/api/hello')
  console.log(response)
})
</script>