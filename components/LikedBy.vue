<script lang="ts" setup>
import type { singleLike } from "~~/customTypes"

const props = defineProps<{
    postId: number
}>()

const { data, pending, error } = await useFetch(
    `/api/post/${props.postId}/likes`,
    {
        key: `post/${props.postId}/likes`,
    }
)

let favoritedBy = ref(data.value)

const loadAdditional = async () => {
    if (!favoritedBy.value) return
    const { data: newData } = await useFetch<singleLike[]>(
        `/api/post/${props.postId}/likes&offset=${favoritedBy.value.length}`,
        {
            initialCache: false,
        }
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
