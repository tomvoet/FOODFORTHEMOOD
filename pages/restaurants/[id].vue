<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch(`/api/restaurant/${route.params.id}`)

const restaurant = data.value?.restaurant

const { data: reviewData } = useFetch(
    `/api/restaurant/${route.params.id}/posts`
)

const reviews = computed(() => reviewData.value?.posts)
const reviewsStatus = computed(() => reviewData.value?.status)

setMetadata(
    restaurant?.name ? restaurant.name : "404",
    `Reviews of ${restaurant?.name ? restaurant.name : "404"}`
)
</script>

<template>
    <div>
        <h1>{{ restaurant?.name }}</h1>
        <p>{{ restaurant?.cuisines }}</p>
        <div v-if="reviewsStatus === 200" class="postsContainer">
            <PostComp
                v-for="review in reviews"
                :key="review.id"
                :post="review"
                :author="review.author"
                :restaurant="{ ...review.restaurant, id: review.restaurantId }"
                :favorites="review.favorites"
                :comments="review.comments"
            />
        </div>
    </div>
</template>

<style scoped>
.postsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1 {
    font-size: 2rem;
    display: inline-block;
}
</style>
