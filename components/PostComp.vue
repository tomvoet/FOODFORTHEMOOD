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
        <h2 class="font-bold text-3xl">
            <NuxtLink :to="'/posts/' + post.id">{{ post.title }}</NuxtLink>
        </h2>
        <StarRating :rating="post.rating" />
        <FavoritesComp :favorites="favorites" />
        <div class="font-bold">
            <NuxtLink :to="'/restaurants/' + post.restaurantId">
                {{ restaurant?.name }}
            </NuxtLink>
        </div>
        <div class="chosenFood">
            {{ post.chosenFood }}
        </div>
        <div class="mt-4">
            {{ post.text }}
        </div>
        <div class="text-gray-700 mt-1 text-sm">
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
</style>
