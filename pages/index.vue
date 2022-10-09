<script lang="ts" setup>
import { getAllPosts } from "@/composables/getAllPosts"
import { FullPost } from "@/customTypes"

const posts = ref([] as FullPost[])
const status = ref({} as { code: number; message: string })
status.value = { code: 0, message: "" }

getAllPosts().then((data) => {
    posts.value = data.posts
    status.value = data.status
})

setMetadata("Posts", "Current feed of posts")

const reloadPosts = () => {
    //refresh() //refresh auf jeden fall für pagination
    //refreshNuxtData()
}
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
            @reload-comments="reloadPosts"
        />
    </section>
    <StatusComp v-else :status="status.code" />
</template>

<style scoped></style>
