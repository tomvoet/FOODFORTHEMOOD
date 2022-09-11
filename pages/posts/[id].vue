<script lang="ts" setup>
import { Post } from '.prisma/client';
const route = useRoute()

const { data } = await useFetch<{ status: number, post: Post }>(`/api/post/${route.params.id}`)

const status = data.value?.status
const resBody = data.value?.post
</script>
    
<template>
    <div>
        <div v-if="status == 200">
            <div class="post">
                <div class="postTitle">
                    {{ resBody?.title }}
                </div>
                <div class="postContent">
                    {{ resBody?.content }}
                </div>
                <div class="timeStamp">
                    {{ resBody?.createdAt.toLocaleString() }}
                </div>
                <div>
                    <NuxtLink :to="'/user/' + resBody?.author.username">Author: {{resBody?.author.username}}</NuxtLink>
                </div>
            </div>
        </div>
        <div v-else-if="status == 404">
            404
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
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
    