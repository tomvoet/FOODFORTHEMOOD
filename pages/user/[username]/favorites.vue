<script lang="ts" setup>
import type { ReducedPost } from "@/customTypes"

const route = useRoute()

const username = computed(() => route.params.username as string)

const cursorObj = ref({} as { cursor: number })
const endOfFeed = ref(false)

const favorites = ref([] as ReducedPost[])
const favoritesStatus = ref(0)

const {
    data: favData,
    pending,
    error,
} = getUserFavoritesLazy(username.value, cursorObj.value)

if (!error.value && favData && favData.value) {
    if (favData.value.length === 0) {
        endOfFeed.value = true
    }
    favorites.value = favData.value
    favoritesStatus.value = 200
}

watch(favData, (data) => {
    if (data?.length === 0) {
        endOfFeed.value = true
    }
    favorites.value = data ? [...favorites.value, ...data] : []
    favoritesStatus.value = !error.value ? 200 : 0
})

const moveCursor = () => {
    if (favorites.value && favorites.value.length)
        cursorObj.value.cursor = favorites.value[favorites.value.length - 1].id
}

watch(cursorObj.value, () => {
    getUserFavoritesLazy(username.value, cursorObj.value).then((res) => {
        const data = res.data?.value as ReducedPost[]
        if (!data || data.length === 0) {
            endOfFeed.value = true
        } else if (data.length > 0) {
            favorites.value = [...favorites.value, ...data]
            favoritesStatus.value = !res.error.value ? 200 : 0
        }
    })
})

const deletePost = (id: number) => {
    favorites.value = favorites.value.filter((post) => post.id !== id)
}
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
            :author="post.author"
            :stats="{
                favoriteAmount: post.favoriteAmount,
                commentAmount: post.commentAmount,
                isFavorite: post.isFavorite,
            }"
            :restaurant="{ ...post.restaurant, id: post.restaurantId }"
            @delete-post="deletePost"
            @favorite="
                () => {
                    post.isFavorite = true
                    post.favoriteAmount++
                }
            "
            @unfavorite="
                () => {
                    post.isFavorite = false
                    post.favoriteAmount--
                    favorites = favorites.filter(
                        (favorite) => favorite.id !== post.id
                    )
                }
            "
        />
        <InfiniteScroll
            :end-of-feed="endOfFeed || (!pending && favorites.length < 10)"
            @load-more-posts="moveCursor"
        />
    </section>
    <StatusComp v-else :status="favoritesStatus" />
</template>
