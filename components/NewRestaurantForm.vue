<script lang="ts" setup>
import { Cuisine } from ".prisma/client"
import { useUserStore } from "@/stores/userStore"
import { restaurantSchema } from "@/utils/validation_schemas"

const name = ref("")
const selectedCuisines = ref([] as Cuisine[])
const state = ref("")
const city = ref("")
const street = ref("")
const houseNum = ref("")
const zip = ref("")
const phone = ref("")
const website = ref("")

const cuisines = ref([] as Cuisine[] | undefined | null)
const cuisinesStatus = ref(0)

const { $bus } = useNuxtApp()

const userStore = useUserStore()

const submitRestaurant = async () => {
    if (
        name.value == "" ||
        selectedCuisines.value.length == 0 ||
        state.value == "" ||
        city.value == "" ||
        street.value == "" ||
        houseNum.value == "" ||
        zip.value == ""
    ) {
        useToasts().value.push({
            message: "Please fill out all mandatory fields",
            type: "error",
            start: new Date(),
        })
        return
    }

    if (!userStore.loggedIn || !userStore.user?.username) {
        useToasts().value.push({
            message: "You have to be logged in create a restaurant",
            type: "error",
            start: new Date(),
        })
        return
    }

    const restaurantData = {
        name: name.value,
        cuisines: selectedCuisines.value,
        state: state.value,
        city: city.value,
        street: street.value,
        houseNum: houseNum.value,
        zip: zip.value,
        phone: phone.value,
        website: website.value,
    }

    try {
        restaurantSchema.parse(restaurantData)
    } catch (e) {
        displayValidationErrors(e)
        return
    }

    const res = await createRestaurant(restaurantData)

    if (res.status.code === 203 && res.restaurant) {
        name.value = ""
        selectedCuisines.value = []
        state.value = ""
        city.value = ""
        street.value = ""
        houseNum.value = ""
        zip.value = ""
        phone.value = ""
        website.value = ""
        useToasts().value.push({
            message: "Created new Restaurant",
            type: "success",
            start: new Date(),
        })
        $bus.$emit("newRestaurant", res.restaurant)
    } else {
        useToasts().value.push({
            message: `Error: ${res.status.code} - ${res.status.message}`,
            type: "error",
            start: new Date(),
        })
    }
}

const { data: cuisineData } = useFetch(`/api/cuisine`, {
    key: `/api/cuisine`,
    server: false,
})

console.log(cuisineData.value)

if (cuisineData) {
    cuisines.value = cuisineData.value
    cuisinesStatus.value = cuisineData.value ? 200 : 404
}

watch(cuisineData, (data) => {
    cuisines.value = data
    cuisinesStatus.value = cuisineData.value ? 200 : 404
})

const tes = () => {
    console.log(selectedCuisines.value)
}
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold" @click="tes()">New Restaurant</h1>
        <form @submit.prevent="submitRestaurant">
            <div class="p-3">
                <TextInput
                    v-model="name"
                    field="Name"
                    type="text"
                    placeholder="Name"
                />
            </div>
            <div class="p-3">
                <label for="cuisines" class="block font-medium text-gray-700"
                    >Cuisines</label
                >
                <select
                    id="cuisines"
                    v-model="selectedCuisines"
                    class="block w-full border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    multiple
                >
                    <option
                        v-for="cuisine in cuisines"
                        :key="cuisine.id"
                        :value="cuisine"
                    >
                        {{ cuisine.name }}
                    </option>
                </select>
            </div>
            <div class="p-3">
                <TextInput
                    v-model="state"
                    field="State"
                    placeholder="State"
                    type="text"
                />
            </div>
            <div class="p-3">
                <TextInput
                    v-model="city"
                    field="City"
                    placeholder="City"
                    type="text"
                />
            </div>
            <div class="p-3">
                <TextInput
                    v-model="zip"
                    field="Zip Code"
                    placeholder="Zip Code"
                    type="text"
                />
            </div>
            <div class="p-3">
                <TextInput
                    v-model="street"
                    field="Street"
                    placeholder="Street"
                    type="text"
                />
            </div>
            <div class="p-3">
                <TextInput
                    v-model="houseNum"
                    field="House Number"
                    placeholder="House Number"
                    type="text"
                />
            </div>
            <div class="p-3">
                <TextInput
                    v-model="phone"
                    field="Phone Number"
                    placeholder="Phone Number"
                    type="text"
                />
            </div>
            <div class="p-3">
                <TextInput
                    v-model="website"
                    field="Website"
                    placeholder="Website"
                    type="text"
                />
            </div>
            <div class="p-3">
                <button
                    type="submit"
                    class="border p-1 rounded-md hover:bg-blue-500 hover:text-white float-right"
                >
                    Create Restaurant
                </button>
            </div>
        </form>
    </div>
</template>
