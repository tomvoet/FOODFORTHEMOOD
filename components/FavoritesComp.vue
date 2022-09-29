<script lang="ts" setup>
import type { singleLike } from "~~/customTypes"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    favorites?: singleLike[]
}>()

const isLiked = (favorites: singleLike[] | undefined) =>
    favorites?.some((favorite) => favorite.username == "tomvoet")
</script>

<template>
    <span :style="{ color: isLiked(favorites) ? 'red' : 'black' }"
        >♥{{ favorites ? favorites.length : "" }}</span
    >
</template>
