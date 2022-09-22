<script setup lang="ts">
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    rating: number
}>()
</script>

<template>
    <div class="starRating">
        <div v-for="i in 5" :key="i" class="star">
            🔆
        </div>
    </div>
</template>

<style scoped>
    .starRating {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .star {
        margin-right: 0.5rem;
    }
</style>