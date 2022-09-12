<script lang="ts" setup>
import { User, Post } from "@prisma/client"

const route = useRoute()

const { data } = await useFetch<{ status: number; user: User | null }>(
    `/api/user/${route.params.username}`
)

const status = data.value?.status
const user = data.value?.user

const { data: postsData } = await useFetch<{ status: number; posts: Post[] }>(
    `/api/user/${route.params.username}/posts`
)

console.log(postsData.value?.posts)

const postsStatus = postsData.value?.status
const posts = postsData.value?.posts
</script>

<template>
    <div v-if="status == 200 && user">
        <h1>{{ user?.username }}</h1>
        <img
            class="profilePicture"
            :src="user?.image || '/assets/imgs/blankpicture.png'"
        />
        <div>
            {{ user?.bio }}
        </div>
        <div v-if="postsStatus == 200" class="postsContainer">
            <PostComp
                v-for="post in posts"
                :key="post.id"
                :post="post"
                :author="{ username: user?.username, id: user?.id }"
            />
        </div>
    </div>
    <div v-else-if="status == 404">404</div>
    <div v-else>Loading...</div>
</template>

<style scoped>
.postsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profilePicture {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    object-fit: cover;
}
</style>
