<script lang="ts" setup>
import { Comment } from "@prisma/client"
import { PartialBy } from "~~/customTypes"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    comments?: PartialBy<Comment, "postId">[]
    postId: number
}>()
</script>

<template>
    <div class="commentSection">
        <hr />
        <NewComment :post-id="postId" />
        <template v-if="comments">
            <div v-for="comment in comments" :key="comment.id">
                <hr />
                <CommentComp :comment="comment" />
            </div>
        </template>
        <div v-else>No comments yet</div>
    </div>
</template>
