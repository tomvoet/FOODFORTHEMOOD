<script lang="ts" setup>
import { Restaurant } from "@prisma/client"
import { ReducedPost } from "~~/utils/customTypes"

const { $bus } = useNuxtApp()

const titleChunk = useState("titleChunk")

const fullTitle = computed(() => {
    if (titleChunk.value) {
        return titleChunk.value + " | " + "FOODFORTHEMOOD"
    } else {
        return "FOODFORTHEMOOD"
    }
})

onMounted(() => {
    $bus.$on("newPost", (post: unknown) => {
        navigateTo(`/posts/${(post as ReducedPost).id}`)
    })
    $bus.$on("newRestaurant", (restaurant: unknown) => {
        navigateTo(`/restaurants/${(restaurant as Restaurant).id}`)
    })
})

useHead({
    htmlAttrs: {
        lang: "en",
    },
    title: fullTitle,
    meta: [
        {
            hid: "og:image",
            property: "og:image",
            content: "https://foodforthemood.com/og-image.png",
        },
        {
            hid: "twitter:image",
            name: "twitter:image",
            content: "https://foodforthemood.com/og-image.png",
        },
        { hid: "og:title", property: "og:title", content: fullTitle.value },
        {
            hid: "twitter:title",
            name: "twitter:title",
            content: fullTitle.value,
        },
    ],
})
</script>

<template>
    <div id="app" class="min-h-screen">
        <Navbar />
        <main>
            <slot />
        </main>
        <NuxtLoadingIndicator
            :height="3"
            color="repeating-linear-gradient(to right,#FF7D7D 0%, #FFFFFF 100%)"
        />
        <ClientOnly>
            <FloatingActionButton />
        </ClientOnly>
        <ToastContainer />
    </div>
</template>

<style scoped></style>
