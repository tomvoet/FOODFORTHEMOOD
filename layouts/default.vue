<script lang="ts" setup>
const route = useRoute()

onMounted(() => {
  document.onscroll = () => {
    const nav = document.getElementById("nav")
    if (nav) {
      if (window.scrollY > 0) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }
    }
  }
})

useHead({
  title: `Testapp - ${route.meta.title}`,
})
</script>

<template>
  <div id="app">
    <Navbar id="nav" />
    Layout: default
    <slot />
  </div>
</template>

<style scoped>

</style>
