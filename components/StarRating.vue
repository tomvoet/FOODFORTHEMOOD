<script setup lang="ts">
defineProps<{
    rating: number
}>()
</script>

<template>
    <div class="flex flex-row items-center">
        <div
            v-for="i in 5"
            :key="i"
            class="mr-2 text-xl"
            :class="{ 'text-yellow-500': i <= rating }"
        >
            &#9733;
        </div>
    </div>
</template>
