<script lang="ts" setup>
const title = ref("")
const content = ref("")
const rating = ref(0)

const createPost = () => {
    console.log(title.value, content.value, rating.value)
}

const updateRating = (newRating: number) => {
    rating.value = newRating
}
</script>

<template>
    <div>
        <h1>New Post</h1>
        <form @submit.prevent="createPost">
            <div>
                <label for="title">Title</label>
                <input
                    id="title"
                    v-model="title"
                    class="border-gray-300 outline-1"
                    type="text"
                />
            </div>
            <div>
                <label for="content">Content</label>
                <textarea
                    id="content"
                    v-model="content"
                    class="border-gray-300 outline-1"
                ></textarea>
            </div>
            <div>
                <label for="rating">Rating</label>
                <RatingSelector
                    :rating="rating"
                    @update-rating="updateRating"
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    </div>
</template>

<style scoped></style>
