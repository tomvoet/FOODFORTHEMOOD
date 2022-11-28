<script lang="ts" setup>
import type { singleLike } from "~~/utils/customTypes"

const props = defineProps<{
    postId: number
}>()

const { data, pending, error } = await useFetch<singleLike[]>(
    `/api/post/${props.postId}/favorites`,
    {
        key: `post/${props.postId}/favorites`,
        method: "GET",
    }
)

let favoritedBy = ref(data.value)

const loadAdditional = async () => {
    if (!favoritedBy.value) return
    const { data: newData } = await useFetch<singleLike[]>(
        `/api/post/${props.postId}/favorites&offset=${favoritedBy.value.length}`
    )

    if (newData.value && favoritedBy.value) {
        favoritedBy.value = [...favoritedBy.value, ...newData.value]
    }
}
</script>

<template>
    <div v-if="favoritedBy && !pending && !error">
        <span v-if="favoritedBy?.length === 0"
            >No one has liked this post yet</span
        >
        <NuxtLink
            v-for="favorite of favoritedBy"
            v-else
            :key="postId + 'favorite' + favorite.username"
            :to="`/user/${favorite.username}`"
            >{{ favorite.username }}
        </NuxtLink>
        <button v-if="favoritedBy?.length >= 10" @click="loadAdditional">
            Load More...
        </button>
    </div>
    <div v-else>
        <span v-if="pending">Loading...</span>
        <span v-else-if="error">Something went wrong</span>
    </div>
</template>
