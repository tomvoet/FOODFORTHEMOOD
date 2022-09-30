<script lang="ts" setup>
import type { Post, Comment } from "@prisma/client"
import type { PartialBy, singleLike } from "~~/customTypes"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    post: Post
    author?: {
        username: string
    }
    restaurant?: {
        name: string
        id: number
    }
    favorites?: singleLike[]
    comments?: PartialBy<Comment, "postId">[]
}>()

const emits = defineEmits<{
    (e: "reloadComments"): void
    (e: "reloadFavorites"): void
}>()

const reloadComments = () => {
    emits("reloadComments")
}
</script>

<template>
    <article class="post">
        <div class="postTitle">
            <NuxtLink :to="'/posts/' + post.id">{{ post.title }}</NuxtLink>
        </div>
        <div class="reviewStars">
            <StarRating :rating="post.rating" />
        </div>
        <div class="likesContainer">
            <FavoritesComp :favorites="favorites" />
        </div>
        <div class="restaurantName">
            <NuxtLink :to="'/restaurants/' + post.restaurantId">
                {{ restaurant?.name }}
            </NuxtLink>
        </div>
        <div class="chosenFood">
            {{ post.chosenFood }}
        </div>
        <div class="postContent">
            {{ post.text }}
        </div>
        <div class="timeStamp">
            {{
                post.updatedAt == post.createdAt
                    ? "created: "
                    : "updated: " +
                      `${new Date(post.createdAt).toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                      })} | ${new Date(post.createdAt).toLocaleDateString(
                          "de-DE"
                      )}`
            }}
        </div>
        <div v-if="author !== undefined">
            <NuxtLink :to="'/user/' + author.username"
                >Author: {{ author.username }}</NuxtLink
            >
        </div>
        <CommentSection
            :comments="comments"
            :post-id="post.id"
            @reload-comments="reloadComments"
        />
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
