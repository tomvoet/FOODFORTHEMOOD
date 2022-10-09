<script lang="ts" setup>
import type { Comment } from "@prisma/client"
import type { PartialBy } from "~~/customTypes"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    comment: PartialBy<Comment, "postId">
}>()

const emits = defineEmits<{
    (e: "reloadComments"): void
}>()

const pressDelete = async () => {
    if (userStore.loggedIn && userStore.user && userStore.token) {
        const response = await deleteComment(props.comment.id, userStore.token)
        alert(
            response.status == 200
                ? "Comment deleted"
                : "Error deleting comment"
        )
        if (response.status == 200) {
            emits("reloadComments")
        }
    }
}
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
        <button
            v-if="comment.authorId == userStore.user?.username"
            @click="pressDelete()"
        >
            Delete
        </button>
        <div class="commentTime">
            {{
                `${new Date(comment.createdAt).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                })} | ${new Date(comment.createdAt).toLocaleDateString(
                    "de-DE"
                )}`
            }}
        </div>
    </div>
</template>
