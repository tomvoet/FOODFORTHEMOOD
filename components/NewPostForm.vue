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

const { $bus } = useNuxtApp()

const userStore = useUserStore()

const submitPost = async () => {
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

    if (!userStore.loggedIn || !userStore.user?.username) {
        alert("You must be logged in to create a post")
        return
    }

    const res = await createPost({
        title: title.value,
        text: text.value,
        rating: rating.value,
        restaurantId: restaurantChoice.value,
        chosenFood: chosenFood.value,
        authorId: userStore.user?.username,
    })

    if (res.status.code === 203 && res.post) {
        title.value = ""
        text.value = ""
        rating.value = 0
        restaurantChoice.value = 0
        chosenFood.value = ""
        $bus.$emit("newPost", res.post)
    } else {
        alert(`Error: ${res.status.code} - ${res.status.message}`)
    }
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
        <form @submit.prevent="submitPost">
            <div class="p-3">
                <TextInput
                    v-model="title"
                    field="Title"
                    type="text"
                    placeholder="Title"
                />
            </div>
            <div class="p-3">
                <label for="restaurant" class="block">Restaurant</label>
                <select
                    id="restaurant"
                    v-model="restaurantChoice"
                    class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                <TextAreaComp
                    v-model="text"
                    field="Content"
                    placeholder="Write down youre review in here..."
                />
            </div>
            <div class="p-3">
                <TextInput
                    v-model="chosenFood"
                    field="Chosen Food"
                    placeholder="What did you eat?"
                    type="text"
                />
            </div>
            <div class="p-3">
                <button
                    type="submit"
                    class="border p-1 rounded-md hover:bg-blue-500 hover:text-white float-right"
                >
                    Create Post
                </button>
            </div>
        </form>
    </div>
</template>
