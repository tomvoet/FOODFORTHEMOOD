<script lang="ts" setup>
import type { FullPost, PartialBy } from "@/customTypes"

const route = useRoute()

const username = computed(() => route.params.username as string)

const cursorObj = ref({} as { cursor: number })
const endOfFeed = ref(false)

const favorites = ref([] as PartialBy<FullPost, "author">[])
const favoritesStatus = ref(0)

const { data: favData, pending } = useLazyFetch(
    `/api/user/${username.value}/favorites${
        cursorObj.value.cursor ? `?cursor=${cursorObj.value.cursor}` : ""
    }`,
    {
        key: `user/${username.value}/favorites${
            cursorObj.value.cursor ? `?cursor=${cursorObj.value.cursor}` : ""
        }`,
    }
)

if (favData && favData.value?.favorites) {
    favorites.value = favData.value?.favorites
    favoritesStatus.value = favData.value?.status || 0
}

watch(favData, (data) => {
    favorites.value = data?.favorites
        ? [...favorites.value, ...data.favorites]
        : []
    favoritesStatus.value = data?.status || 0
})

const reloadFavorites = () => {
    refreshNuxtData()
}

const moveCursor = () => {
    if (favorites.value && favorites.value.length)
        cursorObj.value.cursor = favorites.value[favorites.value.length - 1].id
}

watch(cursorObj.value, () => {
    useLazyFetch(
        `/api/user/${username.value}/favorites${
            cursorObj.value.cursor ? `?cursor=${cursorObj.value.cursor}` : ""
        }`,
        {
            key: `user/${username.value}/favorites${
                cursorObj.value.cursor
                    ? `?cursor=${cursorObj.value.cursor}`
                    : ""
            }`,
        }
    ).then((res) => {
        const data = res.data?.value as {
            favorites: PartialBy<FullPost, "author">[]
            status: number
        }
        if (!data || !data.favorites || data.favorites?.length === 0) {
            endOfFeed.value = true
        } else if (data.favorites.length > 0) {
            favorites.value = [...favorites.value, ...data.favorites]
            favoritesStatus.value = data?.status || 0
        }
    })
})
</script>

<template>
    <LoadingComp v-if="pending" />
    <section
        v-else-if="favoritesStatus == 200"
        class="flex flex-col items-center"
    >
        <PostComp
            v-for="post in favorites"
            :key="post.id"
            :post="post"
            :author="{ username: username }"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            :favorites="post.favorites"
            :comments="post.comments"
            @reload-posts="reloadFavorites"
        />
        <InfiniteScroll
            :end-of-feed="endOfFeed || (!pending && favorites.length < 10)"
            @load-more-posts="moveCursor"
        />
    </section>
    <StatusComp v-else :status="favoritesStatus" />
</template>
