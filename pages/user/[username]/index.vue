<script lang="ts" setup>
import type { FullPost, PartialBy } from "@/customTypes"

const route = useRoute()

const username = computed(() => route.params.username as string)

const cursorObj = ref({} as { cursor: number })
const endOfFeed = ref(false)

const posts = ref([] as PartialBy<FullPost, "author">[])
const postsStatus = ref(0)

const { data: postsData, pending } = useLazyFetch(
    `/api/user/${username.value}/posts${
        cursorObj.value.cursor ? `?cursor=${cursorObj.value.cursor}` : ""
    }`,
    {
        key: `user/${username.value}/posts${
            cursorObj.value.cursor ? `?cursor=${cursorObj.value.cursor}` : ""
        }`,
    }
)

if (postsData && postsData.value?.posts) {
    posts.value = postsData.value?.posts
    postsStatus.value = postsData.value?.status || 0
}

watch(postsData, (data) => {
    posts.value = data?.posts ? [...posts.value, ...data.posts] : []
    postsStatus.value = data?.status || 0
})

const reloadPosts = () => {
    refreshNuxtData()
}

const moveCursor = () => {
    if (posts.value && posts.value.length)
        cursorObj.value.cursor = posts.value[posts.value.length - 1].id
}

watch(cursorObj.value, () => {
    useLazyFetch(
        `/api/user/${username.value}/posts${
            cursorObj.value.cursor ? `?cursor=${cursorObj.value.cursor}` : ""
        }`,
        {
            key: `user/${username.value}/posts${
                cursorObj.value.cursor
                    ? `?cursor=${cursorObj.value.cursor}`
                    : ""
            }`,
        }
    ).then((res) => {
        const data = res.data?.value as {
            posts: PartialBy<FullPost, "author">[]
            status: number
        }
        if (!data || !data.posts || data.posts?.length === 0)
            endOfFeed.value = true
        else posts.value = [...posts.value, ...data.posts]
        postsStatus.value = data?.status || 0
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
            :author="{ username: username }"
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
    <StatusComp v-else :status="postsStatus" />
</template>

<style scoped></style>
