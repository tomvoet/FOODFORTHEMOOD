<script setup lang="ts">
defineProps<{
    rating: number
}>()
</script>

<template>
    <div class="relative">
        <div
            class="absolute z-10 top-0 left-0 overflow-hidden text-yellow-400"
            :style="{ width: `${rating * 20}%` }"
        >
            <span class="inline-block text-2xl">
                &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>
        </div>
        <div>
            <span class="inline-block text-2xl">
                &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>
        </div>
    </div>
</template>
