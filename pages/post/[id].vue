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
            {{ resBody }}
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
    