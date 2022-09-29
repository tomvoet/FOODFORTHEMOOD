<script lang="ts" setup>
import { Comment } from "@prisma/client"
import { PartialBy } from "~~/customTypes";

const props = defineProps<{
    comments?: PartialBy<Comment, "postId">[]
    postId: number
}>()
</script>

<template>
    <div class="commentSection">
        <hr/>
        <NewComment :postId="postId" />
        <div v-if="comments" v-for="comment in comments" :key="comment.id">
            <hr/>
            <CommentComp :comment="comment" />
        </div>
        <div v-else>
            No comments yet
        </div>
    </div> 
</template>