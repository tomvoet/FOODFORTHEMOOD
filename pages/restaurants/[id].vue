<script setup lang="ts">
import type { FullPost, simpleRestaurant } from "@/customTypes"

const route = useRoute()

const restaurant = ref<simpleRestaurant>()
const restaurantStatus = useState("restaurantStatus", () => 0) //USESTATE DA SSR

const { data, error } = await useFetch(`/api/restaurant/${route.params.id}`, {
    key: `restaurant/${route.params.id}`,
    server: true,
    async onResponseError({ response }) {
        restaurantStatus.value = response.status
    },
})

if (!error.value && data.value) {
    restaurant.value = data.value
    restaurantStatus.value = 200
}

const reviews = ref([] as FullPost[] | undefined | null)
const reviewsStatus = ref(0)

const reloadReviews = () => {
    refreshNuxtData()
}

const loadReviews = () => {
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
}

if (!error.value) {
    loadReviews()
}

setMetadata(
    restaurant.value?.name ? restaurant.value?.name : "404",
    `Reviews of ${restaurant.value?.name ? restaurant.value?.name : "404"}`
)
</script>

<template>
    <div v-if="restaurantStatus == 200 && restaurant">
        <h2 class="text-3xl font-semibold">{{ restaurant?.name }}</h2>
        <p v-if="restaurant.cuisines.length" class="text-center">
            &bull;
            <template v-for="cuisine in restaurant.cuisines"
                >{{ cuisine.name }} &bull;</template
            >
        </p>
        <p v-else>No Cuisines added yet</p>
        <section
            v-if="reviewsStatus === 200"
            class="flex flex-col items-center"
        >
            <PostComp
                v-for="review in reviews"
                :key="review.id"
                :post="review"
                :author="review.author"
                :restaurant="{ ...review.restaurant, id: review.restaurantId }"
                :favorites="review.favorites"
                :comments="review.comments"
                @reload-posts="reloadReviews"
            />
        </section>
        <StatusComp v-else :status="reviewsStatus" />
    </div>
    <StatusComp v-else :status="restaurantStatus" />
</template>
