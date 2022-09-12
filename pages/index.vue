<script lang="ts" setup>
const { data } = await useFetch("/api/post")

const status = data.value?.status
const posts = data.value?.posts

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
