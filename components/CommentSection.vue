<script lang="ts" setup>
import type { Comment } from "@prisma/client"
import type { PartialBy } from "~~/customTypes"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    comments?: PartialBy<Comment, "postId">[]
    postId: number
}>()

const emits = defineEmits<{
    (e: "reloadComments"): void
}>()

const reloadComments = () => {
    emits("reloadComments")
}
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
        </template>
        <div v-else>No comments yet</div>
    </div>
</template>
