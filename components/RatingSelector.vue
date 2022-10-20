<script lang="ts" setup>
const emits = defineEmits<{
    (e: "updateRating", val: number): void
}>()

defineProps<{
    rating: number
}>()

const updateRating = (newRating: number) => {
    emits("updateRating", newRating)
}
</script>

<template>
    <div class="ratingContainer">
        <span
            v-for="i in 5"
            :key="'star_' + i"
            class="star"
            :name="6 - i"
            :class="{ choice: rating == 6 - i }"
            @click="updateRating(6 - i)"
            >&#9733;</span
        >
    </div>
</template>

<style>
.star {
    font-size: 2rem;
    cursor: pointer;
    float: right;
}

.star:hover {
    color: #b8b8b8 !important;
}

.star:hover ~ .star {
    color: #b8b8b8;
}

.ratingContainer {
    width: max-content;
}

.choice {
    color: #ffd700;
    text-shadow: 0px 0px 4px rgb(255 0 0);
}

.choice ~ .star {
    color: #ffd700;
}
</style>
