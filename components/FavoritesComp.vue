<script lang="ts" setup>
import type { singleLike } from "~~/customTypes"
import { useUserStore } from "@/stores/userStore"
//import { HeartIcon as HeartOutline } from "@heroicons/vue/24/outline"
//import { HeartIcon as HeartSolid } from "@heroicons/vue/24/solid"

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
    <div class="max-w-max flex flex-row">
        <!--
        <HeartSolid v-if="isLiked(favorites)" class="h-6 w-6 text-red-500" />
        <HeartOutline v-else class="h-6 w-6" />-->{{
            favorites ? favorites.length : ""
        }}
    </div>
</template>
