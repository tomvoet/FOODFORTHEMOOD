<script lang="ts" setup>
import { singleLike } from '~~/customTypes';

const props = defineProps<{
    favorites?: singleLike[]
}>()

const isLiked = (favorites: singleLike[] | undefined) => favorites?.some(favorite => favorite.username == 'tomvoet')

</script>

<template>
    <span :style="{ color: isLiked(favorites) ? 'red' : 'black' }">♥{{ favorites ? favorites.length : ""}}</span>
</template>