<script lang="ts" setup>
const emits = defineEmits<{
    (e: "loadMorePosts"): void
}>()

const props = defineProps<{
    endOfFeed: boolean
}>()

const triggerElement = ref(null as HTMLElement | null)

const loadMorePosts = () => {
    if (!props.endOfFeed) emits("loadMorePosts")
}

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMorePosts()
                }
            })
        },
        {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        }
    )

    if (triggerElement.value) {
        observer.observe(triggerElement.value)
    }
})
</script>

<template>
    <div v-if="!endOfFeed" class="text-xl italic relative">
        <div
            ref="triggerElement"
            class="absolute bottom-0 h-[100vh] -z-50"
        ></div>
        Loading
    </div>
    <div v-else class="text-xl italic">End of feed</div>
</template>
