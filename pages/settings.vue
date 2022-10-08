<script setup lang="ts">
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()
const router = useRouter()
const username = ref("")
const email = ref("")
const password = ref("")
const passwordConfirm = ref("")
const bio = ref("")
const profilePicture = ref("img/blankpicture.png")

if (userStore.loggedIn && userStore.user) {
    username.value = userStore.user?.username
}

const getProfilePicture = async () => {
    const res = await $fetch(
        `/api/user/${userStore.user?.username}/profilepicture`
    )
    if (res.status === 200) {
        if (
            res?.image !== null &&
            res?.image !== "" &&
            res?.image !== undefined
        ) {
            profilePicture.value = res.image
        }
    }
}

const update = () => {
    return
}

onMounted(() => {
    if (!userStore.user || !userStore.user.username || !userStore.loggedIn) {
        router.push("/login")
        return
    }
    username.value = userStore.user?.username
    getProfilePicture()
})
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold">Settings</h1>
        <div class="p-3">
            <label for="username" class="block">Username</label>
            <input
                id="username"
                v-model="username"
                type="text"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="p-3">
            <label for="email" class="block">Email</label>
            <input
                id="email"
                v-model="email"
                type="email"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="p-3">
            <label for="password" class="block">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="p-3">
            <label for="passwordConfirm" class="block">Confirm Password</label>
            <input
                id="passwordConfirm"
                v-model="passwordConfirm"
                type="password"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="p-3">
            <label for="bio" class="block">Bio</label>
            <textarea
                id="bio"
                v-model="bio"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
        </div>
        <div class="p-3">
            <label for="profile-picture" class="block">Profile Picture</label>
            <input
                id="profile-picture"
                type="file"
                accept=".png, .jpg, .jpeg"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img :src="profilePicture" class="w-20 h-20 rounded-full" />
        </div>
        <button
            type="submit"
            class="border p-1 float-right"
            @click.prevent="update"
        >
            Update
        </button>
    </div>
</template>
