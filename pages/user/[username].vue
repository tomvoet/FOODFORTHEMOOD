<script lang="ts" setup>
import { User, Post } from "@prisma/client"
import type { Ref } from "vue"

const route = useRoute()

const username = computed(() => route.params.username as string)

const { data: userData } = await useFetch<{
    status: number
    user: User | null
}>(`/api/user/${username.value}`, {
    key: `user/${username.value}`,
    server: true,
})

const userStatus = userData.value?.status
const user = userData.value?.user

const img: Ref<string> = ref("/assets/imgs/blankpicture.png")

useFetch<{ status: number; image: string | null }>(
    `/api/user/${username.value}/profilepicture`,
    {
        key: `user/${username.value}/profilepicture`,
    }
).then((res) => {
    if (res.data.value?.status === 200) {
        if (res.data.value?.image) {
            img.value = res.data.value?.image
        }
    }
})

const postsStatus: Ref<number | null | undefined> = ref(null)
const posts: Ref<Post[] | null | undefined> = ref(null)

useFetch<{ status: number; posts: Post[] }>(
    `/api/user/${route.params.username}/posts`,
    {
        key: `user/${username.value}/posts`,
    }
).then((res) => {
    postsStatus.value = res.data.value?.status
    posts.value = res.data.value?.posts
})
</script>

<template>
    <div v-if="userStatus == 200 && user">
        <img class="profilePicture" :src="img" />
        <h1>{{ user?.username }}</h1>
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
        <div v-else-if="postsStatus == 404">
            <h1>No posts found</h1>
        </div>
        <div v-else>
            <h1>Loading...</h1>
        </div>
    </div>
    <div v-else-if="userStatus == 404">404</div>
    <div v-else>Loading...</div>
</template>

<style scoped>
.postsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 2rem;
    display: inline-block;
}

.profilePicture {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    object-fit: cover;
}
</style>
