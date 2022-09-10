<script lang="ts" setup>
onMounted(() => {
  console.log("mounted")
  setPageLayout('test')
})
definePageMeta({
  title: 'About',
  description: 'This is the about page',
})
</script>

<template>
  <div>
    Page: foo
  </div>
</template>

<style scoped>

</style>
