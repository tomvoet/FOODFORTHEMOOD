<script lang="ts" setup>
onMounted(() => {
    document.onscroll = () => {
        const nav = document.getElementById("nav")
        if (nav) {
            if (window.scrollY > 0) {
                nav.classList.add("scrolled")
            } else {
                nav.classList.remove("scrolled")
            }
        }
    }
})

const titleChunk = useState("titleChunk")
const descriptionRaw = useState("description")

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

const meta = computed(() => {
    return [
        { hid: "description", name: "description", content: description.value },
        { hid: "og:title", property: "og:title", content: fullTitle.value },
        {
            hid: "og:description",
            property: "og:description",
            content: description.value,
        },
        {
            hid: "twitter:title",
            name: "twitter:title",
            content: fullTitle.value,
        },
        {
            hid: "twitter:description",
            name: "twitter:description",
            content: description.value,
        },
    ]
})

useHead({
    htmlAttrs: {
        lang: "en",
    },
    title: fullTitle,
    meta,
})
</script>

<template>
    <div id="app">
        <Navbar id="nav" />
        <slot />
    </div>
</template>

<style scoped></style>
