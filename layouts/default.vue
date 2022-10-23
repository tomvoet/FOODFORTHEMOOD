<script lang="ts" setup>
import { ReducedPost } from "~~/customTypes"
import { useUserStore } from "~~/stores/userStore"

const { $bus } = useNuxtApp()

const titleChunk = useState("titleChunk")
const descriptionRaw = useState("description")

const route = useRoute()

const userStore = useUserStore()

const showFAB = computed(() => {
    return (
        route.path !== "/login" &&
        route.path !== "/register" &&
        route.path !== "/reset_password" &&
        route.path !== "/settings" &&
        route.path !== "/about" &&
        userStore.loggedIn
    )
})

const fullTitle = computed(() => {
    if (titleChunk.value) {
        return titleChunk.value + " | " + "FOODFORTHEMOOD"
    } else {
        return "FOODFORTHEMOOD"
    }
})

const description = computed(() => {
    if (descriptionRaw.value) {
        return descriptionRaw.value
    } else {
        return "FOODFORTHEMOOD"
    }
})

onMounted(() => {
    $bus.$on("newPost", (post: unknown) => {
        navigateTo(`/posts/${(post as ReducedPost).id}`)
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
            <ModalComp v-if="showFAB">
                <template #button
                    ><div
                        class="fixed bottom-3 right-3 h-16 w-16 md:h-10 md:w-10 md:text-2xl bg-green-400 rounded-full flex items-center justify-center text-5xl text-white"
                    >
                        <span class="mb-1 md:mb-0">+</span>
                    </div></template
                ><template #modalContent><NewPostForm /></template></ModalComp
        ></ClientOnly>
    </div>
</template>

<style scoped></style>
