<script lang="ts" setup>
import type { FullPost, PartialBy } from "@/customTypes"

const route = useRoute()

const username = computed(() => route.params.username as string)

const favorites = ref([] as PartialBy<FullPost, "author">[] | undefined | null)
const favoritesStatus = ref(0)

const { data: favData } = useFetch(`/api/user/${username.value}/favorites`, {
    key: `user/${username.value}/favorites`,
    server: false,
})

if (favData) {
    favorites.value = favData.value?.favorites
    favoritesStatus.value = favData.value?.status || 0
}

watch(favData, (data) => {
    favorites.value = data?.favorites
    favoritesStatus.value = data?.status || 0
})

const reloadFavorites = () => {
    refreshNuxtData()
}
</script>

<template>
    <section v-if="favoritesStatus == 200" class="flex flex-col items-center">
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
    </section>
    <StatusComp v-else :status="favoritesStatus" />
</template>

<style scoped></style>
