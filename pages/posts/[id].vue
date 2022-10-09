<script lang="ts" setup>
import { FullPost } from "@/customTypes"

const route = useRoute()

const { data } = await useAsyncData(
    `post/${route.params.id}`,
    async () => {
        return getPostById(route.params.id as string)
    },
    {
        server: true,
    }
)

const status = data.value?.status
const post = data.value?.post

setMetadata(post?.title ? post.title : "404", post?.text ? post.text : "404")
</script>

<template>
    <div v-if="status?.code == 200 && post">
        <PostComp
            :post="post"
            :author="post.author"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :favorites="post.favorites"
            :comments="post.comments"
        />
    </div>
    <div v-else-if="status?.code == 404">404</div>
    <div v-else>Loading...</div>
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
