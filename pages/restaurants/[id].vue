<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch(`/api/restaurant/${route.params.id}`)

const restaurant = data.value?.restaurant

const { data: reviews } = await useFetch(
    `/api/restaurant/${route.params.id}/posts`
)

setMetadata(
    restaurant?.name ? restaurant.name : "404",
    `Reviews of ${restaurant?.name ? restaurant.name : "404"}`
)
</script>

<template>
    <div>
        <h1>{{ restaurant?.name }}</h1>
        <p>{{ restaurant?.cuisines }}</p>
        <div v-if="reviews" class="postsContainer">
            {{ reviews }}
        </div>
    </div>
</template>

<style scoped></style>
