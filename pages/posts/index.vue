<script lang="ts" setup>
import { Post } from '.prisma/client';

const { data } = await useFetch<{ status: number, posts: Post[] }>(`/api/post`)

const status = data.value?.status
const posts = data.value?.posts
</script>

<template>
    <div>
        <div v-if="status == 200">
            <div v-for="post of posts">
                <NuxtLink :to="'/posts/' + post.id">{{post}}</NuxtLink>
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

</style>
