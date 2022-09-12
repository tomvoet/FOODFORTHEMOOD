<script lang="ts" setup>
const { data } = await useFetch(`/api/post`)

const status = data.value?.status
const posts = data.value?.posts
</script>

<template>
    <div v-if="status == 200">
        <div class="postsContainer">
            <div v-for="post of posts" class="post">
                <div class="postTitle">
                    <NuxtLink :to="'/posts/' + post.id">{{post.title}}</NuxtLink>
                </div>
                <div class="postContent">
                    {{ post.content }}
                </div>
                <div class="timeStamp">
                    {{ post.createdAt.toLocaleString() }}
                </div>
                <div>
                    <NuxtLink :to="'/user/' + post.author.username">Author: {{post.author.username}}</NuxtLink>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="status == 404">
        404
    </div>
    <div v-else>
        Loading...
    </div>
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
