<script setup lang="ts">
import type { simpleRestaurant } from "@/customTypes"

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

const reloadReviews = () => {
    refreshNuxtData()
}
/*
if (!reviewError.value) {
    loadReviews()
}
*/

const { data: statsData } = await useFetch(
    `/api/restaurant/${route.params.id}/stats`,
    {
        key: `restaurant/${route.params.id}/stats`,
        server: true,
    }
)

const stats = ref(statsData.value)

setMetadata(
    restaurant.value?.name ? restaurant.value?.name : "404",
    `Reviews of ${restaurant.value?.name ? restaurant.value?.name : "404"}`
)
</script>

<template>
    <div v-if="restaurantStatus == 200 && restaurant">
        <section class="flex p-6 flex-row justify-between items-center">
            <h2 class="text-3xl font-semibold">{{ restaurant?.name }}</h2>
            <p v-if="restaurant.cuisines.length" class="text-center">
                &bull;
                <template v-for="cuisine in restaurant.cuisines"
                    >{{ cuisine.name }} &bull;</template
                >
            </p>
            <p v-else>No Cuisines added yet</p>
            <div>
                <StarRating :rating="stats?.rating || 0" />
                <span>Reviews: {{ stats?.count || 0 }}</span>
            </div>
        </section>
        <NuxtPage />
    </div>
    <StatusComp v-else :status="restaurantStatus" />
</template>
