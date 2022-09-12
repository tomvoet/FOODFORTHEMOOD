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
    <div v-if="status === 200">
        <div v-for="post of posts" :key="post.id" class="postsContainer">
            <div class="post">
                <div class="postTitle">
                    <NuxtLink :to="'/posts/' + post.id">{{
                        post.title
                    }}</NuxtLink>
                </div>
                <div class="postContent">
                    {{ post.content }}
                </div>
                <div class="timeStamp">
                    {{ post.createdAt.toLocaleString() }}
                </div>
                <div>
                    <NuxtLink :to="'/user/' + post.author.username">{{
                        post.author.username
                    }}</NuxtLink>
                </div>
            </div>
        </div>
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

.postTitle {
    font-size: 1.5rem;
    font-weight: bold;
}

.postContent {
    margin-top: 1rem;
}

.timeStamp {
    margin-top: 1rem;
    font-size: 0.8rem;
}

a {
    color: black;
}

a:hover {
    color: blue;
}

a:active {
    color: red;
}
</style>
