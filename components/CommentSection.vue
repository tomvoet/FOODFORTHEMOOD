<script lang="ts" setup>
import type { Comment } from "@prisma/client"
import type { PartialBy } from "~~/customTypes"

const route = useRoute()

type ReducedComment = PartialBy<Comment, "postId">

defineProps<{
    comments?: PartialBy<Comment, "postId">[]
    postId: number
}>()

const emits = defineEmits<{
    (e: "reloadComments"): void
}>()

const reloadComments = () => {
    emits("reloadComments")
}

const cursorObj = ref({} as { cursor: number })
const endOfFeed = ref(false)
const comments = ref([] as ReducedComment[])
const commentsStatus = ref(0)

const { data: commentsData, error: commentsError } = getPostCommentsLazy(
    Number(route.params.id),
    cursorObj.value
)

if (!commentsError.value && commentsData && commentsData.value) {
    const data = commentsData.value as ReducedComment[]
    if (data.length === 0) {
        endOfFeed.value = true
    }
    comments.value = data
    commentsStatus.value = 200
}

watch(commentsData, (dataBad) => {
    const data = dataBad as ReducedComment[]

    if (data.length === 0) {
        endOfFeed.value = true
    }
    comments.value = data ? [...comments.value, ...data] : []
    commentsStatus.value = !commentsError.value ? 200 : 0
})

const moveCursor = () => {
    cursorObj.value.cursor = comments.value[comments.value.length - 1].id
}

watch(cursorObj.value, () => {
    getPostCommentsLazy(Number(route.params.id), cursorObj.value).then(
        (res) => {
            const data = res.data?.value as ReducedComment[]
            console.log(data)
            if (!data || data.length === 0) {
                endOfFeed.value = true
            } else {
                comments.value = [...comments.value, ...data]
                commentsStatus.value = !res.error.value ? 200 : 0
                if (data.length < 10) {
                    endOfFeed.value = true
                }
            }
        }
    )
})
</script>

<template>
    <div class="commentSection">
        <NewComment :post-id="postId" @new-comment="reloadComments" />
        <template v-if="comments">
            <div v-for="comment in comments" :key="comment.id">
                <hr />
                <CommentComp
                    :comment="comment"
                    @reload-comments="reloadComments"
                />
            </div>
            <InfiniteScroll
                v-if="comments.length >= 10"
                :end-of-feed="endOfFeed"
                @load-more-posts="moveCursor"
            />
        </template>
        <div v-else>No comments yet</div>
    </div>
</template>
