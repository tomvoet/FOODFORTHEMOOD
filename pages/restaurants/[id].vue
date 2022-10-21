<script setup lang="ts">
import type { ReducedPost, simpleRestaurant } from "@/customTypes"

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
        <NuxtPage />
    </div>
    <StatusComp v-else :status="restaurantStatus" />
</template>
