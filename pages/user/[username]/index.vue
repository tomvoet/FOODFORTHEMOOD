<script lang="ts" setup>
import type { ReducedPost } from "@/customTypes"

const route = useRoute()

const username = computed(() => route.params.username as string)

const cursorObj = ref({} as { cursor: number })
const endOfFeed = ref(false)

const posts = ref([] as ReducedPost[])
const postsStatus = ref(0)

const {
    data: postsData,
    pending,
    error,
} = getUserPostsLazy(username.value, cursorObj.value)

if (!error.value && postsData && postsData.value) {
    if (postsData.value.length === 0) {
        endOfFeed.value = true
    }
    posts.value = postsData.value
    postsStatus.value = 200
}

watch(postsData, (data) => {
    if (data?.length === 0) {
        endOfFeed.value = true
    }
    posts.value = data ? [...posts.value, ...data] : []
    postsStatus.value = !error.value ? 200 : 0
})

const reloadPosts = () => {
    refreshNuxtData()
}

const moveCursor = () => {
    if (posts.value && posts.value.length)
        cursorObj.value.cursor = posts.value[posts.value.length - 1].id
}

watch(cursorObj.value, () => {
    getUserPostsLazy(username.value, cursorObj.value).then((res) => {
        const data = res.data?.value as ReducedPost[]
        if (!data || data.length === 0) {
            endOfFeed.value = true
        } else {
            posts.value = [...posts.value, ...data]
            postsStatus.value = !res.error.value ? 200 : 0
        }
    })
})
</script>

<template>
    <LoadingComp v-if="pending" />
    <section v-else-if="postsStatus == 200" class="flex flex-col items-center">
        <PostComp
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :author="post.author"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :stats="{
                favoriteAmount: post.favoriteAmount,
                commentAmount: post.commentAmount,
                isFavorite: post.isFavorite,
            }"
            @reload-posts="reloadPosts"
        />
        <InfiniteScroll
            :end-of-feed="endOfFeed"
            @load-more-posts="moveCursor"
        />
    </section>
    <StatusComp v-else :status="postsStatus" />
</template>

<style scoped></style>
