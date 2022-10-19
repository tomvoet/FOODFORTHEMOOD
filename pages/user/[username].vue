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

let navBarHeight = ref(0)

onMounted(() => {
    navBarHeight.value = document.getElementById("header")?.clientHeight || 0
})

setMetadata(
    user?.username ? user.username : "404",
    `Profile of ${user?.username ? user.username : "404"} and their posts.`
)
</script>

<template>
    <div v-if="userStatus == 200 && user">
        <div
            class="flex flex-row p-12 md:p-3 items-center justify-around md:justify-start"
        >
            <nuxt-img
                :src="img || 'img/blankpicture.png'"
                :alt="`${user.username}'s Profile Picture`"
                class="object-cover rounded-full w-32 md:w-32 shadow-lg aspect-square"
                sizes="sm:80vw md:7vw"
            />
            <h2 class="inline-block w-min md:pl-12 text-3xl font-semibold">
                {{ user?.username }}
            </h2>
        </div>
        <blockquote class="p-6">
            {{ user?.bio }}
        </blockquote>
        <div
            class="border-t border-b shadow-md sticky bg-white z-10"
            :style="{ top: navBarHeight - 1 + 'px' }"
        >
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
