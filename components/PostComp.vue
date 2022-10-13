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
    (e: "reloadPosts"): void
    (e: "reloadFavorites"): void
}>()

//const reloadComments = () => {
//    emits("reloadPosts")
//}

const reloadPosts = () => {
    emits("reloadPosts")
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

const onLike = () => {
    console.log("test")
}
</script>

<template>
    <article class="relative m-4 p-4 border w-3/4 md:w-1/2 rounded-lg">
        <h3 class="font-bold text-3xl">
            <NuxtLink :to="'/posts/' + post.id">{{ post.title }}</NuxtLink>
        </h3>
        <DeletePost
            v-if="
                userStore.loggedIn &&
                userStore.user?.username === author?.username
            "
            @delete-post="submitDeletePost(post.id)"
        />
        <div class="flex flex-row items-center">
            <StarRating :rating="post.rating" />
            <FavoritesComp :favorites="favorites" @on-like="onLike" />
        </div>
        <div class="font-bold">
            <NuxtLink :to="'/restaurants/' + post.restaurantId">
                {{ restaurant?.name }}
            </NuxtLink>
        </div>
        <p class="chosenFood">
            {{ post.chosenFood }}
        </p>
        <p class="mt-4 break-words">
            {{ post.text }}
        </p>
        <div class="flex space-between w-full flex-row">
            <div v-if="author !== undefined" class="w-max">
                <NuxtLink
                    :to="'/user/' + author.username"
                    class="italic font-bold"
                    >{{ author.username }}</NuxtLink
                >
            </div>
            <div class="text-gray-700 mt-1 text-sm w-max ml-auto">
                {{
                    post.updatedAt == post.createdAt
                        ? "created: "
                        : "updated: " +
                          `${new Date(post.createdAt).toLocaleTimeString(
                              "de-DE",
                              {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              }
                          )} | ${new Date(post.createdAt).toLocaleDateString(
                              "de-DE"
                          )}`
                }}
            </div>
        </div>
        <CommentSection
            :comments="comments"
            :post-id="post.id"
            @reload-comments="reloadPosts"
        />
    </article>
</template>

<style scoped></style>
