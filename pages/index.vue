
<script lang="ts" setup>
useAsyncData(async () => {
    const response: String = await $fetch('/api/hello')
    console.log(response, "test")
})
definePageMeta({
    title: 'Home',
    description: 'This is the home page',
})
</script>

<template>
    <div class="mainbg">
        <h1>Welcome</h1>Testss
    </div>
</template>

<style scoped>

</style>