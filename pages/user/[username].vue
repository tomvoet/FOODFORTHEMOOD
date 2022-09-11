<script lang="ts" setup>
import { User, Post } from '.prisma/client';

const route = useRoute()

const { data } = await useFetch<{ status: number, user: User }>(`/api/user/${route.params.username}`)

const status = data.value?.status
const user = data.value?.user

const { data: postsData } = await useFetch<{ status: number, posts: Post[] }>(`/api/post?author=${route.params.username}`)

console.log(postsData.value?.posts)

const postsStatus = postsData.value?.status
const posts = postsData.value?.posts

</script>

<template>
  <div>
    <div v-if="status == 200">
      {{ user }} <br>
      <div v-if="postsStatus == 200">
        <div v-for="post of posts">
          <NuxtLink :to="'/posts/' + post.id">{{post}}</NuxtLink>
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

</style>
