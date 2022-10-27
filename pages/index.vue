<script lang="ts" setup>
import { getAllPosts } from "@/composables/getAllPosts"
import { ReducedPost } from "~~/utils/customTypes"

const posts = ref([] as ReducedPost[])
const status = ref({} as { code: number; message: string })
status.value = { code: 0, message: "" }

const cursorObj = ref({} as { cursor: number })
const endOfFeed = ref(false)

getAllPosts({}).then((data) => {
    posts.value = data.posts
    status.value = data.status
})

setMetadata("Posts", "Current feed of posts")

const moveCursor = () => {
    cursorObj.value.cursor = posts.value[posts.value.length - 1].id
}

watch(cursorObj.value, () => {
    if (posts.value.length) {
        getAllPosts(cursorObj.value).then((data) => {
            if (data.posts.length === 0) {
                endOfFeed.value = true
            } else {
                posts.value = [...posts.value, ...data.posts]
                status.value = data.status
            }
        })
    }
})

const deletePost = (id: number) => {
    posts.value = posts.value.filter((post) => post.id !== id)

    useToasts().value.push({
        message: "Successfully deleted Post",
        type: "success",
        start: new Date(),
    })
}
</script>

<template>
    <section v-if="status.code === 200" class="flex flex-col items-center">
        <h2 class="text-3xl mt-3 tracking-wider underline">Trending posts</h2>
        <PostComp
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :author="post.author"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :stats="{
                isFavorite: post.isFavorite,
                favoriteAmount: post.favoriteAmount,
                commentAmount: post.commentAmount,
            }"
            @delete-post="deletePost"
            @favorite="
                () => {
                    post.isFavorite = true
                    post.favoriteAmount++
                }
            "
            @unfavorite="
                () => {
                    post.isFavorite = false
                    post.favoriteAmount--
                }
            "
        />
        <InfiniteScroll
            :end-of-feed="endOfFeed"
            @load-more-posts="moveCursor"
        />
    </section>
    <StatusComp v-else :status="status.code" />
</template>
