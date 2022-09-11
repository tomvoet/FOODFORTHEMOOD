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
      <h1>{{ user?.username }}</h1>
      <div v-if="postsStatus == 200" class="postsContainer">
        <div v-for="post of posts" class="post">
          <div class="postTitle">
            <NuxtLink :to="'/posts/' + post.id">{{post.title}}</NuxtLink>
          </div>
          <div class="postContent">
            {{ post.content }}
          </div>
          <div class="timeStamp">
            {{ post.createdAt.toLocaleString() }}
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
  </div>
</template>

<style scoped>
.postsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post {
  width: 50%;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
