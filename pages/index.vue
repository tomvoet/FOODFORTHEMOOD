<script lang="ts" setup>
import { getAllPosts } from "@/composables/getAllPosts"
import { FullPost } from "@/customTypes"

const posts = ref([] as FullPost[])
const status = ref({} as { code: number; message: string })
status.value = { code: 0, message: "" }

const cursorObj = ref({} as { cursor: number })
const endOfFeed = ref(false)

getAllPosts({}).then((data) => {
    posts.value = data.posts
    status.value = data.status
})

setMetadata("Posts", "Current feed of posts")

const reloadPosts = () => {
    getAllPosts({}).then((data) => {
        posts.value = data.posts
        status.value = data.status
    })
    //refresh() //refresh auf jeden fall für pagination
    //refreshNuxtData()
}

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
</script>

<template>
    <section v-if="status.code === 200" class="flex flex-col items-center">
        <PostComp
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :author="post.author"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :favorites="post.favorites"
            :comments="post.comments"
            @reload-posts="reloadPosts"
        />
        <InfiniteScroll
            :end-of-feed="endOfFeed"
            @load-more-posts="moveCursor"
        />
    </section>
    <StatusComp v-else :status="status.code" />
</template>
