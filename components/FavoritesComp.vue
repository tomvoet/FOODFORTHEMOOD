<script lang="ts" setup>
import type { singleLike } from "~~/customTypes"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    favorites?: singleLike[]
}>()

const isLiked = (favorites: singleLike[] | undefined) =>
    userStore.loggedIn &&
    favorites?.some((favorite) => favorite.username == userStore.user?.username)
</script>

<template>
    <span
        :style="{ color: isLiked(favorites) ? 'red' : 'black' }"
        class="text-3xl cursor-pointer"
        >♥{{ favorites ? favorites.length : "" }}</span
    >
</template>
