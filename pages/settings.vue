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
const fileInput = ref(null as HTMLInputElement | null)

const changePassword = ref(false)

if (!userStore.loggedIn) {
    navigateTo("/login")
}

const { data: userData, error } = await useFetch<{
    email: string
    username: string
    bio: string
    image: string
}>(`/api/user/${userStore.user?.username}/userdata`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${userStore.token}`,
    },
    server: true,
})

if (!error.value && userData && userData.value) {
    username.value = userData.value.username
    email.value = userData.value.email
    bio.value = userData.value?.bio || ""
    profilePicture.value = userData.value?.image || "img/blankpicture.png"
}

const getProfilePicture = async () => {
    try {
        const res = await $fetch(
            `/api/user/${userStore.user?.username}/profilepicture`
        )
        if (res !== null && res !== "" && res !== undefined) {
            profilePicture.value = res
        }
    } catch (err) {
        console.log(err)
    }
}

const update = async () => {
    const changedData: {
        email?: string
        password?: string
        bio?: string
        image?: string
    } = {}

    if (email.value !== userData.value?.email) {
        changedData.email = email.value
    }

    if (bio.value !== userData.value?.bio) {
        changedData.bio = bio.value
    }

    if (changePassword.value) {
        if (password.value !== passwordConfirm.value) {
            alert("Passwords do not match")
            return
        }
        changedData.password = password.value
    }

    if (
        profilePicture.value !== userData.value?.image &&
        profilePicture.value !== "img/blankpicture.png"
    ) {
        changedData.image = profilePicture.value
    }

    if (Object.keys(changedData).length === 0) {
        alert("No changes made")
        return
    }

    const { data: newUserData, error: newUserError } = await useFetch<{
        email: string
        username: string
        bio: string
        image: string
    }>(`/api/user/${userStore.user?.username}/userdata`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${userStore.token}`,
        },
        body: changedData,
    })

    if (!newUserError.value && newUserData && newUserData.value) {
        alert("Changes saved")
        navigateTo(`/user/${newUserData.value.username}`)
        setTimeout(() => {
            // suboptimal, but it works /////////////////////////////////////////
            location.reload()
        }, 0)
    }
}

const changeProfilePicture = () => {
    //convert to base64
    const file = fileInput.value?.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            profilePicture.value = reader.result as string
        }
    }
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
        <label
            for="default-toggle"
            class="inline-flex relative items-center cursor-pointer"
        >
            <input
                id="default-toggle"
                v-model="changePassword"
                type="checkbox"
                class="sr-only peer"
            />
            <div
                class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-black"
                >Change password</span
            >
        </label>
        <div v-if="changePassword" class="p-3">
            <label for="password" class="block">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div v-if="changePassword" class="p-3">
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
                ref="fileInput"
                type="file"
                accept=".png, .jpg, .jpeg"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @change="changeProfilePicture"
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
