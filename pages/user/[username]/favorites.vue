<script lang="ts" setup>
import type { FullPost } from "@/customTypes"

const route = useRoute()

const username = computed(() => route.params.username as string)

const favorites = ref([] as FullPost[] | undefined | null)
const favoritesStatus = ref(0)

const { data: favData } = useFetch(`/api/user/${username.value}/favorites`, {
    key: `user/${username.value}/favorites`,
    server: false,
})

if (favData) {
    favorites.value = favData.value?.favorites
    favoritesStatus.value = favData.value?.status || 0
}

watch(favData, (data) => {
    favorites.value = data?.favorites
    favoritesStatus.value = data?.status || 0
})
</script>

<template>
    <div v-if="favoritesStatus == 200" class="postsContainer">
        <PostComp
            v-for="post in favorites"
            :key="post.id"
            :post="post"
            :author="{ username: username }"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :favorites="post.favorites"
            :comments="post.comments"
        />
    </div>
    <div v-else-if="favoritesStatus == 404">
        <h1>No posts found</h1>
    </div>
    <div v-else-if="favoritesStatus == 600">
        <h1>Something went wrong</h1>
    </div>
    <div v-else>
        <h1>Loading...</h1>
    </div>
</template>

<style scoped>
.postsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
