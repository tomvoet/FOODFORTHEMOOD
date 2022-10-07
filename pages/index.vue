<script lang="ts" setup>
import { getAllPosts } from "@/composables/getAllPosts"

const { posts, status } = await getAllPosts() // maybe remove await for better performance and non blocking nav

setMetadata("Posts", "Current feed of posts")

const reloadPosts = () => {
    //refresh() //refresh auf jeden fall für pagination
    //refreshNuxtData()
}
</script>

<template>
    <div v-if="status.code === 200" class="postsContainer">
        <PostComp
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :author="post.author"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :favorites="post.favorites"
            :comments="post.comments"
            @reload-comments="reloadPosts"
        />
    </div>
    <div v-else>
        <StatusComp :status="status.code" />
    </div>
</template>

<style scoped>
.postsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
