<script lang="ts" setup>
import { Comment } from "@prisma/client"
import { PartialBy } from "~~/customTypes";

const props = defineProps<{
    comments?: PartialBy<Comment, "postId">[]
}>()
</script>

<template>
    <div v-if="comments" v-for="comment in comments" :key="comment.id">
        {{comment.text}}
    </div>
    <div v-else>
        No comments yet
    </div>
</template>