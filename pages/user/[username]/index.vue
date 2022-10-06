<script lang="ts" setup>
import type { FullPost, PartialBy } from "@/customTypes"

const route = useRoute()

const username = computed(() => route.params.username as string)

const posts = ref([] as PartialBy<FullPost, "author">[] | undefined | null)
const postsStatus = ref(0)

const { data: postsData } = useFetch(`/api/user/${username.value}/posts`, {
    key: `user/${username.value}/posts`,
    server: false,
})

if (postsData) {
    posts.value = postsData.value?.posts
    postsStatus.value = postsData.value?.status || 0
}

watch(postsData, (data) => {
    posts.value = data?.posts
    postsStatus.value = data?.status || 0
})
</script>

<template>
    <div v-if="postsStatus == 200" class="postsContainer">
        <PostComp
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :author="{ username: username }"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :favorites="post.favorites"
            :comments="post.comments"
        />
    </div>
    <StatusComp v-else :status="postsStatus" />
</template>

<style scoped>
.postsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
