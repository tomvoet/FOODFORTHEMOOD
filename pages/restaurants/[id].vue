<script setup lang="ts">
import type { ExtendedRestaurant } from "@/customTypes"

const route = useRoute()

const restaurant = useState<ExtendedRestaurant | null>(
    "restaurant/" + route.params.id,
    () => null
)
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
        <section
            class="flex p-6 flex-row justify-between items-center flex-wrap"
        >
            <h2 class="text-3xl font-semibold w-full sm:w-1/2 md:w-1/4">
                {{ restaurant?.name }}
            </h2>

            <div class="w-full sm:w-1/2 md:w-1/4">
                <StarRating :rating="stats?.rating || 0" />
                <span>Reviews: {{ stats?.count || 0 }}</span>
            </div>

            <p
                v-if="restaurant.cuisines.length"
                class="text-left sm:text-center w-full sm:w-1/2 md:w-1/4"
            >
                &bull;
                <template v-for="cuisine in restaurant.cuisines"
                    >{{ cuisine.name }} &bull;</template
                >
            </p>
            <p v-else class="w-full sm:w-1/2 md:w-1/4">No Cuisines added yet</p>

            <div class="flex flex-col w-full sm:w-1/2 md:w-1/4">
                <span>
                    <span class="font-semibold">State:</span>
                    {{ restaurant?.state }}
                </span>
                <span>
                    <span class="font-semibold">City:</span>
                    {{ restaurant?.city }}
                </span>
                <span>
                    <span class="font-semibold">Address:</span>
                    {{ restaurant?.street }} {{ restaurant?.houseNum }} <br />
                    {{ restaurant?.zip }} {{ restaurant?.city }}
                    <br />
                    {{ restaurant?.state }}
                </span>
            </div>
        </section>
        <NuxtPage />
    </div>
    <StatusComp v-else :status="restaurantStatus" />
</template>
