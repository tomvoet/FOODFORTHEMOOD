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
            <span class="text-3xl font-bold">
                <nuxt-img
                    :src="'img\nudel.webp'"
                    class="w-50 h-50 mr-3 animate-spin"
                    sizes="sm:80vw md:7vw"
                />
                <!--
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
                >-->Loading...
            </span>
        </div>
    </div>
</template>
