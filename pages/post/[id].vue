<script lang="ts" setup>
import { Post } from '.prisma/client';

const route = useRoute()

const { data } = await useAsyncData(() =>
    $fetch<Post>(`/api/post/${route.params.id}`)
)

const post = data.value
</script>
    
<template>
    <div>
        <div v-if="post">
            {{ post }}
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
    
<style scoped>
dasd
</style>
    