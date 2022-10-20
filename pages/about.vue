<script lang="ts" setup>
onMounted(() => {
    console.log("mounted")
    setPageLayout("test")
})

setMetadata("About", "About page")
</script>

<template>
    <div>Page: foo</div>
</template>
