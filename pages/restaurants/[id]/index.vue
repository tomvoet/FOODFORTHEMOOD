<script lang="ts" setup>
import type { ReducedPost } from "@/customTypes"

const route = useRoute()

const cursorObj = ref({} as { cursor: number })
const endOfFeed = ref(false)

const reviews = ref([] as ReducedPost[])
const reviewsStatus = ref(0)

const {
    data: reviewsData,
    error: reviewError,
    pending,
} = getRestaurantPostsLazy(route.params.id as string, cursorObj.value)

if (!reviewError.value && reviewsData && reviewsData.value) {
    if (reviewsData.value?.length === 0) {
        endOfFeed.value = true
    }
    reviews.value = reviewsData.value
    reviewsStatus.value = 200
}

watch(reviewsData, (data) => {
    if (data?.length === 0) {
        endOfFeed.value = true
    }
    reviews.value = data ? [...reviews.value, ...data] : []
    reviewsStatus.value = !reviewError.value ? 200 : 0
})
const reloadReviews = () => {
    refreshNuxtData()
}

const moveCursor = () => {
    if (reviews.value && reviews.value.length)
        cursorObj.value.cursor = reviews.value[reviews.value.length - 1].id
}

watch(cursorObj.value, () => {
    getRestaurantPostsLazy(String(route.params.id), cursorObj.value).then(
        (res) => {
            const data = res.data?.value as ReducedPost[]
            if (!data || data.length === 0) {
                endOfFeed.value = true
            } else if (data.length > 0) {
                reviews.value = [...reviews.value, ...data]
                reviewsStatus.value = !res.error.value ? 200 : 0
            }
        }
    )
})
</script>

<template>
    <LoadingComp v-if="pending" />
    <section
        v-else-if="reviewsStatus === 200"
        class="flex flex-col items-center"
    >
        <PostComp
            v-for="review in reviews"
            :key="review.id"
            :post="review"
            :author="review.author"
            :restaurant="{ ...review.restaurant, id: review.restaurantId }"
            :stats="{
                favoriteAmount: review.favoriteAmount,
                commentAmount: review.commentAmount,
                isFavorite: review.isFavorite,
            }"
            @reload-posts="reloadReviews"
        />
        <InfiniteScroll
            :end-of-feed="endOfFeed || (!pending && reviews.length < 10)"
            @load-more-posts="moveCursor"
        />
    </section>
    <StatusComp v-else :status="reviewsStatus" />
</template>
