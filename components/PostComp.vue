<script lang="ts" setup>
import type { Post, Comment } from "@prisma/client"
import type { PartialBy, singleLike } from "@/customTypes"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

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

const reloadPosts = () => {
    //emits("reloadPosts")
}

const submitDeletePost = async (id: number) => {
    if (userStore.loggedIn && userStore.user?.username) {
        if (confirm("Are you sure you want to delete this post?")) {
            const res = await deletePost(id)
            if (res.status.code === 204) {
                alert("Post deleted")
                reloadPosts()
            } else {
                alert("Something went wrong")
            }
            //router.push("/posts")
        }
    } else {
        alert("You must be logged in to delete a post")
    }
}
</script>

<template>
    <article class="relative m-4 p-4 border w-3/4 md:w-1/2 rounded-lg">
        <h3 class="font-bold text-3xl">
            <NuxtLink :to="'/posts/' + post.id">{{ post.title }}</NuxtLink>
        </h3>
        <DeletePost
            v-if="userStore.loggedIn"
            @delete-post="submitDeletePost(post.id)"
        />
        <StarRating :rating="post.rating" />
        <FavoritesComp :favorites="favorites" />
        <div class="font-bold">
            <NuxtLink :to="'/restaurants/' + post.restaurantId">
                {{ restaurant?.name }}
            </NuxtLink>
        </div>
        <p class="chosenFood">
            {{ post.chosenFood }}
        </p>
        <p class="mt-4">
            {{ post.text }}
        </p>
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

<style scoped></style>
