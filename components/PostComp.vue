<script lang="ts" setup>
import { Post } from "@prisma/client"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    post: Post
    author?: {
        username: string
    }
    restaurant?: {
        name: string
    }
}>()
</script>

<template>
    <article class="post">
        <div class="postTitle">
            <NuxtLink :to="'/posts/' + post.id">{{ post.title }}</NuxtLink>
        </div>
        <div class="reviewStars">
            <StarRating :rating="post.rating" />
        </div>
        <div class="postContent">
            {{ post.text }}
        </div>
        <div class="debug">
            <pre>{{ post }}</pre>
        </div>
        <div class="timeStamp">
            {{
                `${new Date(post.createdAt).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                })} | ${new Date(post.createdAt).toLocaleDateString("de-DE")}`
            }}
        </div>
        <div v-if="author !== undefined">
            <NuxtLink :to="'/user/' + author.username"
                >Author: {{ author.username }}</NuxtLink
            >
        </div>
    </article>
</template>

<style scoped>
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
    font-size: 1.2rem;
}

.timeStamp {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: gray;
}
</style>
