<script lang="ts" setup>
import { User, Post } from '.prisma/client';

const route = useRoute()

const { data } = await useFetch<{ status: number, user: User }>(`/api/user/${route.params.username}`)

const status = data.value?.status
const user = data.value?.user

const { data: posts } = await useFetch<{ status: number, posts: Post[] }>(`/api/post?author=${route.params.username}`)
</script>

<template>
  <div>
    <div v-if="status == 200">
      {{ user }} <br>
      {{ posts }}
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
