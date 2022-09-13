<script lang="ts" setup>
import { getAllPosts } from "@/composables/getAllPosts"

const { status, posts } = await getAllPosts() // maybe remove await for better performance and non blocking nav

definePageMeta({
    title: "Home",
    description: "This is the home page",
})
</script>

<template>
    <div v-if="status === 200" class="postsContainer">
        <PostComp
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :author="post.author"
        />
    </div>
</template>

<style scoped>
.postsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
