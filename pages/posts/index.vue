<script lang="ts" setup>
const { data } = await useFetch(`/api/post`)

const status = data.value?.status
const posts = data.value?.posts

setMetadata("Posts", "Current feed of posts")
</script>

<template>
    <div v-if="status == 200">
        <div class="postsContainer">
            <PostComp
                v-for="post in posts"
                :key="post.id"
                :post="post"
                :author="post.author"
            />
        </div>
    </div>
    <div v-else-if="status == 404">404</div>
    <div v-else>Loading...</div>
</template>

<style scoped>
.postsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.post {
    width: 50%;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 5px;
}
</style>