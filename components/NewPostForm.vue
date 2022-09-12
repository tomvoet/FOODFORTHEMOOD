<script lang="ts" setup>
const title = ref("")
const content = ref("")

const createPost = () => {
    console.log(title.value, content.value)
}
</script>

<template>
    <div>
        <h1>New Post</h1>
        <form @submit.prevent="createPost">
            <div>
                <label for="title">Title</label>
                <input id="title" v-model="title" type="text" />
            </div>
            <div>
                <label for="content">Content</label>
                <textarea id="content" v-model="content" />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped></style>
