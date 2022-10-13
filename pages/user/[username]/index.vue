<script lang="ts" setup>
import type { FullPost, PartialBy } from "@/customTypes"

const route = useRoute()

const username = computed(() => route.params.username as string)

const posts = ref([] as PartialBy<FullPost, "author">[] | undefined | null)
const postsStatus = ref(0)

const { data: postsData, pending } = useLazyFetch(
    `/api/user/${username.value}/posts`,
    {
        key: `user/${username.value}/posts`,
    }
)

if (postsData) {
    posts.value = postsData.value?.posts
    postsStatus.value = postsData.value?.status || 0
}

watch(postsData, (data) => {
    posts.value = data?.posts
    postsStatus.value = data?.status || 0
})

const reloadPosts = () => {
    refreshNuxtData()
}
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
    </section>
    <StatusComp v-else :status="postsStatus" />
</template>

<style scoped></style>
