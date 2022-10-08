<script lang="ts" setup>
import type { User } from "@prisma/client"

const route = useRoute()

const username = computed(() => route.params.username as string)

const { data: userData } = await useFetch<{
    status: number
    user: User | null
}>(`/api/user/${username.value}`, {
    key: `user/${username.value}`,
    server: true,
})

const userStatus = userData.value?.status
const user = userData.value?.user

const img = ref("")

useFetch<{ status: number; image: string | null }>(
    `/api/user/${username.value}/profilepicture`,
    {
        key: `user/${username.value}/profilepicture`,
    }
).then((res) => {
    if (res.data.value?.status === 200) {
        if (res.data.value?.image) {
            img.value = res.data.value?.image
        }
    }
})

setMetadata(
    user?.username ? user.username : "404",
    `Profile of ${user?.username ? user.username : "404"} and their posts.`
)
</script>

<template>
    <div v-if="userStatus == 200 && user">
        <div class="flex flex-col md:flex-row p-12 md:p-3 md:items-center">
            <nuxt-img
                :src="img || 'img/blankpicture.png'"
                :alt="`${user.username}'s Profile Picture`"
                class="profilePicture"
                sizes="sm:80vw md:7vw"
            />
            <h1 class="inline-block w-min md:pl-12">{{ user?.username }}</h1>
        </div>
        <blockquote class="p-6">
            {{ user?.bio }}
        </blockquote>
        <div class="border-t border-b shadow-md">
            <NuxtLink
                class="w-1/2 inline-block text-center hover:bg-gray-100 p-2"
                :to="`/user/${username}`"
                :class="
                    route.fullPath === `/user/${username}`
                        ? 'text-blue-500 font-bold'
                        : ''
                "
                >Posts</NuxtLink
            >
            <NuxtLink
                class="w-1/2 inline-block text-center border-l hover:bg-gray-100 p-2"
                :to="`/user/${username}/favorites`"
                :class="
                    route.fullPath !== `/user/${username}`
                        ? 'text-blue-500 font-bold'
                        : ''
                "
                >Favorites</NuxtLink
            >
        </div>
        <NuxtPage />
    </div>
    <div v-else-if="userStatus == 404">404</div>
    <div v-else>Loading...</div>
</template>

<style scoped>
h1 {
    font-size: 2rem;
    display: inline-block;
}

.profilePicture {
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    aspect-ratio: 1 / 1;
}
</style>
