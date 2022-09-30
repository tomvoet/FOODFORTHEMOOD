<script lang="ts" setup>
const route = useRoute()

const username = computed(() => route.params.username as string)

const { data: postsData } = useFetch(`/api/user/${username.value}/posts`, {
    key: `user/${username.value}/posts`,
    server: false,
})

const posts = computed(() => postsData.value?.posts)
const postsStatus = computed(() => postsData.value?.status)
</script>

<template>
    <div v-if="postsStatus == 200" class="postsContainer">
        <PostComp
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :author="{ username: username }"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :favorites="post.favorites"
            :comments="post.comments"
        />
    </div>
    <div v-else-if="postsStatus == 404">
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
