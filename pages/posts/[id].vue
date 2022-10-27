<script lang="ts" setup>
import type { ReducedPost } from "~~/utils/customTypes"

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

const deletePost = () => {
    navigateTo("/")

    useToasts().value.push({
        message: "Successfully deleted Post",
        type: "success",
        start: new Date(),
    })
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
        </ClientOnly>
    </div>
    <StatusComp v-else :status="status?.code || 0" />
</template>
