<script lang="ts" setup>
const props = defineProps<{
    status: number
}>()
</script>

<template>
    <div class="w-full h-[60vh] flex items-center justify-center">
        <div v-if="status == 404">
            <h1 class="text-3xl font-bold">No posts found</h1>
        </div>
        <div v-else-if="status == 600">
            <h1 class="text-3xl font-bold">Something went wrong</h1>
            <p>Try again at a later time</p>
        </div>
        <div v-else>
            <h1 class="text-3xl font-bold">Loading...</h1>
        </div>
    </div>
</template>
