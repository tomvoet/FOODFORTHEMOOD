<script lang="ts" setup>
const route = useRoute()

const username = computed(() => route.params.username as string)

const { data } = useFetch(`/api/user/${username.value}/favorites`, {
    key: `user/${username.value}/favorites`,
    server: false,
})

const favorites = computed(() => data.value?.favorites)
const favoritesStatus = computed(() => data.value?.status)
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
