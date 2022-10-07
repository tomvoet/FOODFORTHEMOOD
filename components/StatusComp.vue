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
            <h1 class="text-3xl font-bold">
                <svg
                    class="animate-spin h-9 w-9 mr-3 float-left"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="200px"
                    height="200px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke="#ff7d7d"
                        stroke-width="10"
                        r="35"
                        stroke-dasharray="164.93361431346415 56.97787143782138"
                        transform="matrix(1,0,0,1,0,0)"
                    ></circle></svg
                >Loading...
            </h1>
        </div>
    </div>
</template>
