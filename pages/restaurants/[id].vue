<script setup lang="ts">
import type { FullPost } from "@/customTypes"

const route = useRoute()

const { data } = await useFetch(`/api/restaurant/${route.params.id}`, {
    key: `restaurant/${route.params.id}`,
    server: true,
})

const restaurant = data.value?.restaurant
const restaurantStatus = data.value?.status || 0

const reviews = ref([] as FullPost[] | undefined | null)
const reviewsStatus = ref(0)

const { data: reviewsData } = useFetch(
    `/api/restaurant/${route.params.id}/posts`,
    {
        key: `restaurant/${route.params.id}/posts`,
        server: false,
    }
)

if (reviewsData) {
    reviews.value = reviewsData.value?.posts
    reviewsStatus.value = reviewsData.value?.status || 0
}

watch(reviewsData, (data) => {
    reviews.value = data?.posts
    reviewsStatus.value = data?.status || 0
})
setMetadata(
    restaurant?.name ? restaurant.name : "404",
    `Reviews of ${restaurant?.name ? restaurant.name : "404"}`
)
</script>

<template>
    <div v-if="restaurantStatus == 200 && restaurant">
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
        <StatusComp v-else :status="reviewsStatus" />
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
