<script lang="ts" setup>
const emits = defineEmits<{
    (e: "loadMorePosts"): void
}>()

defineProps<{
    endOfFeed: boolean
}>()

const triggerElement = ref(null as HTMLElement | null)

const loadMorePosts = () => {
    emits("loadMorePosts")
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
        <div ref="triggerElement" class="absolute top-[-100vh]"></div>
        Loading
    </div>
    <div v-else class="text-xl italic">End of feed</div>
</template>

<style scoped></style>
