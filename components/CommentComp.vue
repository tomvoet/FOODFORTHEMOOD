<script lang="ts" setup>
import { Comment } from "@prisma/client"
import { PartialBy } from "~~/customTypes";

const props = defineProps<{
    comment: PartialBy<Comment, "postId">
}>()
</script>

<template>
    <div class="comment">
        <div class="commentText">
            {{ comment.text }}
        </div>
        <div class="commentAuthor">
            <NuxtLink :to="'/user/' + comment.authorId">
                {{ comment.authorId }}
            </NuxtLink>
        </div>
        <div class="commentTime">
            {{
                `${new Date(comment.createdAt).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                })} | ${new Date(comment.createdAt).toLocaleDateString("de-DE")}`
            }}
        </div>
    </div>
</template>