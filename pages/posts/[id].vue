<script lang="ts" setup>
import type { ReducedPost } from "~~/customTypes"

const route = useRoute()

const { data, pending } = await useAsyncData(
    `post/${route.params.id}`,
    async () => {
        return getPostById(route.params.id as string)
    },
    {
        server: true,
    }
)

const status = data.value?.status
const post = useState<ReducedPost>(
    `post/${route.params.id}`,
    () => data.value?.post as ReducedPost
)

const reloadPosts = async () => {
    const updatedPost = await getPostById(route.params.id as string)
    if (updatedPost.status.code === 200 && updatedPost.post) {
        post.value = updatedPost.post as ReducedPost
    } else {
        alert("Something went wrong")
    }
}

setMetadata(
    post.value?.title ? post.value?.title : "404",
    post.value?.text ? post.value?.text : "404"
)
</script>

<template>
    <LoadingComp v-if="pending" />
    <div v-else-if="status?.code == 200 && post" class="flex justify-center">
        <ClientOnly>
            <PostComp
                :post="post"
                :author="post.author"
                :restaurant="{ ...post.restaurant, id: post.restaurantId }"
                :stats="{
                    favoriteAmount: post.favoriteAmount,
                    commentAmount: post.commentAmount,
                    isFavorite: post.isFavorite,
                }"
                comments
                @reload-posts="reloadPosts"
            />
        </ClientOnly>
    </div>
    <StatusComp v-else :status="status?.code || 0" />
</template>
