<script lang="ts" setup>
const route = useRoute()

const { data } = await useFetch(`/api/post/${route.params.id}`, {
    key: `post/${route.params.id}`,
    server: true,
})

const status = data.value?.status
const post = data.value?.post

setMetadata(post?.title ? post.title : "404", post?.text ? post.text : "404")
</script>

<template>
    <div v-if="status == 200 && post">
        <PostComp :post="post" :author="post.author" />
    </div>
    <div v-else-if="status == 404">404</div>
    <div v-else>Loading...</div>
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