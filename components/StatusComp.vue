<script lang="ts" setup>
const props = defineProps<{
    status: number
}>()
</script>

<template>
    <div class="w-full h-[60vh] flex items-center justify-center">
        <div v-if="status == 404">
            <span class="text-3xl font-bold">No posts found</span>
        </div>
        <div v-else-if="status == 600">
            <span class="text-3xl font-bold">Something went wrong</span>
            <p>Try again at a later time</p>
        </div>
        <div v-else>
            <LoadingComp />
        </div>
    </div>
</template>
