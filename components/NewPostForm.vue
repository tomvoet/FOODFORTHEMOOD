<script lang="ts" setup>
import type { minimalRestaurant } from "@/customTypes"
import { useUserStore } from "@/stores/userStore"

const title = ref("")
const text = ref("")
const rating = ref(0)
const restaurantChoice = ref(0)
const chosenFood = ref("")

const restaurants = ref([] as minimalRestaurant[] | undefined | null)
const restaurantsStatus = ref(0)

const userStore = useUserStore()

const createPost = async () => {
    if (
        title.value == "" ||
        text.value == "" ||
        rating.value == 0 ||
        restaurantChoice.value == 0 ||
        chosenFood.value == ""
    ) {
        alert("Please fill out all fields")
        return
    }

    if (!userStore.loggedIn) {
        alert("You must be logged in to create a post")
        return
    }

    /*
    const { data: postData } = await useFetch("/api/post", {
        method: "POST",
        body: {
            title: title.value,
            text: text.value,
            rating: rating.value,
            restaurantId: restaurantChoice.value,
            chosenFood: chosenFood.value,
            authorId: userStore.user?.username,
        },
    })

    console.log(postData)
    */

    console.log(
        title.value,
        text.value,
        rating.value,
        restaurantChoice.value,
        chosenFood.value
    )
}

const updateRating = (newRating: number) => {
    rating.value = newRating
}

const { data: restaurantData } = useFetch(`/api/restaurant`, {
    key: `/api/restaurant`,
    server: false,
})

if (restaurantData) {
    restaurants.value = restaurantData.value?.restaurants
    restaurantsStatus.value = restaurantData.value?.status || 0
}

watch(restaurantData, (data) => {
    restaurants.value = data?.restaurants
    restaurantsStatus.value = data?.status || 0
})
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold">New Post</h1>
        <form @submit.prevent="createPost">
            <div class="p-3">
                <label for="title" class="block">Title</label>
                <input
                    id="title"
                    v-model="title"
                    class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                />
            </div>
            <div class="p-3">
                <label for="restaurant" class="block">Restaurant</label>
                <select
                    id="restaurant"
                    v-model="restaurantChoice"
                    class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option selected value="0">Select a restaurant</option>
                    <option
                        v-for="restaurant in restaurants"
                        :key="restaurant.id"
                        :value="restaurant.id"
                    >
                        {{ restaurant.name }}
                    </option>
                </select>
            </div>
            <div class="p-3">
                <label for="rating" class="block">Rating</label>
                <RatingSelector
                    :rating="rating"
                    @update-rating="updateRating"
                />
            </div>
            <div class="p-3">
                <label for="text" class="block resizable-y">Content</label>
                <textarea
                    id="text"
                    v-model="text"
                    class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>
            <div class="p-3">
                <label for="chosenFood" class="block">Chosen Food</label>
                <input
                    id="chosenFood"
                    v-model="chosenFood"
                    class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                />
            </div>
            <button
                type="submit"
                class="border p-1 rounded-[.35em] hover:bg-blue-500 hover:text-white"
            >
                Create Post
            </button>
        </form>
    </div>
</template>

<style scoped></style>
