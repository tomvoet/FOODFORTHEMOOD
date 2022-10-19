<script lang="ts" setup>
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
const post = ref(data.value?.post)

const reloadPosts = async () => {
    const updatedPost = await getPostById(route.params.id as string)
    if (updatedPost.status.code === 200) {
        post.value = updatedPost.post
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
                :favorites="post.favorites"
                :comments="post.comments"
                @reload-posts="reloadPosts"
            />
        </ClientOnly>
    </div>
    <StatusComp v-else :status="status?.code || 0" />
</template>
